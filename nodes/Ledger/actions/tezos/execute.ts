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

export async function executeTezosOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const credentials = await this.getCredentials('ledgerDevice');
			const accountIndex = this.getNodeParameter('accountIndex', i, 0) as number;
			const options = this.getNodeParameter('options', i, {}) as { curve?: string };

			const result = await withTransport(credentials, async (transport) => {
				const Tezos = (await import('@ledgerhq/hw-app-tezos')).default;
				const tezos = new Tezos(transport);
				const path = buildDerivationPath('tezos', accountIndex, 0, 0);

				switch (operation) {
					case 'getTezosAddress': {
						const result = await tezos.getAddress(path, true);
						return {
							address: result.address,
							publicKey: result.publicKey,
							path,
						};
					}

					case 'getTezosAccount': {
						const result = await tezos.getAddress(path, false);
						return {
							address: result.address,
							publicKey: result.publicKey,
							path,
							currency: 'XTZ',
						};
					}

					case 'getPublicKey': {
						const result = await tezos.getAddress(path, false);
						return {
							publicKey: result.publicKey,
							path,
						};
					}

					case 'getBalance': {
						const address = this.getNodeParameter('address', i, '') as string;
						return {
							address: address || 'Derived address',
							message: 'Balance query requires Tezos RPC integration',
							path,
						};
					}

					case 'signOperation':
					case 'signTransaction': {
						const operationData = this.getNodeParameter('operationData', i) as string;
						const signature = await tezos.signOperation(path, operationData);
						return {
							signature,
							operation: operationData,
							path,
						};
					}

					case 'broadcastOperation': {
						const signedOperation = this.getNodeParameter('signedOperation', i) as string;
						return {
							signedOperation,
							message: 'Broadcast requires Tezos RPC integration',
						};
					}

					default:
						throw new NodeOperationError(
							this.getNode(),
							`Operation "${operation}" is not supported for Tezos`,
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
export { executeTezosOperation as execute };
