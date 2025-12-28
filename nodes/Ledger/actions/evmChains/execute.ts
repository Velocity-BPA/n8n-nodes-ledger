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
import { buildDerivationPath, formatHex } from '../../utils';
import { SUPPORTED_CURRENCIES } from '../../constants';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	const accountIndex = this.getNodeParameter('accountIndex', index, 0) as number;
	const addressIndex = this.getNodeParameter('addressIndex', index, 0) as number;
	const derivationPath = this.getNodeParameter('derivationPath', index, '') as string;
	const evmChain = this.getNodeParameter('evmChain', index, 'ethereum') as string;
	const network = this.getNodeParameter('network', index, 'mainnet') as string;

	const path = derivationPath || buildDerivationPath('ethereum', accountIndex, addressIndex);
	const chainConfig = SUPPORTED_CURRENCIES[evmChain as keyof typeof SUPPORTED_CURRENCIES];
	const chainId = chainConfig?.chainId || 1;

	switch (operation) {
		case 'getAddress':
			return withTransport(this, async (transport) => {
				const Eth = (await import('@ledgerhq/hw-app-eth')).default;
				const eth = new Eth(transport);
				const verify = this.getNodeParameter('verifyOnDevice', index, true) as boolean;
				const result = await eth.getAddress(path, verify, true);
				return {
					address: result.address,
					publicKey: result.publicKey,
					path,
					chain: evmChain,
					chainId,
					verified: verify,
				};
			});

		case 'signTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			if (!transactionData) {
				throw new NodeOperationError(this.getNode(), 'Transaction data is required');
			}

			return withTransport(this, async (transport) => {
				const Eth = (await import('@ledgerhq/hw-app-eth')).default;
				const eth = new Eth(transport);
				
				let rawTx: string;
				try {
					const parsed = JSON.parse(transactionData);
					rawTx = parsed.rawTx || transactionData;
				} catch {
					rawTx = transactionData;
				}
				
				const tx = rawTx.startsWith('0x') ? rawTx.slice(2) : rawTx;
				const result = await eth.signTransaction(path, tx);
				
				return {
					v: formatHex(result.v),
					r: formatHex(result.r),
					s: formatHex(result.s),
					chain: evmChain,
					chainId,
				};
			});
		}

		case 'signMessage': {
			const message = this.getNodeParameter('message', index, '') as string;
			if (!message) {
				throw new NodeOperationError(this.getNode(), 'Message is required');
			}

			return withTransport(this, async (transport) => {
				const Eth = (await import('@ledgerhq/hw-app-eth')).default;
				const eth = new Eth(transport);
				const msgHex = Buffer.from(message, 'utf-8').toString('hex');
				const result = await eth.signPersonalMessage(path, msgHex);
				
				return {
					v: result.v,
					r: formatHex(result.r),
					s: formatHex(result.s),
					chain: evmChain,
					message,
				};
			});
		}

		case 'signTypedData': {
			const typedData = this.getNodeParameter('typedData', index, '') as string;
			if (!typedData) {
				throw new NodeOperationError(this.getNode(), 'Typed data is required');
			}

			return withTransport(this, async (transport) => {
				const Eth = (await import('@ledgerhq/hw-app-eth')).default;
				const eth = new Eth(transport);
				
				let data;
				try {
					data = JSON.parse(typedData);
				} catch {
					throw new NodeOperationError(this.getNode(), 'Invalid typed data JSON');
				}

				const result = await eth.signEIP712Message(path, data);
				return {
					v: result.v,
					r: formatHex(result.r),
					s: formatHex(result.s),
					chain: evmChain,
				};
			});
		}

		case 'getBalance':
			return {
				balance: '0',
				chain: evmChain,
				chainId,
				note: 'Balance query requires RPC endpoint',
			};

		case 'getTokenBalances':
			return {
				tokens: [],
				chain: evmChain,
				chainId,
				note: 'Token balances require RPC or indexer API',
			};

		case 'getNfts':
			return {
				nfts: [],
				chain: evmChain,
				chainId,
				note: 'NFT enumeration requires indexer API',
			};

		case 'broadcastTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			return {
				chain: evmChain,
				chainId,
				note: 'Transaction broadcast requires RPC endpoint',
				hasData: !!transactionData,
			};
		}

		default:
			throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
