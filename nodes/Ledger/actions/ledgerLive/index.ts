/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const ledgerLiveOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
			},
		},
		options: [
			{
				name: 'Get Ledger Live Version',
				value: 'getLedgerLiveVersion',
				description: 'Get the version of Ledger Live',
				action: 'Get ledger live version',
			},
			{
				name: 'Get Connected Accounts',
				value: 'getConnectedAccounts',
				description: 'Get all accounts connected in Ledger Live',
				action: 'Get connected accounts',
			},
			{
				name: 'Sync All Accounts',
				value: 'syncAllAccounts',
				description: 'Synchronize all accounts in Ledger Live',
				action: 'Sync all accounts',
			},
			{
				name: 'Get Settings',
				value: 'getSettings',
				description: 'Get Ledger Live settings',
				action: 'Get settings',
			},
			{
				name: 'Get Currency Settings',
				value: 'getCurrencySettings',
				description: 'Get settings for a specific currency',
				action: 'Get currency settings',
			},
			{
				name: 'Export Accounts',
				value: 'exportAccounts',
				description: 'Export accounts data from Ledger Live',
				action: 'Export accounts',
			},
			{
				name: 'Import Accounts',
				value: 'importAccounts',
				description: 'Import accounts into Ledger Live',
				action: 'Import accounts',
			},
			{
				name: 'Get Operation History',
				value: 'getOperationHistory',
				description: 'Get operation history from Ledger Live',
				action: 'Get operation history',
			},
			{
				name: 'Get Market Data',
				value: 'getMarketData',
				description: 'Get market data for cryptocurrencies',
				action: 'Get market data',
			},
		],
		default: 'getLedgerLiveVersion',
	},
];

export const ledgerLiveFields: INodeProperties[] = [
	// Get Connected Accounts fields
	{
		displayName: 'Include Hidden',
		name: 'includeHidden',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['getConnectedAccounts'],
			},
		},
		description: 'Whether to include hidden accounts',
	},
	{
		displayName: 'Currency Filter',
		name: 'currencyFilter',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['getConnectedAccounts'],
			},
		},
		description: 'Filter accounts by currency (e.g., bitcoin, ethereum)',
	},

	// Sync All Accounts fields
	{
		displayName: 'Force Full Sync',
		name: 'forceFullSync',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['syncAllAccounts'],
			},
		},
		description: 'Whether to force a full synchronization instead of incremental',
	},

	// Get Currency Settings fields
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: 'bitcoin',
		required: true,
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['getCurrencySettings'],
			},
		},
		description: 'The currency to get settings for',
	},

	// Export Accounts fields
	{
		displayName: 'Export Format',
		name: 'exportFormat',
		type: 'options',
		options: [
			{ name: 'JSON', value: 'json' },
			{ name: 'CSV', value: 'csv' },
		],
		default: 'json',
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['exportAccounts'],
			},
		},
		description: 'Format for exported data',
	},
	{
		displayName: 'Include Operations',
		name: 'includeOperations',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['exportAccounts'],
			},
		},
		description: 'Whether to include transaction history in export',
	},

	// Import Accounts fields
	{
		displayName: 'Import Data',
		name: 'importData',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['importAccounts'],
			},
		},
		description: 'Account data to import (JSON format)',
	},

	// Get Operation History fields
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['getOperationHistory'],
			},
		},
		description: 'Filter by specific account ID (leave empty for all accounts)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['getOperationHistory'],
			},
		},
		description: 'Maximum number of operations to return',
	},
	{
		displayName: 'Operation Type',
		name: 'operationType',
		type: 'options',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Sent', value: 'OUT' },
			{ name: 'Received', value: 'IN' },
			{ name: 'Fees', value: 'FEES' },
			{ name: 'NFT In', value: 'NFT_IN' },
			{ name: 'NFT Out', value: 'NFT_OUT' },
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['getOperationHistory'],
			},
		},
		description: 'Filter by operation type',
	},

	// Get Market Data fields
	{
		displayName: 'Currencies',
		name: 'currencies',
		type: 'string',
		default: 'bitcoin,ethereum',
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['getMarketData'],
			},
		},
		description: 'Comma-separated list of currencies to get market data for',
	},
	{
		displayName: 'Counter Value',
		name: 'counterValue',
		type: 'options',
		options: [
			{ name: 'USD', value: 'usd' },
			{ name: 'EUR', value: 'eur' },
			{ name: 'GBP', value: 'gbp' },
			{ name: 'BTC', value: 'btc' },
		],
		default: 'usd',
		displayOptions: {
			show: {
				resource: ['ledgerLive'],
				operation: ['getMarketData'],
			},
		},
		description: 'Counter currency for prices',
	},
];
