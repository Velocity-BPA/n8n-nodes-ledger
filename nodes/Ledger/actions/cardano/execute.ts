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

export async function executeCardanoOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const credentials = await this.getCredentials('ledgerDevice');
			const network = this.getNodeParameter('network', i, 'mainnet') as string;
			const accountIndex = this.getNodeParameter('accountIndex', i, 0) as number;

			const result = await withTransport(credentials, async (transport) => {
				// Cardano uses a specific derivation path format
				// m/1852'/1815'/account'/role/index
				const accountPath = `m/1852'/1815'/${accountIndex}'`;

				switch (operation) {
					case 'getCardanoAddress': {
						const addressIndex = this.getNodeParameter('addressIndex', i, 0) as number;
						// Cardano requires specific app - placeholder implementation
						return {
							address: `Cardano address derivation requires Cardano ADA app`,
							path: `${accountPath}/0/${addressIndex}`,
							network,
							accountIndex,
							addressIndex,
						};
					}

					case 'getCardanoAccount': {
						return {
							accountPath,
							network,
							accountIndex,
							currency: 'ADA',
							message: 'Full account details require Cardano ADA app',
						};
					}

					case 'getStakingKey': {
						return {
							stakingPath: `${accountPath}/2/0`,
							network,
							message: 'Staking key derivation requires Cardano ADA app',
						};
					}

					case 'getExtendedPublicKey': {
						return {
							accountPath,
							network,
							message: 'Extended public key requires Cardano ADA app',
						};
					}

					case 'deriveAddress': {
						const addressIndex = this.getNodeParameter('addressIndex', i, 0) as number;
						return {
							path: `${accountPath}/0/${addressIndex}`,
							network,
							message: 'Address derivation requires Cardano ADA app',
						};
					}

					case 'getBalance': {
						const address = this.getNodeParameter('address', i, '') as string;
						return {
							address: address || 'Derived address',
							message: 'Balance query requires Cardano API integration',
							network,
						};
					}

					case 'getUtxos': {
						const address = this.getNodeParameter('address', i, '') as string;
						return {
							address: address || 'Derived address',
							message: 'UTXO query requires Cardano API integration',
							network,
						};
					}

					case 'signTransaction': {
						const transaction = this.getNodeParameter('transaction', i) as string;
						return {
							transaction,
							accountPath,
							network,
							message: 'Transaction signing requires Cardano ADA app',
						};
					}

					case 'broadcastTransaction': {
						const signedTransaction = this.getNodeParameter('signedTransaction', i) as string;
						return {
							signedTransaction,
							network,
							message: 'Broadcast requires Cardano API integration',
						};
					}

					default:
						throw new NodeOperationError(
							this.getNode(),
							`Operation "${operation}" is not supported for Cardano`,
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
export { executeCardanoOperation as execute };
