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

export async function executeXrpOperation(
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
				const Xrp = (await import('@ledgerhq/hw-app-xrp')).default;
				const xrp = new Xrp(transport);
				const path = buildDerivationPath('xrp', accountIndex, 0, 0);

				switch (operation) {
					case 'getXrpAddress': {
						const result = await xrp.getAddress(path);
						return {
							address: result.address,
							publicKey: result.publicKey,
							path,
						};
					}

					case 'getXrpAccount': {
						const result = await xrp.getAddress(path);
						return {
							address: result.address,
							publicKey: result.publicKey,
							path,
							currency: 'XRP',
						};
					}

					case 'getPublicKey': {
						const result = await xrp.getAddress(path);
						return {
							publicKey: result.publicKey,
							path,
						};
					}

					case 'getBalance': {
						const address = this.getNodeParameter('address', i, '') as string;
						// Balance retrieval requires XRP Ledger API
						return {
							address: address || 'Derived address',
							message: 'Balance query requires XRP Ledger API integration',
							path,
						};
					}

					case 'getAccountInfo': {
						const address = this.getNodeParameter('address', i, '') as string;
						return {
							address: address || 'Derived address',
							message: 'Account info requires XRP Ledger API integration',
							path,
						};
					}

					case 'signTransaction': {
						const transaction = this.getNodeParameter('transaction', i) as object;
						const txBlob = JSON.stringify(transaction);
						const signature = await xrp.signTransaction(path, txBlob);
						return {
							signature,
							transaction,
							path,
						};
					}

					case 'broadcastTransaction': {
						const signedTransaction = this.getNodeParameter('signedTransaction', i) as string;
						return {
							signedTransaction,
							message: 'Broadcast requires XRP Ledger API integration',
						};
					}

					default:
						throw new NodeOperationError(
							this.getNode(),
							`Operation "${operation}" is not supported for XRP`,
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
export { executeXrpOperation as execute };
