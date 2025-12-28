/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const stellarOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['stellar'],
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
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get XLM balance',
				action: 'Get balance',
			},
			{
				name: 'Get Public Key',
				value: 'getPublicKey',
				description: 'Get public key',
				action: 'Get public key',
			},
			{
				name: 'Get Stellar Account',
				value: 'getStellarAccount',
				description: 'Get Stellar account details',
				action: 'Get Stellar account',
			},
			{
				name: 'Get Stellar Address',
				value: 'getStellarAddress',
				description: 'Get Stellar address',
				action: 'Get Stellar address',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
		],
		default: 'getStellarAddress',
	},
];

export const stellarFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['stellar'],
			},
		},
		options: [
			{ name: 'Public', value: 'public' },
			{ name: 'Testnet', value: 'testnet' },
		],
		default: 'public',
		description: 'Stellar network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['stellar'],
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
				resource: ['stellar'],
				operation: ['getBalance'],
			},
		},
		default: '',
		description: 'Stellar address (leave empty to use derived)',
	},
	{
		displayName: 'Transaction',
		name: 'transaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['stellar'],
				operation: ['signTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Transaction envelope (XDR)',
	},
	{
		displayName: 'Signed Transaction',
		name: 'signedTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['stellar'],
				operation: ['broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Signed transaction envelope (XDR)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['stellar'],
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
