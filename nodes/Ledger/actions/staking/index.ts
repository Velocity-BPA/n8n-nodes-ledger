/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const stakingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['staking'],
			},
		},
		options: [
			{
				name: 'Claim Rewards',
				value: 'claimRewards',
				description: 'Claim staking rewards',
				action: 'Claim rewards',
			},
			{
				name: 'Get Claimable Rewards',
				value: 'getClaimableRewards',
				description: 'Get claimable staking rewards',
				action: 'Get claimable rewards',
			},
			{
				name: 'Get Staking APY',
				value: 'getStakingApy',
				description: 'Get current staking APY',
				action: 'Get staking APY',
			},
			{
				name: 'Get Staking by Currency',
				value: 'getStakingByCurrency',
				description: 'Get staking positions for a currency',
				action: 'Get staking by currency',
			},
			{
				name: 'Get Staking Info',
				value: 'getStakingInfo',
				description: 'Get staking information',
				action: 'Get staking info',
			},
			{
				name: 'Get Staking Positions',
				value: 'getStakingPositions',
				description: 'Get all staking positions',
				action: 'Get staking positions',
			},
			{
				name: 'Get Validators',
				value: 'getValidators',
				description: 'Get available validators',
				action: 'Get validators',
			},
			{
				name: 'Stake',
				value: 'stake',
				description: 'Stake tokens',
				action: 'Stake',
			},
			{
				name: 'Unstake',
				value: 'unstake',
				description: 'Unstake tokens',
				action: 'Unstake',
			},
		],
		default: 'getStakingPositions',
	},
];

export const stakingFields: INodeProperties[] = [
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['staking'],
			},
		},
		options: [
			{ name: 'Ethereum (ETH)', value: 'ethereum' },
			{ name: 'Solana (SOL)', value: 'solana' },
			{ name: 'Cardano (ADA)', value: 'cardano' },
			{ name: 'Polkadot (DOT)', value: 'polkadot' },
			{ name: 'Cosmos (ATOM)', value: 'cosmos' },
			{ name: 'Tezos (XTZ)', value: 'tezos' },
			{ name: 'Algorand (ALGO)', value: 'algorand' },
			{ name: 'Near (NEAR)', value: 'near' },
		],
		default: 'ethereum',
		description: 'Cryptocurrency for staking',
	},
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['staking'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Testnet', value: 'testnet' },
		],
		default: 'mainnet',
		description: 'Network',
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staking'],
				operation: [
					'getStakingPositions',
					'getStakingByCurrency',
					'getClaimableRewards',
					'stake',
					'unstake',
					'claimRewards',
				],
			},
		},
		default: '',
		required: true,
		description: 'Account ID or address',
	},
	{
		displayName: 'Validator Address',
		name: 'validatorAddress',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staking'],
				operation: ['stake', 'unstake', 'getStakingInfo'],
			},
		},
		default: '',
		description: 'Validator address for delegation',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['staking'],
				operation: ['stake', 'unstake'],
			},
		},
		default: '',
		required: true,
		description: 'Amount to stake/unstake',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['staking'],
			},
		},
		options: [
			{
				displayName: 'Include Pending',
				name: 'includePending',
				type: 'boolean',
				default: true,
				description: 'Whether to include pending rewards',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				description: 'Maximum validators to return',
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				options: [
					{ name: 'APY', value: 'apy' },
					{ name: 'Commission', value: 'commission' },
					{ name: 'Total Stake', value: 'totalStake' },
				],
				default: 'apy',
				description: 'Sort validators by',
			},
		],
	},
];
