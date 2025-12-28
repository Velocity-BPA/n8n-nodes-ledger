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

	const path = derivationPath || buildDerivationPath('cosmos', accountIndex);

	switch (operation) {
		case 'getAccount':
		case 'getAddress':
			return withTransport(this, async (transport) => {
				const Cosmos = (await import('@ledgerhq/hw-app-cosmos')).default;
				const cosmos = new Cosmos(transport);
				const verify = this.getNodeParameter('verifyOnDevice', index, true) as boolean;
				const result = await cosmos.getAddress(path, 'cosmos', verify);
				return {
					address: result.address,
					publicKey: result.publicKey,
					path,
					verified: verify,
					network,
				};
			});

		case 'getPublicKey':
			return withTransport(this, async (transport) => {
				const Cosmos = (await import('@ledgerhq/hw-app-cosmos')).default;
				const cosmos = new Cosmos(transport);
				const result = await cosmos.getAddress(path, 'cosmos', false);
				return { publicKey: result.publicKey, path };
			});

		case 'signTransaction':
		case 'signAminoTransaction':
		case 'signDirectTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			if (!transactionData) {
				throw new NodeOperationError(this.getNode(), 'Transaction data is required');
			}

			return withTransport(this, async (transport) => {
				const Cosmos = (await import('@ledgerhq/hw-app-cosmos')).default;
				const cosmos = new Cosmos(transport);
				const result = await cosmos.sign(path, transactionData);
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
				denom: 'uatom',
				note: 'Balance query requires Cosmos RPC',
				network,
			};

		case 'broadcastTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			return {
				note: 'Transaction broadcast requires Cosmos RPC',
				network,
				hasData: !!transactionData,
			};
		}

		case 'getValidators':
			return {
				validators: [],
				note: 'Validator list requires Cosmos RPC',
				network,
			};

		case 'getDelegations':
			return {
				delegations: [],
				note: 'Delegation query requires Cosmos RPC',
				network,
			};

		case 'getRewards':
			return {
				rewards: [],
				note: 'Rewards query requires Cosmos RPC',
				network,
			};

		default:
			throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
