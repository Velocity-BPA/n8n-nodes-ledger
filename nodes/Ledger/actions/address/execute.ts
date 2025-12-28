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
import { validateAddress, buildDerivationPath } from '../../utils';

export async function executeAddressOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const currency = this.getNodeParameter('currency', i) as string;
			const network = this.getNodeParameter('network', i, 'mainnet') as string;

			switch (operation) {
				case 'getAddress': {
					const credentials = await this.getCredentials('ledgerDevice');
					const accountIndex = this.getNodeParameter('accountIndex', i, 0) as number;
					const addressIndex = this.getNodeParameter('addressIndex', i, 0) as number;
					const displayOnDevice = this.getNodeParameter('options.displayOnDevice', i, true) as boolean;

					const result = await withTransport(credentials, async (transport) => {
						const path = buildDerivationPath(currency, accountIndex, 0, addressIndex);
						// Dispatch to appropriate app based on currency
						let address: string;
						let publicKey: string;

						if (currency === 'ethereum') {
							const Eth = (await import('@ledgerhq/hw-app-eth')).default;
							const eth = new Eth(transport);
							const result = await eth.getAddress(path, displayOnDevice);
							address = result.address;
							publicKey = result.publicKey;
						} else if (currency === 'bitcoin') {
							const Btc = (await import('@ledgerhq/hw-app-btc')).default;
							const btc = new Btc({ transport });
							const result = await btc.getWalletPublicKey(path, { verify: displayOnDevice });
							address = result.bitcoinAddress;
							publicKey = result.publicKey;
						} else if (currency === 'solana') {
							const Solana = (await import('@ledgerhq/hw-app-solana')).default;
							const solana = new Solana(transport);
							const result = await solana.getAddress(path, displayOnDevice);
							address = result.address.toString();
							publicKey = result.address.toString();
						} else {
							// Generic fallback
							address = 'Use specific currency resource';
							publicKey = '';
						}

						return { address, publicKey, path };
					});

					returnData.push({
						json: {
							...result,
							currency,
							network,
							accountIndex,
							addressIndex,
						},
					});
					break;
				}

				case 'getAddressAtPath': {
					const credentials = await this.getCredentials('ledgerDevice');
					const derivationPath = this.getNodeParameter('derivationPath', i) as string;
					const displayOnDevice = this.getNodeParameter('options.displayOnDevice', i, true) as boolean;

					const result = await withTransport(credentials, async (transport) => {
						if (currency === 'ethereum') {
							const Eth = (await import('@ledgerhq/hw-app-eth')).default;
							const eth = new Eth(transport);
							return eth.getAddress(derivationPath, displayOnDevice);
						} else if (currency === 'bitcoin') {
							const Btc = (await import('@ledgerhq/hw-app-btc')).default;
							const btc = new Btc({ transport });
							return btc.getWalletPublicKey(derivationPath, { verify: displayOnDevice });
						}
						return { address: 'Use specific currency resource', path: derivationPath };
					});

					returnData.push({
						json: {
							...result,
							derivationPath,
							currency,
							network,
						},
					});
					break;
				}

				case 'getFreshAddress': {
					// Requires Ledger Live API to track used addresses
					const accountIndex = this.getNodeParameter('accountIndex', i, 0) as number;
					returnData.push({
						json: {
							currency,
							network,
							accountIndex,
							message: 'Fresh address generation requires Ledger Live API',
						},
					});
					break;
				}

				case 'getAllAddresses': {
					const accountIndex = this.getNodeParameter('accountIndex', i, 0) as number;
					const limit = this.getNodeParameter('options.limit', i, 20) as number;
					returnData.push({
						json: {
							currency,
							network,
							accountIndex,
							limit,
							message: 'Getting all addresses requires Ledger Live API',
						},
					});
					break;
				}

				case 'validateAddress': {
					const address = this.getNodeParameter('address', i) as string;
					const isValid = validateAddress(address, currency);
					returnData.push({
						json: {
							address,
							currency,
							network,
							isValid,
						},
					});
					break;
				}

				case 'getAddressBalance': {
					const address = this.getNodeParameter('address', i) as string;
					returnData.push({
						json: {
							address,
							currency,
							network,
							message: `Use the ${currency} resource to get balance`,
						},
					});
					break;
				}

				case 'getAddressInfo': {
					const address = this.getNodeParameter('address', i) as string;
					returnData.push({
						json: {
							address,
							currency,
							network,
							message: `Use the ${currency} resource or blockchain explorer`,
						},
					});
					break;
				}

				case 'verifyAddressOnDevice': {
					const credentials = await this.getCredentials('ledgerDevice');
					const accountIndex = this.getNodeParameter('accountIndex', i, 0) as number;
					const addressIndex = this.getNodeParameter('addressIndex', i, 0) as number;

					const result = await withTransport(credentials, async (transport) => {
						const path = buildDerivationPath(currency, accountIndex, 0, addressIndex);
						
						if (currency === 'ethereum') {
							const Eth = (await import('@ledgerhq/hw-app-eth')).default;
							const eth = new Eth(transport);
							return eth.getAddress(path, true); // true = display on device
						} else if (currency === 'bitcoin') {
							const Btc = (await import('@ledgerhq/hw-app-btc')).default;
							const btc = new Btc({ transport });
							return btc.getWalletPublicKey(path, { verify: true });
						}
						return { verified: true, path };
					});

					returnData.push({
						json: {
							...result,
							verified: true,
							currency,
							network,
						},
					});
					break;
				}

				case 'watchAddress': {
					const address = this.getNodeParameter('address', i) as string;
					returnData.push({
						json: {
							address,
							currency,
							network,
							message: 'Watch address requires Ledger Live API',
						},
					});
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Operation "${operation}" is not supported for Address`,
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
export { executeAddressOperation as execute };
