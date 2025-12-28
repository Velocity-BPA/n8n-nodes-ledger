/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const nftOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['nft'],
			},
		},
		options: [
			{
				name: 'Get Hidden NFTs',
				value: 'getHiddenNfts',
				description: 'Get hidden NFTs',
				action: 'Get hidden NFTs',
			},
			{
				name: 'Get NFT Collection',
				value: 'getNftCollection',
				description: 'Get NFT collection details',
				action: 'Get NFT collection',
			},
			{
				name: 'Get NFT Floor Price',
				value: 'getNftFloorPrice',
				description: 'Get floor price for NFT collection',
				action: 'Get NFT floor price',
			},
			{
				name: 'Get NFT Metadata',
				value: 'getNftMetadata',
				description: 'Get NFT metadata',
				action: 'Get NFT metadata',
			},
			{
				name: 'Get NFTs',
				value: 'getNfts',
				description: 'Get all NFTs',
				action: 'Get NFTs',
			},
			{
				name: 'Get NFTs by Account',
				value: 'getNftsByAccount',
				description: 'Get NFTs owned by account',
				action: 'Get NFTs by account',
			},
			{
				name: 'Hide NFT',
				value: 'hideNft',
				description: 'Hide an NFT from display',
				action: 'Hide NFT',
			},
			{
				name: 'Sign NFT Transaction',
				value: 'signNftTransaction',
				description: 'Sign NFT transfer transaction',
				action: 'Sign NFT transaction',
			},
			{
				name: 'Unhide NFT',
				value: 'unhideNft',
				description: 'Unhide a hidden NFT',
				action: 'Unhide NFT',
			},
		],
		default: 'getNfts',
	},
];

export const nftFields: INodeProperties[] = [
	{
		displayName: 'Chain',
		name: 'chain',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['nft'],
			},
		},
		options: [
			{ name: 'Ethereum', value: 'ethereum' },
			{ name: 'Polygon', value: 'polygon' },
			{ name: 'Arbitrum', value: 'arbitrum' },
			{ name: 'Optimism', value: 'optimism' },
			{ name: 'Solana', value: 'solana' },
			{ name: 'BNB Chain', value: 'bsc' },
		],
		default: 'ethereum',
		description: 'Blockchain for NFTs',
	},
	{
		displayName: 'Account Address',
		name: 'accountAddress',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['nft'],
				operation: ['getNftsByAccount', 'getNfts', 'getHiddenNfts'],
			},
		},
		default: '',
		required: true,
		description: 'Account address',
	},
	{
		displayName: 'Contract Address',
		name: 'contractAddress',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['nft'],
				operation: ['getNftCollection', 'getNftFloorPrice', 'getNftMetadata', 'signNftTransaction'],
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
				resource: ['nft'],
				operation: ['getNftMetadata', 'signNftTransaction', 'hideNft', 'unhideNft'],
			},
		},
		default: '',
		required: true,
		description: 'NFT token ID',
	},
	{
		displayName: 'Recipient',
		name: 'recipient',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['nft'],
				operation: ['signNftTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Recipient address for NFT transfer',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['nft'],
			},
		},
		options: [
			{
				displayName: 'Include Metadata',
				name: 'includeMetadata',
				type: 'boolean',
				default: true,
				description: 'Whether to include NFT metadata',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum NFTs to return',
			},
		],
	},
];
