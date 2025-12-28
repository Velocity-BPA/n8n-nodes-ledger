/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Add Account',
				value: 'addAccount',
				description: 'Add a new account',
				action: 'Add account',
			},
			{
				name: 'Export Account',
				value: 'exportAccount',
				description: 'Export account data',
				action: 'Export account',
			},
			{
				name: 'Get Account',
				value: 'getAccount',
				description: 'Get account by ID',
				action: 'Get account',
			},
			{
				name: 'Get Account Address',
				value: 'getAccountAddress',
				description: 'Get account address',
				action: 'Get account address',
			},
			{
				name: 'Get Account Balance',
				value: 'getAccountBalance',
				description: 'Get account balance',
				action: 'Get account balance',
			},
			{
				name: 'Get Account by Currency',
				value: 'getAccountByCurrency',
				description: 'Get accounts by currency',
				action: 'Get account by currency',
			},
			{
				name: 'Get Account Operations',
				value: 'getAccountOperations',
				description: 'Get account operation history',
				action: 'Get account operations',
			},
			{
				name: 'Get Account Pending Operations',
				value: 'getAccountPendingOperations',
				description: 'Get pending operations',
				action: 'Get pending operations',
			},
			{
				name: 'Get Accounts',
				value: 'getAccounts',
				description: 'Get all accounts',
				action: 'Get accounts',
			},
			{
				name: 'Get Address at Path',
				value: 'getAddressAtPath',
				description: 'Get address at derivation path',
				action: 'Get address at path',
			},
			{
				name: 'Get Extended Public Key',
				value: 'getExtendedPublicKey',
				description: 'Get xPub for account',
				action: 'Get extended public key',
			},
			{
				name: 'Get Fresh Address',
				value: 'getFreshAddress',
				description: 'Get a fresh receiving address',
				action: 'Get fresh address',
			},
			{
				name: 'Remove Account',
				value: 'removeAccount',
				description: 'Remove an account',
				action: 'Remove account',
			},
			{
				name: 'Rename Account',
				value: 'renameAccount',
				description: 'Rename an account',
				action: 'Rename account',
			},
			{
				name: 'Sync Account',
				value: 'syncAccount',
				description: 'Sync account with blockchain',
				action: 'Sync account',
			},
		],
		default: 'getAccounts',
	},
];

export const accountFields: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: [
					'getAccount',
					'getAccountBalance',
					'getAccountAddress',
					'getFreshAddress',
					'syncAccount',
					'removeAccount',
					'renameAccount',
					'getAccountOperations',
					'getAccountPendingOperations',
					'exportAccount',
					'getExtendedPublicKey',
				],
			},
		},
		default: '',
		required: true,
		description: 'Account ID',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAccountByCurrency', 'addAccount'],
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
		displayName: 'Derivation Path',
		name: 'derivationPath',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAddressAtPath'],
			},
		},
		default: "m/44'/60'/0'/0/0",
		required: true,
		description: 'BIP32 derivation path',
	},
	{
		displayName: 'New Name',
		name: 'newName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['renameAccount'],
			},
		},
		default: '',
		required: true,
		description: 'New name for the account',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				displayName: 'Account Index',
				name: 'accountIndex',
				type: 'number',
				default: 0,
				description: 'Account index for derivation',
			},
			{
				displayName: 'Include Token Accounts',
				name: 'includeTokenAccounts',
				type: 'boolean',
				default: false,
				description: 'Whether to include token accounts',
			},
			{
				displayName: 'Verify on Device',
				name: 'verifyOnDevice',
				type: 'boolean',
				default: false,
				description: 'Whether to verify address on device display',
			},
		],
	},
];
