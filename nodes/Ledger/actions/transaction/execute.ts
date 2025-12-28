// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function executeTransactionOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const currency = this.getNodeParameter('currency', i) as string;

			switch (operation) {
				case 'createTransaction': {
					const accountId = this.getNodeParameter('accountId', i, '') as string;
					const recipient = this.getNodeParameter('recipient', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					const options = this.getNodeParameter('options', i, {}) as Record<string, unknown>;

					returnData.push({
						json: {
							currency,
							accountId,
							recipient,
							amount,
							...options,
							message: 'Transaction creation requires Ledger Live API',
							status: 'prepared',
						},
					});
					break;
				}

				case 'signTransaction': {
					const transactionData = this.getNodeParameter('transactionData', i) as string;
					returnData.push({
						json: {
							currency,
							transactionData,
							message: `Use ${currency} resource for transaction signing`,
						},
					});
					break;
				}

				case 'broadcastTransaction': {
					const transactionData = this.getNodeParameter('transactionData', i) as string;
					returnData.push({
						json: {
							currency,
							transactionData,
							message: 'Broadcast requires blockchain API integration',
						},
					});
					break;
				}

				case 'getTransaction': {
					const txId = this.getNodeParameter('txId', i) as string;
					returnData.push({
						json: {
							currency,
							txId,
							message: 'Transaction lookup requires blockchain API integration',
						},
					});
					break;
				}

				case 'getTransactionStatus': {
					const txId = this.getNodeParameter('txId', i) as string;
					returnData.push({
						json: {
							currency,
							txId,
							message: 'Status check requires blockchain API integration',
						},
					});
					break;
				}

				case 'getPendingTransactions': {
					const accountId = this.getNodeParameter('accountId', i, '') as string;
					returnData.push({
						json: {
							currency,
							accountId,
							message: 'Pending transactions require Ledger Live API',
						},
					});
					break;
				}

				case 'getTransactionHistory': {
					const accountId = this.getNodeParameter('accountId', i, '') as string;
					returnData.push({
						json: {
							currency,
							accountId,
							message: 'Transaction history requires Ledger Live API',
						},
					});
					break;
				}

				case 'estimateFees': {
					const recipient = this.getNodeParameter('recipient', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					returnData.push({
						json: {
							currency,
							recipient,
							amount,
							message: 'Fee estimation requires blockchain API integration',
						},
					});
					break;
				}

				case 'getRecommendedFees': {
					returnData.push({
						json: {
							currency,
							message: 'Recommended fees require blockchain API integration',
						},
					});
					break;
				}

				case 'simulateTransaction': {
					const recipient = this.getNodeParameter('recipient', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					returnData.push({
						json: {
							currency,
							recipient,
							amount,
							message: 'Transaction simulation requires blockchain API integration',
						},
					});
					break;
				}

				case 'cancelTransaction': {
					const txId = this.getNodeParameter('txId', i) as string;
					returnData.push({
						json: {
							currency,
							txId,
							message: 'Transaction cancellation (RBF) requires specialized handling',
						},
					});
					break;
				}

				case 'speedUpTransaction': {
					const txId = this.getNodeParameter('txId', i) as string;
					returnData.push({
						json: {
							currency,
							txId,
							message: 'Transaction speed-up (RBF) requires specialized handling',
						},
					});
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Operation "${operation}" is not supported for Transaction`,
					);
			}
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
export { executeTransactionOperation as execute };
