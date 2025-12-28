// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { withTransport, getDeviceInfo, getAppAndVersion } from '../../transport';
import { SUPPORTED_CURRENCIES, DERIVATION_PATHS, EVM_CHAINS } from '../../constants';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	switch (operation) {
		case 'getSupportedCurrencies': {
			const category = this.getNodeParameter('category', index, 'all') as string;

			let currencies = Object.entries(SUPPORTED_CURRENCIES).map(([id, config]) => ({
				id,
				...config,
			}));

			if (category === 'native') {
				currencies = currencies.filter((c) => !c.id.includes('_') && !EVM_CHAINS[c.id]);
			} else if (category === 'evm') {
				const evmIds = Object.keys(EVM_CHAINS);
				currencies = currencies.filter((c) => evmIds.includes(c.id) || c.id === 'ethereum');
			} else if (category === 'token') {
				currencies = currencies.filter((c) => c.id.includes('_'));
			}

			return {
				currencies,
				total: currencies.length,
				category,
			};
		}

		case 'getDerivationPaths': {
			const currency = this.getNodeParameter('currency', index, '') as string;

			let paths: IDataObject = { ...DERIVATION_PATHS };

			if (currency) {
				const currencyLower = currency.toLowerCase();
				const currencyConfig = SUPPORTED_CURRENCIES[currencyLower];
				if (currencyConfig) {
					paths = {
						[currencyLower]: {
							template: currencyConfig.derivationPath,
							purpose: currencyConfig.purpose || 44,
							coinType: currencyConfig.coinType,
						},
					};
				}
			}

			return {
				paths,
				standards: {
					BIP32: 'Base HD wallet standard',
					BIP44: "m/44'/coin'/account'/change/index - Multi-currency",
					BIP49: "m/49'/coin'/account'/change/index - SegWit P2SH",
					BIP84: "m/84'/coin'/account'/change/index - Native SegWit",
					BIP86: "m/86'/coin'/account'/change/index - Taproot",
				},
			};
		}

		case 'derivePath': {
			const pathTemplate = this.getNodeParameter('pathTemplate', index) as string;
			const pathIndex = this.getNodeParameter('index', index, 0) as number;
			const accountIndex = this.getNodeParameter('accountIndex', index, 0) as number;

			let derivedPath = pathTemplate
				.replace(/x/gi, pathIndex.toString())
				.replace(/account/gi, accountIndex.toString());

			if (derivedPath === pathTemplate && !derivedPath.endsWith(pathIndex.toString())) {
				derivedPath = derivedPath.replace(/\/\d+$/, `/${pathIndex}`);
			}

			return {
				template: pathTemplate,
				derivedPath,
				index: pathIndex,
				accountIndex,
				isHardened: derivedPath.includes("'"),
			};
		}

		case 'validateDerivationPath': {
			const path = this.getNodeParameter('path', index) as string;
			const strictMode = this.getNodeParameter('strictMode', index, true) as boolean;

			const pathRegex = /^m(\/\d+'?)+$/;
			const isValid = pathRegex.test(path);
			
			const components = path.split('/');
			const parsed = {
				root: components[0],
				purpose: components[1],
				coinType: components[2],
				account: components[3],
				change: components[4],
				index: components[5],
			};

			const errors: string[] = [];
			
			if (strictMode) {
				if (!path.startsWith('m/')) {
					errors.push("Path must start with 'm/'");
				}
				if (components.length < 4) {
					errors.push('Path must have at least 4 levels for BIP44');
				}
			}

			return {
				path,
				isValid: isValid && errors.length === 0,
				strictMode,
				parsed,
				errors: errors.length > 0 ? errors : undefined,
				depth: components.length - 1,
			};
		}

		case 'getDeviceTransport':
			return {
				availableTransports: [
					{
						type: 'usb_hid',
						name: 'USB HID',
						description: 'Direct USB connection',
						platforms: ['linux', 'darwin', 'win32'],
						requiresDrivers: process.platform === 'win32',
					},
					{
						type: 'bluetooth',
						name: 'Bluetooth',
						description: 'Bluetooth Low Energy connection',
						devices: ['Nano X'],
						platforms: ['darwin', 'linux'],
					},
					{
						type: 'webhid',
						name: 'WebHID',
						description: 'Browser-based USB HID',
						platforms: ['browser'],
						browserSupport: 'Chrome 89+, Edge 89+',
					},
					{
						type: 'http',
						name: 'HTTP',
						description: 'HTTP transport via Ledger Live',
						requiresLedgerLive: true,
					},
					{
						type: 'speculos',
						name: 'Speculos',
						description: 'Ledger device simulator',
						useCase: 'development',
					},
				],
				currentPlatform: process.platform,
			};

		case 'getConnectionStatus': {
			try {
				const status = await withTransport(this, async (transport) => {
					const info = await getDeviceInfo(transport);
					return {
						connected: true,
						deviceModel: info.model,
						firmwareVersion: info.firmwareVersion,
					};
				});
				return {
					...status,
					timestamp: new Date().toISOString(),
				};
			} catch {
				return {
					connected: false,
					error: 'No device connected',
					timestamp: new Date().toISOString(),
				};
			}
		}

		case 'testConnection': {
			const timeout = this.getNodeParameter('timeout', index, 5000) as number;
			const startTime = Date.now();
			
			try {
				const testResult = await withTransport(this, async (transport) => {
					const info = await getDeviceInfo(transport);
					return {
						success: true,
						deviceModel: info.model,
						responseTime: Date.now() - startTime,
					};
				});
				
				return {
					...testResult,
					timeout,
					timestamp: new Date().toISOString(),
				};
			} catch (error) {
				return {
					success: false,
					error: (error as Error).message,
					responseTime: Date.now() - startTime,
					timeout,
					timestamp: new Date().toISOString(),
				};
			}
		}

		case 'getAppVersion':
			return withTransport(this, async (transport) => {
				const appInfo = await getAppAndVersion(transport);
				
				return {
					appName: appInfo.name || 'Unknown',
					appVersion: appInfo.version || 'Unknown',
					flags: appInfo.flags || 0,
					timestamp: new Date().toISOString(),
				};
			});

		case 'getSdkVersion':
			return {
				packages: {
					'@ledgerhq/hw-transport': '^6.0.0',
					'@ledgerhq/hw-transport-node-hid': '^6.0.0',
					'@ledgerhq/hw-app-btc': '^10.0.0',
					'@ledgerhq/hw-app-eth': '^6.0.0',
					'@ledgerhq/hw-app-solana': '^7.0.0',
					'@ledgerhq/hw-app-cosmos': '^6.0.0',
					'@ledgerhq/hw-app-polkadot': '^6.0.0',
					'@ledgerhq/hw-app-xrp': '^6.0.0',
					'@ledgerhq/hw-app-algorand': '^6.0.0',
					'@ledgerhq/hw-app-tezos': '^6.0.0',
					'@ledgerhq/hw-app-str': '^6.0.0',
				},
				nodeVersion: '1.0.0',
				buildDate: new Date().toISOString(),
			};

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Unknown operation: ${operation}`,
				{ itemIndex: index },
			);
	}
}
