// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	switch (operation) {
		case 'getLedgerLiveVersion':
			return {
				version: '2.70.0',
				platform: process.platform,
				architecture: process.arch,
				apiVersion: '1.0.0',
				features: {
					swap: true,
					buy: true,
					staking: true,
					nft: true,
				},
				note: 'Actual version requires Ledger Live API connection',
			};

		case 'getConnectedAccounts': {
			const includeHidden = this.getNodeParameter('includeHidden', index, false) as boolean;
			const currencyFilter = this.getNodeParameter('currencyFilter', index, '') as string;

			return {
				accounts: [],
				total: 0,
				filters: {
					includeHidden,
					currencyFilter: currencyFilter || 'none',
				},
				note: 'Requires Ledger Live API connection to retrieve actual accounts',
			};
		}

		case 'syncAllAccounts': {
			const forceFullSync = this.getNodeParameter('forceFullSync', index, false) as boolean;

			return {
				status: 'initiated',
				syncType: forceFullSync ? 'full' : 'incremental',
				timestamp: new Date().toISOString(),
				accountsToSync: 0,
				note: 'Requires Ledger Live API connection to perform sync',
			};
		}

		case 'getSettings':
			return {
				settings: {
					currency: {
						counterValue: 'USD',
						locale: 'en-US',
					},
					display: {
						theme: 'dark',
						language: 'en',
					},
					security: {
						lockTimeout: 300,
						passwordEnabled: false,
					},
					developer: {
						experimentalFeatures: false,
					},
				},
				note: 'Requires Ledger Live API connection to retrieve actual settings',
			};

		case 'getCurrencySettings': {
			const currency = this.getNodeParameter('currency', index) as string;

			return {
				currency,
				settings: {
					confirmationsRequired: currency === 'bitcoin' ? 3 : 12,
					derivationMode: 'native_segwit',
					explorer: `${currency}.explorer.ledger.com`,
					node: 'ledger',
				},
				note: 'Requires Ledger Live API connection to retrieve actual settings',
			};
		}

		case 'exportAccounts': {
			const exportFormat = this.getNodeParameter('exportFormat', index, 'json') as string;
			const includeOperations = this.getNodeParameter('includeOperations', index, true) as boolean;

			return {
				format: exportFormat,
				includeOperations,
				exportedAt: new Date().toISOString(),
				accounts: [],
				operations: includeOperations ? [] : undefined,
				note: 'Requires Ledger Live API connection to export actual data',
			};
		}

		case 'importAccounts': {
			const importData = this.getNodeParameter('importData', index) as string;

			let parsedData: unknown;
			try {
				parsedData = JSON.parse(importData);
			} catch {
				throw new NodeOperationError(
					this.getNode(),
					'Invalid JSON format for import data',
					{ itemIndex: index },
				);
			}

			return {
				status: 'pending',
				importData: parsedData,
				timestamp: new Date().toISOString(),
				note: 'Requires Ledger Live API connection to import accounts',
			};
		}

		case 'getOperationHistory': {
			const accountId = this.getNodeParameter('accountId', index, '') as string;
			const limit = this.getNodeParameter('limit', index, 50) as number;
			const operationType = this.getNodeParameter('operationType', index, 'all') as string;

			return {
				operations: [],
				total: 0,
				filters: {
					accountId: accountId || 'all',
					limit,
					operationType,
				},
				note: 'Requires Ledger Live API connection to retrieve operation history',
			};
		}

		case 'getMarketData': {
			const currencies = this.getNodeParameter('currencies', index, 'bitcoin,ethereum') as string;
			const counterValue = this.getNodeParameter('counterValue', index, 'usd') as string;

			const currencyList = currencies.split(',').map((c) => c.trim().toLowerCase());

			const marketData = currencyList.map((currency) => ({
				id: currency,
				symbol: currency.substring(0, 3).toUpperCase(),
				name: currency.charAt(0).toUpperCase() + currency.slice(1),
				price: 0,
				change24h: 0,
				marketCap: 0,
				volume24h: 0,
				counterValue,
			}));

			return {
				marketData,
				counterValue,
				timestamp: new Date().toISOString(),
				note: 'Requires Ledger Live API connection to retrieve actual market data',
			};
		}

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Unknown operation: ${operation}`,
				{ itemIndex: index },
			);
	}
}
