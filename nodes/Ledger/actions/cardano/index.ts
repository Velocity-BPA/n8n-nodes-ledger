/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const cardanoOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cardano'],
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
				name: 'Derive Address',
				value: 'deriveAddress',
				description: 'Derive address from path',
				action: 'Derive address',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get ADA balance',
				action: 'Get balance',
			},
			{
				name: 'Get Cardano Account',
				value: 'getCardanoAccount',
				description: 'Get Cardano account details',
				action: 'Get Cardano account',
			},
			{
				name: 'Get Cardano Address',
				value: 'getCardanoAddress',
				description: 'Get Cardano address',
				action: 'Get Cardano address',
			},
			{
				name: 'Get Extended Public Key',
				value: 'getExtendedPublicKey',
				description: 'Get extended public key',
				action: 'Get extended public key',
			},
			{
				name: 'Get Staking Key',
				value: 'getStakingKey',
				description: 'Get staking key',
				action: 'Get staking key',
			},
			{
				name: 'Get UTXOs',
				value: 'getUtxos',
				description: 'Get unspent transaction outputs',
				action: 'Get UTXOs',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
		],
		default: 'getCardanoAddress',
	},
];

export const cardanoFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['cardano'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Preprod', value: 'preprod' },
			{ name: 'Preview', value: 'preview' },
		],
		default: 'mainnet',
		description: 'Cardano network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['cardano'],
			},
		},
		default: 0,
		description: 'Account index',
	},
	{
		displayName: 'Address Index',
		name: 'addressIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['cardano'],
				operation: ['getCardanoAddress', 'deriveAddress'],
			},
		},
		default: 0,
		description: 'Address index',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['cardano'],
				operation: ['getBalance', 'getUtxos'],
			},
		},
		default: '',
		description: 'Cardano address (leave empty to use derived)',
	},
	{
		displayName: 'Transaction',
		name: 'transaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['cardano'],
				operation: ['signTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Serialized transaction (CBOR hex)',
	},
	{
		displayName: 'Signed Transaction',
		name: 'signedTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['cardano'],
				operation: ['broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Signed transaction (CBOR hex)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['cardano'],
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
				displayName: 'Address Type',
				name: 'addressType',
				type: 'options',
				options: [
					{ name: 'Base', value: 'base' },
					{ name: 'Enterprise', value: 'enterprise' },
					{ name: 'Reward', value: 'reward' },
				],
				default: 'base',
				description: 'Cardano address type',
			},
		],
	},
];
