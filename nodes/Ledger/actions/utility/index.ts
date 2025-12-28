/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const utilityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['utility'],
			},
		},
		options: [
			{
				name: 'Get Supported Currencies',
				value: 'getSupportedCurrencies',
				description: 'Get list of all supported currencies',
				action: 'Get supported currencies',
			},
			{
				name: 'Get Derivation Paths',
				value: 'getDerivationPaths',
				description: 'Get derivation path templates for currencies',
				action: 'Get derivation paths',
			},
			{
				name: 'Derive Path',
				value: 'derivePath',
				description: 'Derive a specific path from template',
				action: 'Derive path',
			},
			{
				name: 'Validate Derivation Path',
				value: 'validateDerivationPath',
				description: 'Validate a derivation path format',
				action: 'Validate derivation path',
			},
			{
				name: 'Get Device Transport',
				value: 'getDeviceTransport',
				description: 'Get information about available transports',
				action: 'Get device transport',
			},
			{
				name: 'Get Connection Status',
				value: 'getConnectionStatus',
				description: 'Get current connection status',
				action: 'Get connection status',
			},
			{
				name: 'Test Connection',
				value: 'testConnection',
				description: 'Test device connection',
				action: 'Test connection',
			},
			{
				name: 'Get App Version',
				value: 'getAppVersion',
				description: 'Get version of running app on device',
				action: 'Get app version',
			},
			{
				name: 'Get SDK Version',
				value: 'getSdkVersion',
				description: 'Get Ledger SDK version information',
				action: 'Get SDK version',
			},
		],
		default: 'getSupportedCurrencies',
	},
];

export const utilityFields: INodeProperties[] = [
	// Get Supported Currencies fields
	{
		displayName: 'Category',
		name: 'category',
		type: 'options',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Native Coins', value: 'native' },
			{ name: 'EVM Chains', value: 'evm' },
			{ name: 'Tokens', value: 'token' },
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['getSupportedCurrencies'],
			},
		},
		description: 'Filter currencies by category',
	},

	// Get Derivation Paths fields
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['getDerivationPaths'],
			},
		},
		description: 'Filter paths by currency (leave empty for all)',
	},

	// Derive Path fields
	{
		displayName: 'Path Template',
		name: 'pathTemplate',
		type: 'string',
		default: "m/44'/60'/0'/0/x",
		required: true,
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['derivePath'],
			},
		},
		description: "Derivation path template (use 'x' for index placeholder)",
	},
	{
		displayName: 'Index',
		name: 'index',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['derivePath'],
			},
		},
		description: 'Index to substitute in the path template',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['derivePath'],
			},
		},
		description: 'Account index (for account-level paths)',
	},

	// Validate Derivation Path fields
	{
		displayName: 'Path',
		name: 'path',
		type: 'string',
		default: "m/44'/60'/0'/0/0",
		required: true,
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['validateDerivationPath'],
			},
		},
		description: 'Derivation path to validate',
	},
	{
		displayName: 'Strict Mode',
		name: 'strictMode',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['validateDerivationPath'],
			},
		},
		description: 'Whether to enforce standard BIP path formats',
	},

	// Test Connection fields
	{
		displayName: 'Timeout (ms)',
		name: 'timeout',
		type: 'number',
		default: 5000,
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['testConnection'],
			},
		},
		description: 'Connection timeout in milliseconds',
	},
];
