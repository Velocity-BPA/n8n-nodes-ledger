/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const algorandOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['algorand'],
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
				name: 'Get Algorand Account',
				value: 'getAlgorandAccount',
				description: 'Get Algorand account details',
				action: 'Get Algorand account',
			},
			{
				name: 'Get Algorand Address',
				value: 'getAlgorandAddress',
				description: 'Get Algorand address',
				action: 'Get Algorand address',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get ALGO balance',
				action: 'Get balance',
			},
			{
				name: 'Get Public Key',
				value: 'getPublicKey',
				description: 'Get public key',
				action: 'Get public key',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
		],
		default: 'getAlgorandAddress',
	},
];

export const algorandFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['algorand'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Testnet', value: 'testnet' },
			{ name: 'Betanet', value: 'betanet' },
		],
		default: 'mainnet',
		description: 'Algorand network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['algorand'],
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
				resource: ['algorand'],
				operation: ['getBalance'],
			},
		},
		default: '',
		description: 'Algorand address (leave empty to use derived)',
	},
	{
		displayName: 'Transaction',
		name: 'transaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['algorand'],
				operation: ['signTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Transaction bytes (base64)',
	},
	{
		displayName: 'Signed Transaction',
		name: 'signedTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['algorand'],
				operation: ['broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Signed transaction (base64)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['algorand'],
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
