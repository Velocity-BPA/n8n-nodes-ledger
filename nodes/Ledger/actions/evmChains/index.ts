/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const evmChainsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['evmChains'],
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
				name: 'Get Address',
				value: 'getAddress',
				description: 'Get address for EVM chain',
				action: 'Get address',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get native token balance',
				action: 'Get balance',
			},
			{
				name: 'Get NFTs',
				value: 'getNfts',
				description: 'Get NFTs for address',
				action: 'Get NFTs',
			},
			{
				name: 'Get Token Balances',
				value: 'getTokenBalances',
				description: 'Get ERC20 token balances',
				action: 'Get token balances',
			},
			{
				name: 'Sign Message',
				value: 'signMessage',
				description: 'Sign a message',
				action: 'Sign message',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
			{
				name: 'Sign Typed Data',
				value: 'signTypedData',
				description: 'Sign typed data (EIP-712)',
				action: 'Sign typed data',
			},
		],
		default: 'getAddress',
	},
];

export const evmChainsFields: INodeProperties[] = [
	{
		displayName: 'Chain',
		name: 'chain',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['evmChains'],
			},
		},
		options: [
			{ name: 'Arbitrum One', value: 'arbitrum' },
			{ name: 'Avalanche C-Chain', value: 'avalanche' },
			{ name: 'Base', value: 'base' },
			{ name: 'BNB Smart Chain', value: 'bsc' },
			{ name: 'Ethereum', value: 'ethereum' },
			{ name: 'Fantom', value: 'fantom' },
			{ name: 'Gnosis Chain', value: 'gnosis' },
			{ name: 'Linea', value: 'linea' },
			{ name: 'Optimism', value: 'optimism' },
			{ name: 'Polygon', value: 'polygon' },
			{ name: 'zkSync Era', value: 'zksync' },
			{ name: 'Custom', value: 'custom' },
		],
		default: 'ethereum',
		description: 'EVM-compatible blockchain',
	},
	{
		displayName: 'Custom Chain ID',
		name: 'customChainId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['evmChains'],
				chain: ['custom'],
			},
		},
		default: 1,
		required: true,
		description: 'Custom chain ID',
	},
	{
		displayName: 'Custom RPC URL',
		name: 'customRpcUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['evmChains'],
				chain: ['custom'],
			},
		},
		default: '',
		required: true,
		description: 'Custom RPC endpoint URL',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['evmChains'],
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
				resource: ['evmChains'],
				operation: ['getAddress'],
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
				resource: ['evmChains'],
				operation: ['getBalance', 'getTokenBalances', 'getNfts'],
			},
		},
		default: '',
		description: 'Address to query (leave empty to use derived address)',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['evmChains'],
				operation: ['signMessage'],
			},
		},
		default: '',
		required: true,
		description: 'Message to sign',
	},
	{
		displayName: 'Typed Data',
		name: 'typedData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['evmChains'],
				operation: ['signTypedData'],
			},
		},
		default: '{}',
		required: true,
		description: 'EIP-712 typed data object',
	},
	{
		displayName: 'To Address',
		name: 'toAddress',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['evmChains'],
				operation: ['signTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Recipient address',
	},
	{
		displayName: 'Value (Wei)',
		name: 'value',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['evmChains'],
				operation: ['signTransaction'],
			},
		},
		default: '0',
		description: 'Value in wei',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['evmChains'],
				operation: ['signTransaction'],
			},
		},
		default: '0x',
		description: 'Transaction data (hex)',
	},
	{
		displayName: 'Signed Transaction',
		name: 'signedTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['evmChains'],
				operation: ['broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Signed transaction hex',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['evmChains'],
			},
		},
		options: [
			{
				displayName: 'Gas Limit',
				name: 'gasLimit',
				type: 'number',
				default: 21000,
				description: 'Gas limit',
			},
			{
				displayName: 'Nonce',
				name: 'nonce',
				type: 'number',
				default: 0,
				description: 'Transaction nonce (0 = auto)',
			},
			{
				displayName: 'Use EIP-1559',
				name: 'useEip1559',
				type: 'boolean',
				default: true,
				description: 'Whether to use EIP-1559 transaction type',
			},
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
