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

	const path = derivationPath || buildDerivationPath('solana', accountIndex);

	switch (operation) {
		case 'getAccount':
		case 'getAddress':
			return withTransport(this, async (transport) => {
				const Solana = (await import('@ledgerhq/hw-app-solana')).default;
				const solana = new Solana(transport);
				const verify = this.getNodeParameter('verifyOnDevice', index, true) as boolean;
				const result = await solana.getAddress(path, verify);
				return {
					address: result.address.toString('base58'),
					path,
					verified: verify,
					network,
				};
			});

		case 'getAddresses':
			return withTransport(this, async (transport) => {
				const Solana = (await import('@ledgerhq/hw-app-solana')).default;
				const solana = new Solana(transport);
				const addresses: IDataObject[] = [];
				for (let i = 0; i < 5; i++) {
					const addrPath = `m/44'/501'/${i}'`;
					const result = await solana.getAddress(addrPath, false);
					addresses.push({ 
						address: result.address.toString('base58'), 
						path: addrPath, 
						index: i 
					});
				}
				return { addresses, network };
			});

		case 'signTransaction':
		case 'signVersionedTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			if (!transactionData) {
				throw new NodeOperationError(this.getNode(), 'Transaction data is required');
			}

			return withTransport(this, async (transport) => {
				const Solana = (await import('@ledgerhq/hw-app-solana')).default;
				const solana = new Solana(transport);
				
				const txBuffer = Buffer.from(transactionData, 'base64');
				const result = await solana.signTransaction(path, txBuffer);
				
				return {
					signature: result.signature.toString('base64'),
					path,
					network,
				};
			});
		}

		case 'signMessage':
		case 'signOffChainMessage': {
			const message = this.getNodeParameter('message', index, '') as string;
			if (!message) {
				throw new NodeOperationError(this.getNode(), 'Message is required');
			}

			return withTransport(this, async (transport) => {
				const Solana = (await import('@ledgerhq/hw-app-solana')).default;
				const solana = new Solana(transport);
				
				const msgBuffer = Buffer.from(message, 'utf-8');
				const result = await solana.signOffchainMessage(path, msgBuffer);
				
				return {
					signature: result.signature.toString('base64'),
					message,
					path,
					network,
				};
			});
		}

		case 'getAssociatedTokenAccount':
			return {
				note: 'Associated token account derivation requires token mint address',
				network,
			};

		case 'getBalance':
			return {
				balance: '0',
				note: 'Balance query requires Solana RPC',
				network,
			};

		case 'getTokenBalances':
			return {
				tokens: [],
				note: 'Token balances require Solana RPC',
				network,
			};

		case 'getNfts':
			return {
				nfts: [],
				note: 'NFT enumeration requires Solana RPC or indexer',
				network,
			};

		case 'broadcastTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			return {
				note: 'Transaction broadcast requires Solana RPC',
				network,
				hasData: !!transactionData,
			};
		}

		case 'getConfiguration':
			return withTransport(this, async (transport) => {
				const Solana = (await import('@ledgerhq/hw-app-solana')).default;
				const solana = new Solana(transport);
				const config = await solana.getAppConfiguration();
				return { 
					version: config.version,
					blindSigningEnabled: config.blindSigningEnabled 
				};
			});

		default:
			throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
