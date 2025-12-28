/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const xrpOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['xrp'],
			},
		},
		options: [
			{
				name: 'Broadcast Transaction',
				value: 'broadcastTransaction',
				description: 'Broadcast a signed transaction',
				action: 'Broadcast transaction',
			},
			{
				name: 'Get Account Info',
				value: 'getAccountInfo',
				description: 'Get XRP account info',
				action: 'Get account info',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get XRP balance',
				action: 'Get balance',
			},
			{
				name: 'Get Public Key',
				value: 'getPublicKey',
				description: 'Get public key',
				action: 'Get public key',
			},
			{
				name: 'Get XRP Account',
				value: 'getXrpAccount',
				description: 'Get XRP account details',
				action: 'Get XRP account',
			},
			{
				name: 'Get XRP Address',
				value: 'getXrpAddress',
				description: 'Get XRP address',
				action: 'Get XRP address',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
		],
		default: 'getXrpAddress',
	},
];

export const xrpFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['xrp'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Testnet', value: 'testnet' },
			{ name: 'Devnet', value: 'devnet' },
		],
		default: 'mainnet',
		description: 'XRP Ledger network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['xrp'],
			},
		},
		default: 0,
		description: 'Account index',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['xrp'],
				operation: ['getBalance', 'getAccountInfo'],
			},
		},
		default: '',
		description: 'XRP address (leave empty to use derived)',
	},
	{
		displayName: 'Transaction',
		name: 'transaction',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['xrp'],
				operation: ['signTransaction'],
			},
		},
		default: '{}',
		required: true,
		description: 'XRP transaction object',
	},
	{
		displayName: 'Signed Transaction',
		name: 'signedTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['xrp'],
				operation: ['broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Signed transaction blob',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['xrp'],
			},
		},
		options: [
			{
				displayName: 'Verify on Device',
				name: 'verifyOnDevice',
				type: 'boolean',
				default: true,
				description: 'Whether to verify on device display',
			},
		],
	},
];
