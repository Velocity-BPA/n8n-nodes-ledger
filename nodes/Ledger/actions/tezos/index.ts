/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const tezosOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tezos'],
			},
		},
		options: [
			{
				name: 'Broadcast Operation',
				value: 'broadcastOperation',
				description: 'Broadcast a signed operation',
				action: 'Broadcast operation',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get XTZ balance',
				action: 'Get balance',
			},
			{
				name: 'Get Public Key',
				value: 'getPublicKey',
				description: 'Get public key',
				action: 'Get public key',
			},
			{
				name: 'Get Tezos Account',
				value: 'getTezosAccount',
				description: 'Get Tezos account details',
				action: 'Get Tezos account',
			},
			{
				name: 'Get Tezos Address',
				value: 'getTezosAddress',
				description: 'Get Tezos address',
				action: 'Get Tezos address',
			},
			{
				name: 'Sign Operation',
				value: 'signOperation',
				description: 'Sign an operation',
				action: 'Sign operation',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
		],
		default: 'getTezosAddress',
	},
];

export const tezosFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['tezos'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Ghostnet', value: 'ghostnet' },
		],
		default: 'mainnet',
		description: 'Tezos network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['tezos'],
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
				resource: ['tezos'],
				operation: ['getBalance'],
			},
		},
		default: '',
		description: 'Tezos address (leave empty to use derived)',
	},
	{
		displayName: 'Operation',
		name: 'operationData',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tezos'],
				operation: ['signOperation', 'signTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Operation bytes (hex)',
	},
	{
		displayName: 'Signed Operation',
		name: 'signedOperation',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tezos'],
				operation: ['broadcastOperation'],
			},
		},
		default: '',
		required: true,
		description: 'Signed operation bytes',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['tezos'],
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
			{
				displayName: 'Curve',
				name: 'curve',
				type: 'options',
				options: [
					{ name: 'Ed25519', value: 'ed25519' },
					{ name: 'Secp256k1', value: 'secp256k1' },
					{ name: 'P256', value: 'p256' },
				],
				default: 'ed25519',
				description: 'Cryptographic curve',
			},
		],
	},
];
