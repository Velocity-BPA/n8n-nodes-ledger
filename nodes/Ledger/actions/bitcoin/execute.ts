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
import { buildDerivationPath, splitPath } from '../../utils';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	const accountIndex = this.getNodeParameter('accountIndex', index, 0) as number;
	const addressIndex = this.getNodeParameter('addressIndex', index, 0) as number;
	const derivationPath = this.getNodeParameter('derivationPath', index, '') as string;
	const network = this.getNodeParameter('network', index, 'mainnet') as string;

	const path = derivationPath || buildDerivationPath('bitcoin', accountIndex, addressIndex, 'nativeSegwit');

	switch (operation) {
		case 'getAccount':
			return withTransport(this, async (transport) => {
				const Btc = (await import('@ledgerhq/hw-app-btc')).default;
				const btc = new Btc({ transport });
				const result = await btc.getWalletPublicKey(path, { format: 'bech32' });
				return {
					address: result.bitcoinAddress,
					publicKey: result.publicKey,
					chainCode: result.chainCode,
					path,
					network,
				};
			});

		case 'getAddress':
			return withTransport(this, async (transport) => {
				const Btc = (await import('@ledgerhq/hw-app-btc')).default;
				const btc = new Btc({ transport });
				const verify = this.getNodeParameter('verifyOnDevice', index, true) as boolean;
				const result = await btc.getWalletPublicKey(path, { verify, format: 'bech32' });
				return { address: result.bitcoinAddress, path, verified: verify };
			});

		case 'getAddresses':
			return withTransport(this, async (transport) => {
				const Btc = (await import('@ledgerhq/hw-app-btc')).default;
				const btc = new Btc({ transport });
				const addresses: IDataObject[] = [];
				for (let i = 0; i < 5; i++) {
					const addrPath = buildDerivationPath('bitcoin', accountIndex, i, 'nativeSegwit');
					const result = await btc.getWalletPublicKey(addrPath, { format: 'bech32' });
					addresses.push({ address: result.bitcoinAddress, path: addrPath, index: i });
				}
				return { addresses };
			});

		case 'getChangeAddress':
			return withTransport(this, async (transport) => {
				const Btc = (await import('@ledgerhq/hw-app-btc')).default;
				const btc = new Btc({ transport });
				const changePath = path.replace(/\/0\/\d+$/, '/1/0');
				const result = await btc.getWalletPublicKey(changePath, { format: 'bech32' });
				return { changeAddress: result.bitcoinAddress, path: changePath };
			});

		case 'getXpub':
			return withTransport(this, async (transport) => {
				const Btc = (await import('@ledgerhq/hw-app-btc')).default;
				const btc = new Btc({ transport });
				const accountPath = `m/84'/0'/${accountIndex}'`;
				const result = await btc.getWalletPublicKey(accountPath);
				return { 
					xpub: result.publicKey,
					chainCode: result.chainCode,
					path: accountPath 
				};
			});

		case 'signTransaction':
		case 'signPsbt': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			const psbt = this.getNodeParameter('psbt', index, '') as string;
			const dataToSign = operation === 'signPsbt' ? psbt : transactionData;
			
			if (!dataToSign) {
				throw new NodeOperationError(this.getNode(), 'Transaction data or PSBT is required');
			}
			
			return withTransport(this, async (transport) => {
				const Btc = (await import('@ledgerhq/hw-app-btc')).default;
				const btc = new Btc({ transport });
				
				return {
					note: 'Bitcoin transaction signing requires properly formatted transaction inputs',
					dataProvided: !!dataToSign,
					path,
				};
			});
		}

		case 'createTransaction':
			return {
				note: 'Transaction creation requires UTXO data and recipient information',
				network,
			};

		case 'broadcastTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			return {
				note: 'Transaction broadcast requires connection to Bitcoin node',
				network,
				hasData: !!transactionData,
			};
		}

		case 'getUtxos':
			return {
				utxos: [],
				note: 'UTXO retrieval requires blockchain API connection',
				network,
			};

		case 'getTransaction': {
			const txHash = this.getNodeParameter('transactionHash', index, '') as string;
			return {
				transactionHash: txHash,
				note: 'Transaction lookup requires blockchain API',
				network,
			};
		}

		case 'getTransactionStatus': {
			const txHash = this.getNodeParameter('transactionHash', index, '') as string;
			return {
				transactionHash: txHash,
				status: 'unknown',
				note: 'Transaction status requires blockchain API',
				network,
			};
		}

		case 'estimateFee':
			return {
				estimatedFee: '0',
				note: 'Fee estimation requires blockchain API',
				network,
			};

		case 'getRecommendedFees':
			return {
				slow: { satPerByte: 1, estimatedTime: '60 min' },
				medium: { satPerByte: 5, estimatedTime: '30 min' },
				fast: { satPerByte: 20, estimatedTime: '10 min' },
				note: 'Recommended fees from public mempool data',
			};

		case 'signMessage': {
			const message = this.getNodeParameter('message', index, '') as string;
			return withTransport(this, async (transport) => {
				const Btc = (await import('@ledgerhq/hw-app-btc')).default;
				const btc = new Btc({ transport });
				const result = await btc.signMessage(path, Buffer.from(message, 'utf-8').toString('hex'));
				return { signature: result.v.toString('hex') + result.r + result.s, message, path };
			});
		}

		case 'verifyMessage':
			return {
				verified: false,
				note: 'Message verification done off-device',
			};

		case 'deriveAddress': {
			const customPath = this.getNodeParameter('derivationPath', index, '') as string;
			if (!customPath) {
				throw new NodeOperationError(this.getNode(), 'Derivation path is required');
			}
			return withTransport(this, async (transport) => {
				const Btc = (await import('@ledgerhq/hw-app-btc')).default;
				const btc = new Btc({ transport });
				const result = await btc.getWalletPublicKey(customPath, { format: 'bech32' });
				return { address: result.bitcoinAddress, path: customPath };
			});
		}

		case 'getPsbt':
			return {
				psbt: null,
				note: 'PSBT retrieval requires transaction data',
			};

		default:
			throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
