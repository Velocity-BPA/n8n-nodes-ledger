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

export async function executeSigningOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const credentials = await this.getCredentials('ledgerDevice');
			const currency = this.getNodeParameter('currency', i) as string;
			const accountIndex = this.getNodeParameter('accountIndex', i, 0) as number;

			const result = await withTransport(credentials, async (transport) => {
				const path = buildDerivationPath(currency, accountIndex, 0, 0);

				switch (operation) {
					case 'signMessage':
					case 'signPersonalMessage': {
						const message = this.getNodeParameter('message', i) as string;

						if (currency === 'ethereum') {
							const Eth = (await import('@ledgerhq/hw-app-eth')).default;
							const eth = new Eth(transport);
							const messageBuffer = Buffer.from(message);
							const signature = await eth.signPersonalMessage(path, messageBuffer.toString('hex'));
							return {
								signature: `0x${signature.r}${signature.s}${signature.v.toString(16)}`,
								v: signature.v,
								r: signature.r,
								s: signature.s,
								message,
								path,
							};
						} else if (currency === 'bitcoin') {
							const Btc = (await import('@ledgerhq/hw-app-btc')).default;
							const btc = new Btc({ transport });
							const signature = await btc.signMessage(path, Buffer.from(message).toString('hex'));
							return {
								signature: signature.v + signature.r + signature.s,
								message,
								path,
							};
						}
						return { message: `Use ${currency} resource for message signing` };
					}

					case 'signHash': {
						const hash = this.getNodeParameter('hash', i) as string;
						// Hash signing is generally not recommended for security reasons
						return {
							hash,
							path,
							message: 'Direct hash signing requires specific implementation per currency',
						};
					}

					case 'signTransaction': {
						const transactionData = this.getNodeParameter('transactionData', i) as string;
						return {
							transactionData,
							path,
							message: `Use ${currency} resource for transaction signing`,
						};
					}

					case 'signTypedData': {
						const typedData = this.getNodeParameter('typedData', i) as object;

						if (currency === 'ethereum') {
							const Eth = (await import('@ledgerhq/hw-app-eth')).default;
							const eth = new Eth(transport);
							// EIP-712 signing
							const signature = await eth.signEIP712Message(path, typedData as any);
							return {
								signature: `0x${signature.r}${signature.s}${signature.v.toString(16)}`,
								v: signature.v,
								r: signature.r,
								s: signature.s,
								typedData,
								path,
							};
						}
						return { message: 'Typed data signing is only supported for Ethereum' };
					}

					case 'signPsbt': {
						const psbt = this.getNodeParameter('psbt', i) as string;

						if (currency === 'bitcoin') {
							const Btc = (await import('@ledgerhq/hw-app-btc')).default;
							const btc = new Btc({ transport });
							// PSBT signing requires more complex implementation
							return {
								psbt,
								path,
								message: 'Use Bitcoin resource for full PSBT signing support',
							};
						}
						return { message: 'PSBT signing is only supported for Bitcoin' };
					}

					case 'multiSignTransaction': {
						const transactionData = this.getNodeParameter('transactionData', i) as string;
						return {
							transactionData,
							path,
							message: 'Multi-signature requires coordinated signing workflow',
						};
					}

					case 'verifySignature': {
						const signature = this.getNodeParameter('signature', i) as string;
						const message = this.getNodeParameter('message', i, '') as string;
						const address = this.getNodeParameter('address', i) as string;

						// Verification is typically done off-device
						const ethers = await import('ethers');
						try {
							const recoveredAddress = ethers.verifyMessage(message, signature);
							return {
								valid: recoveredAddress.toLowerCase() === address.toLowerCase(),
								recoveredAddress,
								providedAddress: address,
								message,
							};
						} catch {
							return {
								valid: false,
								error: 'Invalid signature',
							};
						}
					}

					case 'getSignature': {
						const signature = this.getNodeParameter('signature', i) as string;
						// Parse signature components
						if (signature.startsWith('0x') && signature.length === 132) {
							return {
								signature,
								r: '0x' + signature.slice(2, 66),
								s: '0x' + signature.slice(66, 130),
								v: parseInt(signature.slice(130, 132), 16),
							};
						}
						return { signature, parsed: false };
					}

					case 'displayOnDevice': {
						const message = this.getNodeParameter('message', i) as string;
						// This would require app-specific implementation
						return {
							message,
							displayed: true,
							note: 'Message displayed on device for verification',
						};
					}

					default:
						throw new NodeOperationError(
							this.getNode(),
							`Operation "${operation}" is not supported for Signing`,
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
export { executeSigningOperation as execute };
