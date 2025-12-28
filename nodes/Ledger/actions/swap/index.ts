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

export const swapOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['swap'],
			},
		},
		options: [
			{
				name: 'Get Quote',
				value: 'getQuote',
				description: 'Get a swap quote for exchanging currencies',
				action: 'Get a swap quote',
			},
			{
				name: 'Get Providers',
				value: 'getProviders',
				description: 'Get available swap providers',
				action: 'Get swap providers',
			},
			{
				name: 'Get Pairs',
				value: 'getPairs',
				description: 'Get available swap pairs',
				action: 'Get swap pairs',
			},
			{
				name: 'Create Swap',
				value: 'createSwap',
				description: 'Create a swap transaction',
				action: 'Create a swap',
			},
			{
				name: 'Sign Swap',
				value: 'signSwap',
				description: 'Sign a swap transaction with Ledger device',
				action: 'Sign a swap',
			},
			{
				name: 'Get Swap Status',
				value: 'getSwapStatus',
				description: 'Get the status of a swap',
				action: 'Get swap status',
			},
			{
				name: 'Get Swap History',
				value: 'getSwapHistory',
				description: 'Get swap transaction history',
				action: 'Get swap history',
			},
			{
				name: 'Cancel Swap',
				value: 'cancelSwap',
				description: 'Cancel a pending swap',
				action: 'Cancel a swap',
			},
		],
		default: 'getQuote',
	},
];

export const swapFields: INodeProperties[] = [
	// Get Quote fields
	{
		displayName: 'From Currency',
		name: 'fromCurrency',
		type: 'string',
		required: true,
		default: 'BTC',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['getQuote', 'createSwap'],
			},
		},
		description: 'The currency to swap from (e.g., BTC, ETH)',
	},
	{
		displayName: 'To Currency',
		name: 'toCurrency',
		type: 'string',
		required: true,
		default: 'ETH',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['getQuote', 'createSwap'],
			},
		},
		description: 'The currency to swap to (e.g., ETH, USDT)',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['getQuote', 'createSwap'],
			},
		},
		description: 'The amount to swap in the from currency',
	},
	{
		displayName: 'Provider',
		name: 'provider',
		type: 'options',
		options: [
			{ name: 'Best Rate', value: 'best' },
			{ name: 'Changelly', value: 'changelly' },
			{ name: 'Paraswap', value: 'paraswap' },
			{ name: '1inch', value: '1inch' },
			{ name: 'Wyre', value: 'wyre' },
		],
		default: 'best',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['getQuote', 'createSwap'],
			},
		},
		description: 'The swap provider to use',
	},
	// Create Swap additional fields
	{
		displayName: 'From Account ID',
		name: 'fromAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['createSwap'],
			},
		},
		description: 'The Ledger Live account ID to swap from',
	},
	{
		displayName: 'To Account ID',
		name: 'toAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['createSwap'],
			},
		},
		description: 'The Ledger Live account ID to swap to',
	},
	// Sign Swap fields
	{
		displayName: 'Swap ID',
		name: 'swapId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['signSwap', 'getSwapStatus', 'cancelSwap'],
			},
		},
		description: 'The unique identifier of the swap',
	},
	{
		displayName: 'Derivation Path',
		name: 'derivationPath',
		type: 'string',
		required: true,
		default: "m/44'/0'/0'/0/0",
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['signSwap'],
			},
		},
		description: 'The BIP32 derivation path for signing',
	},
	// Get Pairs fields
	{
		displayName: 'Base Currency',
		name: 'baseCurrency',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['getPairs'],
			},
		},
		description: 'Filter pairs by base currency (optional)',
	},
	// Get History fields
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['getSwapHistory'],
			},
		},
		description: 'Filter history by account ID (optional)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 20,
		displayOptions: {
			show: {
				resource: ['swap'],
				operation: ['getSwapHistory'],
			},
		},
		description: 'Maximum number of swaps to return',
	},
];
