/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const cosmosOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cosmos'],
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
				description: 'Get account balance',
				action: 'Get balance',
			},
			{
				name: 'Get Cosmos Account',
				value: 'getCosmosAccount',
				description: 'Get Cosmos account details',
				action: 'Get Cosmos account',
			},
			{
				name: 'Get Cosmos Address',
				value: 'getCosmosAddress',
				description: 'Get Cosmos address',
				action: 'Get Cosmos address',
			},
			{
				name: 'Get Delegations',
				value: 'getDelegations',
				description: 'Get staking delegations',
				action: 'Get delegations',
			},
			{
				name: 'Get Public Key',
				value: 'getPublicKey',
				description: 'Get public key',
				action: 'Get public key',
			},
			{
				name: 'Get Rewards',
				value: 'getRewards',
				description: 'Get staking rewards',
				action: 'Get rewards',
			},
			{
				name: 'Get Validators',
				value: 'getValidators',
				description: 'Get list of validators',
				action: 'Get validators',
			},
			{
				name: 'Sign Amino Transaction',
				value: 'signAminoTransaction',
				description: 'Sign Amino-encoded transaction',
				action: 'Sign Amino transaction',
			},
			{
				name: 'Sign Direct Transaction',
				value: 'signDirectTransaction',
				description: 'Sign Direct (Protobuf) transaction',
				action: 'Sign Direct transaction',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
		],
		default: 'getCosmosAddress',
	},
];

export const cosmosFields: INodeProperties[] = [
	{
		displayName: 'Chain',
		name: 'chain',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['cosmos'],
			},
		},
		options: [
			{ name: 'Cosmos Hub', value: 'cosmoshub' },
			{ name: 'Osmosis', value: 'osmosis' },
			{ name: 'Akash', value: 'akash' },
			{ name: 'Juno', value: 'juno' },
			{ name: 'Stargaze', value: 'stargaze' },
			{ name: 'Kava', value: 'kava' },
			{ name: 'Secret Network', value: 'secret' },
			{ name: 'Celestia', value: 'celestia' },
			{ name: 'dYdX', value: 'dydx' },
			{ name: 'Custom', value: 'custom' },
		],
		default: 'cosmoshub',
		description: 'Cosmos-based chain',
	},
	{
		displayName: 'Custom Chain HRP',
		name: 'customHrp',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['cosmos'],
				chain: ['custom'],
			},
		},
		default: 'cosmos',
		required: true,
		description: 'Bech32 human-readable prefix',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['cosmos'],
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
				resource: ['cosmos'],
				operation: ['getCosmosAddress'],
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
				resource: ['cosmos'],
				operation: ['getBalance', 'getDelegations', 'getRewards'],
			},
		},
		default: '',
		description: 'Cosmos address (leave empty to use derived)',
	},
	{
		displayName: 'Transaction',
		name: 'transaction',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['cosmos'],
				operation: ['signTransaction', 'signAminoTransaction', 'signDirectTransaction'],
			},
		},
		default: '{}',
		required: true,
		description: 'Transaction object',
	},
	{
		displayName: 'Signed Transaction',
		name: 'signedTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['cosmos'],
				operation: ['broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Signed transaction',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['cosmos'],
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
				displayName: 'Denom',
				name: 'denom',
				type: 'string',
				default: 'uatom',
				description: 'Token denomination',
			},
		],
	},
];
