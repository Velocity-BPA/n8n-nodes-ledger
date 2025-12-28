/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const addressOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['address'],
			},
		},
		options: [
			{
				name: 'Get Address',
				value: 'getAddress',
				description: 'Get address for currency',
				action: 'Get address',
			},
			{
				name: 'Get Address at Derivation Path',
				value: 'getAddressAtDerivationPath',
				description: 'Get address at specific path',
				action: 'Get address at path',
			},
			{
				name: 'Get Address Balance',
				value: 'getAddressBalance',
				description: 'Get address balance',
				action: 'Get address balance',
			},
			{
				name: 'Get Address Info',
				value: 'getAddressInfo',
				description: 'Get address information',
				action: 'Get address info',
			},
			{
				name: 'Get All Addresses',
				value: 'getAllAddresses',
				description: 'Get all derived addresses',
				action: 'Get all addresses',
			},
			{
				name: 'Get Fresh Address',
				value: 'getFreshAddress',
				description: 'Get a fresh receiving address',
				action: 'Get fresh address',
			},
			{
				name: 'Validate Address',
				value: 'validateAddress',
				description: 'Validate an address',
				action: 'Validate address',
			},
			{
				name: 'Verify Address on Device',
				value: 'verifyAddressOnDevice',
				description: 'Display and verify address on device',
				action: 'Verify address on device',
			},
			{
				name: 'Watch Address',
				value: 'watchAddress',
				description: 'Watch an address for transactions',
				action: 'Watch address',
			},
		],
		default: 'getAddress',
	},
];

export const addressFields: INodeProperties[] = [
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['address'],
			},
		},
		options: [
			{ name: 'Algorand (ALGO)', value: 'algorand' },
			{ name: 'Bitcoin (BTC)', value: 'bitcoin' },
			{ name: 'Cardano (ADA)', value: 'cardano' },
			{ name: 'Cosmos (ATOM)', value: 'cosmos' },
			{ name: 'Ethereum (ETH)', value: 'ethereum' },
			{ name: 'NEAR (NEAR)', value: 'near' },
			{ name: 'Polkadot (DOT)', value: 'polkadot' },
			{ name: 'Solana (SOL)', value: 'solana' },
			{ name: 'Stellar (XLM)', value: 'stellar' },
			{ name: 'Tezos (XTZ)', value: 'tezos' },
			{ name: 'XRP (XRP)', value: 'xrp' },
		],
		default: 'ethereum',
		description: 'Cryptocurrency',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['address'],
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
				resource: ['address'],
				operation: ['getAddress', 'verifyAddressOnDevice'],
			},
		},
		default: 0,
		description: 'Address index',
	},
	{
		displayName: 'Derivation Path',
		name: 'derivationPath',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['address'],
				operation: ['getAddressAtDerivationPath'],
			},
		},
		default: "m/44'/60'/0'/0/0",
		required: true,
		description: 'BIP32 derivation path',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['address'],
				operation: ['validateAddress', 'getAddressBalance', 'getAddressInfo', 'watchAddress'],
			},
		},
		default: '',
		required: true,
		description: 'Address to validate or query',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['address'],
				operation: ['getAllAddresses'],
			},
		},
		default: 10,
		description: 'Number of addresses to retrieve',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['address'],
			},
		},
		options: [
			{
				displayName: 'Verify on Device',
				name: 'verifyOnDevice',
				type: 'boolean',
				default: false,
				description: 'Whether to display and verify on device',
			},
			{
				displayName: 'Include Change Addresses',
				name: 'includeChangeAddresses',
				type: 'boolean',
				default: false,
				description: 'Whether to include change addresses (Bitcoin)',
			},
			{
				displayName: 'Network',
				name: 'network',
				type: 'options',
				options: [
					{ name: 'Mainnet', value: 'mainnet' },
					{ name: 'Testnet', value: 'testnet' },
				],
				default: 'mainnet',
				description: 'Network selection',
			},
		],
	},
];
