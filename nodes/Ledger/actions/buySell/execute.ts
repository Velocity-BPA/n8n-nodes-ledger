// @ts-nocheck
/**
 * n8n-nodes-ledger
 * Copyright (c) 2025
 *
 * This file is licensed under the Business Source License 1.1 (BSL 1.1).
 * You may use this file in compliance with the BSL 1.1 License.
 * You may obtain a copy of the BSL 1.1 License at:
 *
 *     https://mariadb.com/bsl11/
 *
 * See the LICENSE file in the project root for the full license text.
 * See the COMMERCIAL_LICENSE.md file for commercial licensing options.
 */

import {
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';

export async function executeBuySellOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			if (operation === 'getBuyQuote') {
				const cryptocurrency = this.getNodeParameter('cryptocurrency', i) as string;
				const fiatCurrency = this.getNodeParameter('fiatCurrency', i) as string;
				const amountType = this.getNodeParameter('amountType', i) as string;
				const amount = this.getNodeParameter('amount', i) as string;
				const provider = this.getNodeParameter('provider', i) as string;

				returnData.push({
					json: {
						success: true,
						quote: {
							type: 'buy',
							cryptocurrency,
							fiatCurrency,
							[amountType === 'fiat' ? 'fiatAmount' : 'cryptoAmount']: amount,
							[amountType === 'fiat' ? 'cryptoAmount' : 'fiatAmount']: 'Requires provider API',
							rate: 'Requires provider API',
							provider: provider === 'best' ? 'Best available' : provider,
							fees: {
								network: 'Calculated by provider',
								service: 'Calculated by provider',
								total: 'Calculated by provider',
							},
							expiresAt: new Date(Date.now() + 300000).toISOString(),
						},
						message: 'Buy quote - requires Ledger Live API integration',
					},
				});
			} else if (operation === 'getSellQuote') {
				const cryptocurrency = this.getNodeParameter('cryptocurrency', i) as string;
				const fiatCurrency = this.getNodeParameter('fiatCurrency', i) as string;
				const amountType = this.getNodeParameter('amountType', i) as string;
				const amount = this.getNodeParameter('amount', i) as string;
				const provider = this.getNodeParameter('provider', i) as string;

				returnData.push({
					json: {
						success: true,
						quote: {
							type: 'sell',
							cryptocurrency,
							fiatCurrency,
							[amountType === 'fiat' ? 'fiatAmount' : 'cryptoAmount']: amount,
							[amountType === 'fiat' ? 'cryptoAmount' : 'fiatAmount']: 'Requires provider API',
							rate: 'Requires provider API',
							provider: provider === 'best' ? 'Best available' : provider,
							fees: {
								network: 'Calculated by provider',
								service: 'Calculated by provider',
								total: 'Calculated by provider',
							},
							expiresAt: new Date(Date.now() + 300000).toISOString(),
						},
						message: 'Sell quote - requires Ledger Live API integration',
					},
				});
			} else if (operation === 'getProviders') {
				returnData.push({
					json: {
						success: true,
						providers: [
							{
								id: 'moonpay',
								name: 'MoonPay',
								supportsBuy: true,
								supportsSell: true,
								fiatCurrencies: ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD'],
								cryptocurrencies: ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'MATIC'],
								paymentMethods: ['credit_card', 'debit_card', 'bank_transfer', 'apple_pay'],
							},
							{
								id: 'coinify',
								name: 'Coinify',
								supportsBuy: true,
								supportsSell: true,
								fiatCurrencies: ['EUR', 'USD', 'GBP', 'DKK'],
								cryptocurrencies: ['BTC', 'ETH', 'USDT'],
								paymentMethods: ['credit_card', 'bank_transfer'],
							},
							{
								id: 'wyre',
								name: 'Wyre',
								supportsBuy: true,
								supportsSell: false,
								fiatCurrencies: ['USD', 'EUR', 'GBP'],
								cryptocurrencies: ['BTC', 'ETH', 'DAI', 'USDC'],
								paymentMethods: ['debit_card', 'apple_pay', 'bank_transfer'],
							},
							{
								id: 'banxa',
								name: 'Banxa',
								supportsBuy: true,
								supportsSell: true,
								fiatCurrencies: ['USD', 'EUR', 'AUD', 'CAD', 'GBP'],
								cryptocurrencies: ['BTC', 'ETH', 'USDT', 'BNB', 'SOL'],
								paymentMethods: ['credit_card', 'debit_card', 'bank_transfer'],
							},
							{
								id: 'ramp',
								name: 'Ramp Network',
								supportsBuy: true,
								supportsSell: true,
								fiatCurrencies: ['EUR', 'GBP', 'USD'],
								cryptocurrencies: ['ETH', 'USDC', 'DAI', 'MATIC'],
								paymentMethods: ['bank_transfer', 'apple_pay', 'google_pay'],
							},
						],
						message: 'Provider list - requires Ledger Live API for current availability',
					},
				});
			} else if (operation === 'getSupportedCountries') {
				const providerFilter = this.getNodeParameter('providerFilter', i) as string;

				returnData.push({
					json: {
						success: true,
						providerFilter: providerFilter || 'all',
						countries: [
							{ code: 'US', name: 'United States', providers: ['moonpay', 'wyre', 'banxa'] },
							{ code: 'GB', name: 'United Kingdom', providers: ['moonpay', 'coinify', 'ramp'] },
							{ code: 'DE', name: 'Germany', providers: ['moonpay', 'coinify', 'banxa', 'ramp'] },
							{ code: 'FR', name: 'France', providers: ['moonpay', 'coinify', 'ramp'] },
							{ code: 'CA', name: 'Canada', providers: ['moonpay', 'banxa'] },
							{ code: 'AU', name: 'Australia', providers: ['moonpay', 'banxa'] },
						],
						message: 'Country list - requires Ledger Live API for complete list',
					},
				});
			} else if (operation === 'getPaymentMethods') {
				const country = this.getNodeParameter('country', i) as string;

				returnData.push({
					json: {
						success: true,
						country,
						paymentMethods: [
							{ id: 'credit_card', name: 'Credit Card', available: true, limits: { min: 30, max: 5000 } },
							{ id: 'debit_card', name: 'Debit Card', available: true, limits: { min: 30, max: 5000 } },
							{ id: 'bank_transfer', name: 'Bank Transfer', available: true, limits: { min: 100, max: 50000 } },
							{ id: 'apple_pay', name: 'Apple Pay', available: true, limits: { min: 30, max: 3000 } },
							{ id: 'google_pay', name: 'Google Pay', available: true, limits: { min: 30, max: 3000 } },
						],
						message: 'Payment methods - requires Ledger Live API for actual availability',
					},
				});
			} else if (operation === 'createBuyOrder') {
				const cryptocurrency = this.getNodeParameter('cryptocurrency', i) as string;
				const fiatCurrency = this.getNodeParameter('fiatCurrency', i) as string;
				const amount = this.getNodeParameter('amount', i) as string;
				const provider = this.getNodeParameter('provider', i) as string;
				const accountId = this.getNodeParameter('accountId', i) as string;
				const paymentMethod = this.getNodeParameter('paymentMethod', i) as string;

				returnData.push({
					json: {
						success: true,
						order: {
							id: `buy_${Date.now()}`,
							type: 'buy',
							status: 'pending_payment',
							cryptocurrency,
							fiatCurrency,
							amount,
							accountId,
							provider: provider === 'best' ? 'Selected best rate' : provider,
							paymentMethod,
							createdAt: new Date().toISOString(),
							redirectUrl: 'Requires provider integration',
						},
						message: 'Buy order created - requires Ledger Live API integration',
					},
				});
			} else if (operation === 'createSellOrder') {
				const cryptocurrency = this.getNodeParameter('cryptocurrency', i) as string;
				const fiatCurrency = this.getNodeParameter('fiatCurrency', i) as string;
				const amount = this.getNodeParameter('amount', i) as string;
				const provider = this.getNodeParameter('provider', i) as string;
				const accountId = this.getNodeParameter('accountId', i) as string;
				const paymentMethod = this.getNodeParameter('paymentMethod', i) as string;

				returnData.push({
					json: {
						success: true,
						order: {
							id: `sell_${Date.now()}`,
							type: 'sell',
							status: 'pending_signature',
							cryptocurrency,
							fiatCurrency,
							amount,
							accountId,
							provider: provider === 'best' ? 'Selected best rate' : provider,
							paymentMethod,
							createdAt: new Date().toISOString(),
						},
						message: 'Sell order created - requires Ledger Live API integration',
					},
				});
			} else if (operation === 'getOrderStatus') {
				const orderId = this.getNodeParameter('orderId', i) as string;

				returnData.push({
					json: {
						success: true,
						orderId,
						status: 'Requires Ledger Live API',
						possibleStatuses: [
							'pending_payment',
							'pending_signature',
							'processing',
							'completed',
							'failed',
							'cancelled',
							'refunded',
						],
						message: 'Order status - requires Ledger Live API integration',
					},
				});
			} else if (operation === 'getOrderHistory') {
				const filterAccount = this.getNodeParameter('filterAccount', i) as string;
				const orderType = this.getNodeParameter('orderType', i) as string;
				const limit = this.getNodeParameter('limit', i) as number;

				returnData.push({
					json: {
						success: true,
						accountId: filterAccount || 'all',
						orderType,
						limit,
						orders: [],
						message: 'Order history - requires Ledger Live API integration',
					},
				});
			} else if (operation === 'cancelOrder') {
				const orderId = this.getNodeParameter('orderId', i) as string;

				returnData.push({
					json: {
						success: true,
						orderId,
						status: 'cancelled',
						cancelledAt: new Date().toISOString(),
						message: 'Order cancellation - requires Ledger Live API integration',
					},
				});
			} else {
				throw new NodeOperationError(
					this.getNode(),
					`Unknown operation: ${operation}`,
					{ itemIndex: i },
				);
			}
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						success: false,
						error: error instanceof Error ? error.message : 'Unknown error',
					},
				});
				continue;
			}
			throw error;
		}
	}

	return returnData;
}
// Export alias for main node
export { executeBuySellOperation as execute };
