/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const nearOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['near'],
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
				description: 'Get NEAR balance',
				action: 'Get balance',
			},
			{
				name: 'Get Near Account',
				value: 'getNearAccount',
				description: 'Get NEAR account details',
				action: 'Get NEAR account',
			},
			{
				name: 'Get Near Address',
				value: 'getNearAddress',
				description: 'Get NEAR address',
				action: 'Get NEAR address',
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
		default: 'getNearAddress',
	},
];

export const nearFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['near'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Testnet', value: 'testnet' },
		],
		default: 'mainnet',
		description: 'NEAR network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['near'],
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
				resource: ['near'],
				operation: ['getBalance'],
			},
		},
		default: '',
		description: 'NEAR address (leave empty to use derived)',
	},
	{
		displayName: 'Transaction',
		name: 'transaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['near'],
				operation: ['signTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Serialized transaction (base64)',
	},
	{
		displayName: 'Signed Transaction',
		name: 'signedTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['near'],
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
				resource: ['near'],
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
