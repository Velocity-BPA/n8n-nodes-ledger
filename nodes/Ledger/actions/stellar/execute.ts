// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { withTransport } from '../../transport';
import { buildDerivationPath } from '../../utils';

export async function executeStellarOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const credentials = await this.getCredentials('ledgerDevice');
			const accountIndex = this.getNodeParameter('accountIndex', i, 0) as number;

			const result = await withTransport(credentials, async (transport) => {
				const Stellar = (await import('@ledgerhq/hw-app-str')).default;
				const stellar = new Stellar(transport);
				const path = buildDerivationPath('stellar', accountIndex, 0, 0);

				switch (operation) {
					case 'getStellarAddress': {
						const result = await stellar.getPublicKey(path, true);
						return {
							address: result.publicKey,
							publicKey: result.publicKey,
							path,
						};
					}

					case 'getStellarAccount': {
						const result = await stellar.getPublicKey(path, false);
						return {
							address: result.publicKey,
							publicKey: result.publicKey,
							path,
							currency: 'XLM',
						};
					}

					case 'getPublicKey': {
						const result = await stellar.getPublicKey(path, false);
						return {
							publicKey: result.publicKey,
							path,
						};
					}

					case 'getBalance': {
						const address = this.getNodeParameter('address', i, '') as string;
						return {
							address: address || 'Derived address',
							message: 'Balance query requires Stellar Horizon API integration',
							path,
						};
					}

					case 'signTransaction': {
						const transaction = this.getNodeParameter('transaction', i) as string;
						const signature = await stellar.signTransaction(path, Buffer.from(transaction, 'base64'));
						return {
							signature: signature.signature.toString('base64'),
							transaction,
							path,
						};
					}

					case 'broadcastTransaction': {
						const signedTransaction = this.getNodeParameter('signedTransaction', i) as string;
						return {
							signedTransaction,
							message: 'Broadcast requires Stellar Horizon API integration',
						};
					}

					default:
						throw new NodeOperationError(
							this.getNode(),
							`Operation "${operation}" is not supported for Stellar`,
						);
				}
			});

			returnData.push({ json: result });
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: (error as Error).message } });
				continue;
			}
			throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
		}
	}

	return returnData;
}
// Export alias for main node
export { executeStellarOperation as execute };
