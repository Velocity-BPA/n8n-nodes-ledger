/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const ethereumOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ethereum'],
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
				name: 'Clear Sign Transaction',
				value: 'clearSignTransaction',
				description: 'Sign with clear signing (human-readable)',
				action: 'Clear sign transaction',
			},
			{
				name: 'Estimate Gas',
				value: 'estimateGas',
				description: 'Estimate gas for transaction',
				action: 'Estimate gas',
			},
			{
				name: 'Get Chain ID',
				value: 'getChainId',
				description: 'Get chain ID from device',
				action: 'Get chain ID',
			},
			{
				name: 'Get Configuration',
				value: 'getConfiguration',
				description: 'Get Ethereum app configuration',
				action: 'Get configuration',
			},
			{
				name: 'Get Ethereum Account',
				value: 'getEthereumAccount',
				description: 'Get Ethereum account details',
				action: 'Get Ethereum account',
			},
			{
				name: 'Get Ethereum Address',
				value: 'getEthereumAddress',
				description: 'Get Ethereum address',
				action: 'Get Ethereum address',
			},
			{
				name: 'Get NFT Info',
				value: 'getNftInfo',
				description: 'Get NFT information',
				action: 'Get NFT info',
			},
			{
				name: 'Provide ERC20 Token Info',
				value: 'provideErc20TokenInfo',
				description: 'Provide token info for clear signing',
				action: 'Provide ERC20 token info',
			},
			{
				name: 'Sign EIP-1559 Transaction',
				value: 'signEip1559Transaction',
				description: 'Sign EIP-1559 transaction',
				action: 'Sign EIP-1559 transaction',
			},
			{
				name: 'Sign EIP-2930 Transaction',
				value: 'signEip2930Transaction',
				description: 'Sign EIP-2930 transaction',
				action: 'Sign EIP-2930 transaction',
			},
			{
				name: 'Sign Legacy Transaction',
				value: 'signLegacyTransaction',
				description: 'Sign legacy transaction',
				action: 'Sign legacy transaction',
			},
			{
				name: 'Sign Message',
				value: 'signMessage',
				description: 'Sign a message',
				action: 'Sign message',
			},
			{
				name: 'Sign Personal Message',
				value: 'signPersonalMessage',
				description: 'Sign a personal message (EIP-191)',
				action: 'Sign personal message',
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
		default: 'getEthereumAddress',
	},
];

export const ethereumFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['ethereum'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Goerli Testnet', value: 'goerli' },
			{ name: 'Sepolia Testnet', value: 'sepolia' },
		],
		default: 'mainnet',
		description: 'Ethereum network',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['ethereum'],
				operation: [
					'getEthereumAddress',
					'getEthereumAccount',
					'signTransaction',
					'signEip1559Transaction',
					'signEip2930Transaction',
					'signLegacyTransaction',
					'signMessage',
					'signPersonalMessage',
					'signTypedData',
				],
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
				resource: ['ethereum'],
				operation: ['getEthereumAddress'],
			},
		},
		default: 0,
		description: 'Address index',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['ethereum'],
				operation: ['signMessage', 'signPersonalMessage'],
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
				resource: ['ethereum'],
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
				resource: ['ethereum'],
				operation: [
					'signTransaction',
					'signEip1559Transaction',
					'signEip2930Transaction',
					'signLegacyTransaction',
					'estimateGas',
				],
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
				resource: ['ethereum'],
				operation: [
					'signTransaction',
					'signEip1559Transaction',
					'signEip2930Transaction',
					'signLegacyTransaction',
					'estimateGas',
				],
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
				resource: ['ethereum'],
				operation: [
					'signTransaction',
					'signEip1559Transaction',
					'signEip2930Transaction',
					'signLegacyTransaction',
					'estimateGas',
					'clearSignTransaction',
				],
			},
		},
		default: '0x',
		description: 'Transaction data (hex)',
	},
	{
		displayName: 'Nonce',
		name: 'nonce',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['ethereum'],
				operation: [
					'signTransaction',
					'signEip1559Transaction',
					'signEip2930Transaction',
					'signLegacyTransaction',
				],
			},
		},
		default: 0,
		description: 'Transaction nonce',
	},
	{
		displayName: 'Signed Transaction',
		name: 'signedTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['ethereum'],
				operation: ['broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Signed transaction hex',
	},
	{
		displayName: 'Token Contract Address',
		name: 'tokenContractAddress',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['ethereum'],
				operation: ['provideErc20TokenInfo'],
			},
		},
		default: '',
		required: true,
		description: 'ERC20 token contract address',
	},
	{
		displayName: 'NFT Contract Address',
		name: 'nftContractAddress',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['ethereum'],
				operation: ['getNftInfo'],
			},
		},
		default: '',
		required: true,
		description: 'NFT contract address',
	},
	{
		displayName: 'Token ID',
		name: 'tokenId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['ethereum'],
				operation: ['getNftInfo'],
			},
		},
		default: '',
		required: true,
		description: 'NFT token ID',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['ethereum'],
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
				displayName: 'Gas Price (Gwei)',
				name: 'gasPrice',
				type: 'string',
				default: '',
				description: 'Gas price in Gwei (for legacy transactions)',
			},
			{
				displayName: 'Max Fee Per Gas (Gwei)',
				name: 'maxFeePerGas',
				type: 'string',
				default: '',
				description: 'Max fee per gas in Gwei (for EIP-1559)',
			},
			{
				displayName: 'Max Priority Fee Per Gas (Gwei)',
				name: 'maxPriorityFeePerGas',
				type: 'string',
				default: '',
				description: 'Max priority fee per gas in Gwei (for EIP-1559)',
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
