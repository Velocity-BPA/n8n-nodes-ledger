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

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	const accountIndex = this.getNodeParameter('accountIndex', index, 0) as number;
	const addressIndex = this.getNodeParameter('addressIndex', index, 0) as number;
	const derivationPath = this.getNodeParameter('derivationPath', index, '') as string;
	const network = this.getNodeParameter('network', index, 'mainnet') as string;

	const path = derivationPath || buildDerivationPath('ethereum', accountIndex, addressIndex);

	switch (operation) {
		case 'getAccount':
		case 'getAddress':
			return withTransport(this, async (transport) => {
				const Eth = (await import('@ledgerhq/hw-app-eth')).default;
				const eth = new Eth(transport);
				const verify = this.getNodeParameter('verifyOnDevice', index, true) as boolean;
				const result = await eth.getAddress(path, verify);
				return {
					address: result.address,
					publicKey: result.publicKey,
					path,
					verified: verify,
					network,
				};
			});

		case 'signTransaction':
		case 'signEip1559Transaction':
		case 'signLegacyTransaction':
		case 'signEip2930Transaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			if (!transactionData) {
				throw new NodeOperationError(this.getNode(), 'Transaction data is required');
			}

			return withTransport(this, async (transport) => {
				const Eth = (await import('@ledgerhq/hw-app-eth')).default;
				const eth = new Eth(transport);
				
				let txData: string;
				try {
					const parsed = JSON.parse(transactionData);
					txData = parsed.rawTx || transactionData;
				} catch {
					txData = transactionData;
				}

				const rawTx = txData.startsWith('0x') ? txData.slice(2) : txData;
				const result = await eth.signTransaction(path, rawTx);
				
				return {
					v: formatHex(result.v),
					r: formatHex(result.r),
					s: formatHex(result.s),
					path,
				};
			});
		}

		case 'signMessage':
		case 'signPersonalMessage': {
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
					signature: formatHex(result.r) + result.s.slice(2) + result.v.toString(16),
					message,
					path,
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
					path,
				};
			});
		}

		case 'getChainId':
			return { chainId: network === 'mainnet' ? 1 : 11155111, network };

		case 'provideErc20TokenInfo':
			return withTransport(this, async (transport) => {
				const Eth = (await import('@ledgerhq/hw-app-eth')).default;
				const eth = new Eth(transport);
				const config = await eth.getAppConfiguration();
				return { 
					version: config.version,
					note: 'ERC20 token info provision handled by device' 
				};
			});

		case 'getNftInfo':
			return { note: 'NFT info requires external API' };

		case 'clearSignTransaction':
			return { note: 'Clear signing uses Ledger device display for human-readable data' };

		case 'getConfiguration':
			return withTransport(this, async (transport) => {
				const Eth = (await import('@ledgerhq/hw-app-eth')).default;
				const eth = new Eth(transport);
				const config = await eth.getAppConfiguration();
				return {
					version: config.version,
					arbitraryDataEnabled: config.arbitraryDataEnabled,
					erc20ProvisioningNecessary: config.erc20ProvisioningNecessary,
					starkEnabled: config.starkEnabled,
				};
			});

		case 'broadcastTransaction': {
			const transactionData = this.getNodeParameter('transactionData', index, '') as string;
			return {
				note: 'Transaction broadcast requires RPC endpoint',
				network,
				hasData: !!transactionData,
			};
		}

		case 'estimateGas':
			return {
				estimatedGas: '21000',
				note: 'Gas estimation requires RPC endpoint',
				network,
			};

		default:
			throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
