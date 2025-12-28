/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const multiCurrencyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['multiCurrency'],
			},
		},
		options: [
			{
				name: 'Convert Amount',
				value: 'convertAmount',
				description: 'Convert between currencies',
				action: 'Convert amount',
			},
			{
				name: 'Get All Accounts',
				value: 'getAllAccounts',
				description: 'Get all accounts across currencies',
				action: 'Get all accounts',
			},
			{
				name: 'Get Balances Overview',
				value: 'getBalancesOverview',
				description: 'Get balance overview for all accounts',
				action: 'Get balances overview',
			},
			{
				name: 'Get Currency by Ticker',
				value: 'getCurrencyByTicker',
				description: 'Get currency by ticker symbol',
				action: 'Get currency by ticker',
			},
			{
				name: 'Get Currency Info',
				value: 'getCurrencyInfo',
				description: 'Get detailed currency information',
				action: 'Get currency info',
			},
			{
				name: 'Get Exchange Rates',
				value: 'getExchangeRates',
				description: 'Get exchange rates',
				action: 'Get exchange rates',
			},
			{
				name: 'Get Portfolio Value',
				value: 'getPortfolioValue',
				description: 'Get total portfolio value',
				action: 'Get portfolio value',
			},
			{
				name: 'Get Supported Currencies',
				value: 'getSupportedCurrencies',
				description: 'Get list of supported currencies',
				action: 'Get supported currencies',
			},
		],
		default: 'getSupportedCurrencies',
	},
];

export const multiCurrencyFields: INodeProperties[] = [
	{
		displayName: 'Ticker',
		name: 'ticker',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['multiCurrency'],
				operation: ['getCurrencyByTicker', 'getCurrencyInfo'],
			},
		},
		default: '',
		required: true,
		description: 'Currency ticker symbol (e.g., BTC, ETH)',
	},
	{
		displayName: 'From Currency',
		name: 'fromCurrency',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['multiCurrency'],
				operation: ['convertAmount'],
			},
		},
		default: '',
		required: true,
		description: 'Source currency ticker',
	},
	{
		displayName: 'To Currency',
		name: 'toCurrency',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['multiCurrency'],
				operation: ['convertAmount'],
			},
		},
		default: '',
		required: true,
		description: 'Target currency ticker',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['multiCurrency'],
				operation: ['convertAmount'],
			},
		},
		default: '',
		required: true,
		description: 'Amount to convert',
	},
	{
		displayName: 'Fiat Currency',
		name: 'fiatCurrency',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['multiCurrency'],
				operation: ['getPortfolioValue', 'getExchangeRates', 'getBalancesOverview'],
			},
		},
		options: [
			{ name: 'USD', value: 'usd' },
			{ name: 'EUR', value: 'eur' },
			{ name: 'GBP', value: 'gbp' },
			{ name: 'JPY', value: 'jpy' },
			{ name: 'CHF', value: 'chf' },
			{ name: 'CAD', value: 'cad' },
			{ name: 'AUD', value: 'aud' },
		],
		default: 'usd',
		description: 'Fiat currency for value conversion',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['multiCurrency'],
			},
		},
		options: [
			{
				displayName: 'Include Zero Balances',
				name: 'includeZeroBalances',
				type: 'boolean',
				default: false,
				description: 'Whether to include accounts with zero balance',
			},
			{
				displayName: 'Include Tokens',
				name: 'includeTokens',
				type: 'boolean',
				default: true,
				description: 'Whether to include token accounts',
			},
		],
	},
];
