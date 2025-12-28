/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const solanaOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['solana'],
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
				name: 'Get Associated Token Account',
				value: 'getAssociatedTokenAccount',
				description: 'Get associated token account',
				action: 'Get associated token account',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get SOL balance',
				action: 'Get balance',
			},
			{
				name: 'Get Configuration',
				value: 'getConfiguration',
				description: 'Get Solana app configuration',
				action: 'Get configuration',
			},
			{
				name: 'Get NFTs',
				value: 'getNfts',
				description: 'Get NFTs for address',
				action: 'Get NFTs',
			},
			{
				name: 'Get Solana Account',
				value: 'getSolanaAccount',
				description: 'Get Solana account details',
				action: 'Get Solana account',
			},
			{
				name: 'Get Solana Address',
				value: 'getSolanaAddress',
				description: 'Get Solana address',
				action: 'Get Solana address',
			},
			{
				name: 'Get Solana Addresses',
				value: 'getSolanaAddresses',
				description: 'Get multiple addresses',
				action: 'Get Solana addresses batch',
			},
			{
				name: 'Get Token Balances',
				value: 'getTokenBalances',
				description: 'Get SPL token balances',
				action: 'Get token balances',
			},
			{
				name: 'Sign Message',
				value: 'signMessage',
				description: 'Sign a message',
				action: 'Sign message',
			},
			{
				name: 'Sign Off-Chain Message',
				value: 'signOffChainMessage',
				description: 'Sign off-chain message',
				action: 'Sign off-chain message',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
			{
				name: 'Sign Versioned Transaction',
				value: 'signVersionedTransaction',
				description: 'Sign a versioned transaction',
				action: 'Sign versioned transaction',
			},
		],
		default: 'getSolanaAddress',
	},
];

export const solanaFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['solana'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Devnet', value: 'devnet' },
			{ name: 'Testnet', value: 'testnet' },
		],
		default: 'mainnet',
		description: 'Solana network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['solana'],
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
				resource: ['solana'],
				operation: ['getSolanaAddress'],
			},
		},
		default: 0,
		description: 'Address index',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['solana'],
				operation: ['getSolanaAddresses'],
			},
		},
		default: 10,
		description: 'Number of addresses to generate',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['solana'],
				operation: ['getBalance', 'getTokenBalances', 'getNfts', 'getAssociatedTokenAccount'],
			},
		},
		default: '',
		description: 'Solana address (leave empty to use derived)',
	},
	{
		displayName: 'Token Mint',
		name: 'tokenMint',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['solana'],
				operation: ['getAssociatedTokenAccount'],
			},
		},
		default: '',
		required: true,
		description: 'SPL Token mint address',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['solana'],
				operation: ['signMessage', 'signOffChainMessage'],
			},
		},
		default: '',
		required: true,
		description: 'Message to sign',
	},
	{
		displayName: 'Transaction',
		name: 'transaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['solana'],
				operation: ['signTransaction', 'signVersionedTransaction'],
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
				resource: ['solana'],
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
				resource: ['solana'],
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
				displayName: 'Skip Preflight',
				name: 'skipPreflight',
				type: 'boolean',
				default: false,
				description: 'Whether to skip preflight checks when broadcasting',
			},
		],
	},
];
