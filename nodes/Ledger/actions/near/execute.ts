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

export async function executeNearOperation(
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
				const Near = (await import('@ledgerhq/hw-app-near')).default;
				const near = new Near(transport);
				const path = buildDerivationPath('near', accountIndex, 0, 0);

				switch (operation) {
					case 'getNearAddress': {
						const result = await near.getAddress(path);
						return {
							address: result.address,
							publicKey: result.publicKey,
							path,
						};
					}

					case 'getNearAccount': {
						const result = await near.getAddress(path);
						return {
							address: result.address,
							publicKey: result.publicKey,
							path,
							currency: 'NEAR',
						};
					}

					case 'getPublicKey': {
						const result = await near.getAddress(path);
						return {
							publicKey: result.publicKey,
							path,
						};
					}

					case 'getBalance': {
						const address = this.getNodeParameter('address', i, '') as string;
						return {
							address: address || 'Derived address',
							message: 'Balance query requires NEAR RPC integration',
							path,
						};
					}

					case 'signTransaction': {
						const transaction = this.getNodeParameter('transaction', i) as string;
						const txBuffer = Buffer.from(transaction, 'base64');
						const signature = await near.signTransaction(path, txBuffer);
						return {
							signature: Buffer.from(signature.signature).toString('base64'),
							transaction,
							path,
						};
					}

					case 'broadcastTransaction': {
						const signedTransaction = this.getNodeParameter('signedTransaction', i) as string;
						return {
							signedTransaction,
							message: 'Broadcast requires NEAR RPC integration',
						};
					}

					default:
						throw new NodeOperationError(
							this.getNode(),
							`Operation "${operation}" is not supported for NEAR`,
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
export { executeNearOperation as execute };
