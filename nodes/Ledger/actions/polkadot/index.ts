/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const polkadotOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['polkadot'],
			},
		},
		options: [
			{
				name: 'Broadcast Transaction',
				value: 'broadcastTransaction',
				description: 'Broadcast a signed extrinsic',
				action: 'Broadcast transaction',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get account balance',
				action: 'Get balance',
			},
			{
				name: 'Get Metadata',
				value: 'getMetadata',
				description: 'Get chain metadata',
				action: 'Get metadata',
			},
			{
				name: 'Get Polkadot Account',
				value: 'getPolkadotAccount',
				description: 'Get Polkadot account details',
				action: 'Get Polkadot account',
			},
			{
				name: 'Get Polkadot Address',
				value: 'getPolkadotAddress',
				description: 'Get Polkadot address',
				action: 'Get Polkadot address',
			},
			{
				name: 'Sign Extrinsic',
				value: 'signExtrinsic',
				description: 'Sign an extrinsic',
				action: 'Sign extrinsic',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
		],
		default: 'getPolkadotAddress',
	},
];

export const polkadotFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['polkadot'],
			},
		},
		options: [
			{ name: 'Polkadot', value: 'polkadot' },
			{ name: 'Kusama', value: 'kusama' },
			{ name: 'Westend (Testnet)', value: 'westend' },
			{ name: 'Rococo (Testnet)', value: 'rococo' },
		],
		default: 'polkadot',
		description: 'Polkadot network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['polkadot'],
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
				resource: ['polkadot'],
				operation: ['getPolkadotAddress'],
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
				resource: ['polkadot'],
				operation: ['getBalance'],
			},
		},
		default: '',
		description: 'Polkadot address (leave empty to use derived)',
	},
	{
		displayName: 'Extrinsic',
		name: 'extrinsic',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['polkadot'],
				operation: ['signExtrinsic', 'signTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Raw extrinsic payload (hex)',
	},
	{
		displayName: 'Signed Extrinsic',
		name: 'signedExtrinsic',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['polkadot'],
				operation: ['broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Signed extrinsic (hex)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['polkadot'],
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
				displayName: 'Include Metadata Hash',
				name: 'includeMetadataHash',
				type: 'boolean',
				default: false,
				description: 'Whether to include metadata hash in signature',
			},
		],
	},
];
