// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { SUPPORTED_CURRENCIES } from '../../constants';

export async function executeMultiCurrencyOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			switch (operation) {
				case 'getSupportedCurrencies': {
					const currencies = Object.entries(SUPPORTED_CURRENCIES).map(([id, config]) => ({
						id,
						...config,
					}));
					returnData.push({
						json: {
							currencies,
							count: currencies.length,
						},
					});
					break;
				}

				case 'getCurrencyByTicker': {
					const ticker = this.getNodeParameter('ticker', i) as string;
					const currency = Object.entries(SUPPORTED_CURRENCIES).find(
						([, config]) => config.ticker.toLowerCase() === ticker.toLowerCase(),
					);
					if (currency) {
						returnData.push({
							json: {
								id: currency[0],
								...currency[1],
							},
						});
					} else {
						returnData.push({
							json: {
								error: `Currency with ticker "${ticker}" not found`,
							},
						});
					}
					break;
				}

				case 'getCurrencyInfo': {
					const ticker = this.getNodeParameter('ticker', i) as string;
					const currency = Object.entries(SUPPORTED_CURRENCIES).find(
						([, config]) => config.ticker.toLowerCase() === ticker.toLowerCase(),
					);
					if (currency) {
						returnData.push({
							json: {
								id: currency[0],
								...currency[1],
								networks: ['mainnet', 'testnet'],
							},
						});
					} else {
						returnData.push({
							json: {
								error: `Currency with ticker "${ticker}" not found`,
							},
						});
					}
					break;
				}

				case 'getAllAccounts': {
					returnData.push({
						json: {
							message: 'Get all accounts requires Ledger Live API connection',
							supportedCurrencies: Object.keys(SUPPORTED_CURRENCIES),
						},
					});
					break;
				}

				case 'getBalancesOverview': {
					const fiatCurrency = this.getNodeParameter('fiatCurrency', i, 'usd') as string;
					returnData.push({
						json: {
							message: 'Balances overview requires Ledger Live API connection',
							fiatCurrency,
						},
					});
					break;
				}

				case 'getPortfolioValue': {
					const fiatCurrency = this.getNodeParameter('fiatCurrency', i, 'usd') as string;
					returnData.push({
						json: {
							message: 'Portfolio value requires Ledger Live API connection',
							fiatCurrency,
						},
					});
					break;
				}

				case 'getExchangeRates': {
					const fiatCurrency = this.getNodeParameter('fiatCurrency', i, 'usd') as string;
					returnData.push({
						json: {
							message: 'Exchange rates require external API integration',
							fiatCurrency,
						},
					});
					break;
				}

				case 'convertAmount': {
					const fromCurrency = this.getNodeParameter('fromCurrency', i) as string;
					const toCurrency = this.getNodeParameter('toCurrency', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					returnData.push({
						json: {
							fromCurrency,
							toCurrency,
							amount,
							message: 'Currency conversion requires exchange rate API integration',
						},
					});
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Operation "${operation}" is not supported for Multi-Currency`,
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
export { executeMultiCurrencyOperation as execute };
