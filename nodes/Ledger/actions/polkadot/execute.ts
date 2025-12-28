// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { withTransport } from '../../transport';
import { buildDerivationPath } from '../../utils';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	const accountIndex = this.getNodeParameter('accountIndex', index, 0) as number;
	const derivationPath = this.getNodeParameter('derivationPath', index, '') as string;
	const network = this.getNodeParameter('network', index, 'mainnet') as string;

	const path = derivationPath || buildDerivationPath('polkadot', accountIndex);

	switch (operation) {
		case 'getAccount':
		case 'getAddress':
			return withTransport(this, async (transport) => {
				const Polkadot = (await import('@ledgerhq/hw-app-polkadot')).default;
				const polkadot = new Polkadot(transport);
				const verify = this.getNodeParameter('verifyOnDevice', index, true) as boolean;
				const result = await polkadot.getAddress(path, 0, verify);
				return {
					address: result.address,
					publicKey: result.pubKey,
					path,
					verified: verify,
					network,
				};
			});

		case 'signTransaction':
		case 'signExtrinsic': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			if (!transactionData) {
				throw new NodeOperationError(this.getNode(), 'Transaction/extrinsic data is required');
			}

			return withTransport(this, async (transport) => {
				const Polkadot = (await import('@ledgerhq/hw-app-polkadot')).default;
				const polkadot = new Polkadot(transport);
				const payload = Buffer.from(transactionData, 'hex');
				const result = await polkadot.sign(path, payload);
				return {
					signature: result.signature.toString('hex'),
					path,
					network,
				};
			});
		}

		case 'getBalance':
			return {
				balance: '0',
				note: 'Balance query requires Polkadot RPC',
				network,
			};

		case 'getMetadata':
			return {
				metadata: null,
				note: 'Metadata query requires Polkadot RPC',
				network,
			};

		case 'broadcastTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			return {
				note: 'Transaction broadcast requires Polkadot RPC',
				network,
				hasData: !!transactionData,
			};
		}

		default:
			throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
