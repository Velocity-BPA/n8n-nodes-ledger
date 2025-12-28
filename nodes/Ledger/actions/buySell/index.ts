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

import { INodeProperties } from 'n8n-workflow';

export const buySellOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['buySell'],
			},
		},
		options: [
			{
				name: 'Get Buy Quote',
				value: 'getBuyQuote',
				description: 'Get a quote for buying cryptocurrency',
				action: 'Get a buy quote',
			},
			{
				name: 'Get Sell Quote',
				value: 'getSellQuote',
				description: 'Get a quote for selling cryptocurrency',
				action: 'Get a sell quote',
			},
			{
				name: 'Get Providers',
				value: 'getProviders',
				description: 'Get available buy/sell providers',
				action: 'Get buy sell providers',
			},
			{
				name: 'Get Supported Countries',
				value: 'getSupportedCountries',
				description: 'Get countries where buy/sell is available',
				action: 'Get supported countries',
			},
			{
				name: 'Get Payment Methods',
				value: 'getPaymentMethods',
				description: 'Get available payment methods',
				action: 'Get payment methods',
			},
			{
				name: 'Create Buy Order',
				value: 'createBuyOrder',
				description: 'Create a buy order',
				action: 'Create a buy order',
			},
			{
				name: 'Create Sell Order',
				value: 'createSellOrder',
				description: 'Create a sell order',
				action: 'Create a sell order',
			},
			{
				name: 'Get Order Status',
				value: 'getOrderStatus',
				description: 'Get the status of an order',
				action: 'Get order status',
			},
			{
				name: 'Get Order History',
				value: 'getOrderHistory',
				description: 'Get buy/sell order history',
				action: 'Get order history',
			},
			{
				name: 'Cancel Order',
				value: 'cancelOrder',
				description: 'Cancel a pending order',
				action: 'Cancel an order',
			},
		],
		default: 'getBuyQuote',
	},
];

export const buySellFields: INodeProperties[] = [
	// Get Buy Quote fields
	{
		displayName: 'Cryptocurrency',
		name: 'cryptocurrency',
		type: 'string',
		required: true,
		default: 'BTC',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getBuyQuote', 'getSellQuote', 'createBuyOrder', 'createSellOrder'],
			},
		},
		description: 'The cryptocurrency to buy or sell',
	},
	{
		displayName: 'Fiat Currency',
		name: 'fiatCurrency',
		type: 'options',
		options: [
			{ name: 'USD', value: 'USD' },
			{ name: 'EUR', value: 'EUR' },
			{ name: 'GBP', value: 'GBP' },
			{ name: 'CHF', value: 'CHF' },
			{ name: 'CAD', value: 'CAD' },
			{ name: 'AUD', value: 'AUD' },
			{ name: 'JPY', value: 'JPY' },
		],
		default: 'USD',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getBuyQuote', 'getSellQuote', 'createBuyOrder', 'createSellOrder'],
			},
		},
		description: 'The fiat currency for the transaction',
	},
	{
		displayName: 'Amount Type',
		name: 'amountType',
		type: 'options',
		options: [
			{ name: 'Fiat Amount', value: 'fiat' },
			{ name: 'Crypto Amount', value: 'crypto' },
		],
		default: 'fiat',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getBuyQuote', 'getSellQuote', 'createBuyOrder', 'createSellOrder'],
			},
		},
		description: 'Whether to specify amount in fiat or cryptocurrency',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getBuyQuote', 'getSellQuote', 'createBuyOrder', 'createSellOrder'],
			},
		},
		description: 'The amount to buy or sell',
	},
	{
		displayName: 'Provider',
		name: 'provider',
		type: 'options',
		options: [
			{ name: 'Best Rate', value: 'best' },
			{ name: 'MoonPay', value: 'moonpay' },
			{ name: 'Coinify', value: 'coinify' },
			{ name: 'Wyre', value: 'wyre' },
			{ name: 'Banxa', value: 'banxa' },
			{ name: 'Ramp', value: 'ramp' },
		],
		default: 'best',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getBuyQuote', 'getSellQuote', 'createBuyOrder', 'createSellOrder'],
			},
		},
		description: 'The on-ramp/off-ramp provider to use',
	},
	// Create Order additional fields
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['createBuyOrder', 'createSellOrder'],
			},
		},
		description: 'The Ledger Live account ID for the transaction',
	},
	{
		displayName: 'Payment Method',
		name: 'paymentMethod',
		type: 'options',
		options: [
			{ name: 'Credit Card', value: 'credit_card' },
			{ name: 'Debit Card', value: 'debit_card' },
			{ name: 'Bank Transfer', value: 'bank_transfer' },
			{ name: 'Apple Pay', value: 'apple_pay' },
			{ name: 'Google Pay', value: 'google_pay' },
		],
		default: 'credit_card',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['createBuyOrder', 'createSellOrder'],
			},
		},
		description: 'The payment method to use',
	},
	// Get Order Status fields
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getOrderStatus', 'cancelOrder'],
			},
		},
		description: 'The unique identifier of the order',
	},
	// Get Supported Countries fields
	{
		displayName: 'Provider Filter',
		name: 'providerFilter',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getSupportedCountries'],
			},
		},
		description: 'Filter countries by specific provider (optional)',
	},
	// Get Payment Methods fields
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		default: 'US',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getPaymentMethods'],
			},
		},
		description: 'The country code (ISO 3166-1 alpha-2)',
	},
	// Get Order History fields
	{
		displayName: 'Filter Account',
		name: 'filterAccount',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getOrderHistory'],
			},
		},
		description: 'Filter history by account ID (optional)',
	},
	{
		displayName: 'Order Type',
		name: 'orderType',
		type: 'options',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Buy', value: 'buy' },
			{ name: 'Sell', value: 'sell' },
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getOrderHistory'],
			},
		},
		description: 'Filter by order type',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 20,
		displayOptions: {
			show: {
				resource: ['buySell'],
				operation: ['getOrderHistory'],
			},
		},
		description: 'Maximum number of orders to return',
	},
];
