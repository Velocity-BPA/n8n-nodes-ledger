/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
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
				name: 'Cancel Transaction',
				value: 'cancelTransaction',
				description: 'Cancel a pending transaction (if supported)',
				action: 'Cancel transaction',
			},
			{
				name: 'Create Transaction',
				value: 'createTransaction',
				description: 'Create a new transaction',
				action: 'Create transaction',
			},
			{
				name: 'Estimate Fees',
				value: 'estimateFees',
				description: 'Estimate transaction fees',
				action: 'Estimate fees',
			},
			{
				name: 'Get Pending Transactions',
				value: 'getPendingTransactions',
				description: 'Get pending transactions',
				action: 'Get pending transactions',
			},
			{
				name: 'Get Recommended Fees',
				value: 'getRecommendedFees',
				description: 'Get recommended fee rates',
				action: 'Get recommended fees',
			},
			{
				name: 'Get Transaction',
				value: 'getTransaction',
				description: 'Get transaction details',
				action: 'Get transaction',
			},
			{
				name: 'Get Transaction History',
				value: 'getTransactionHistory',
				description: 'Get transaction history',
				action: 'Get transaction history',
			},
			{
				name: 'Get Transaction Status',
				value: 'getTransactionStatus',
				description: 'Get transaction status',
				action: 'Get transaction status',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
			{
				name: 'Simulate Transaction',
				value: 'simulateTransaction',
				description: 'Simulate transaction execution',
				action: 'Simulate transaction',
			},
			{
				name: 'Speed Up Transaction',
				value: 'speedUpTransaction',
				description: 'Speed up a pending transaction (if supported)',
				action: 'Speed up transaction',
			},
		],
		default: 'createTransaction',
	},
];

export const transactionFields: INodeProperties[] = [
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['transaction'],
			},
		},
		options: [
			{ name: 'Bitcoin (BTC)', value: 'bitcoin' },
			{ name: 'Ethereum (ETH)', value: 'ethereum' },
			{ name: 'Solana (SOL)', value: 'solana' },
			{ name: 'Cardano (ADA)', value: 'cardano' },
			{ name: 'Polkadot (DOT)', value: 'polkadot' },
			{ name: 'Cosmos (ATOM)', value: 'cosmos' },
			{ name: 'XRP (XRP)', value: 'xrp' },
		],
		default: 'ethereum',
		description: 'Cryptocurrency',
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['createTransaction', 'getTransactionHistory', 'getPendingTransactions'],
			},
		},
		default: '',
		description: 'Account ID',
	},
	{
		displayName: 'Transaction ID',
		name: 'txId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['getTransaction', 'getTransactionStatus', 'cancelTransaction', 'speedUpTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Transaction ID or hash',
	},
	{
		displayName: 'Recipient',
		name: 'recipient',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['createTransaction', 'estimateFees', 'simulateTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Recipient address',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['createTransaction', 'estimateFees', 'simulateTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Amount to send (in base units)',
	},
	{
		displayName: 'Transaction Data',
		name: 'transactionData',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['signTransaction', 'broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Raw transaction data',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
			},
		},
		options: [
			{
				displayName: 'Fee Priority',
				name: 'feePriority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'High', value: 'high' },
				],
				default: 'medium',
				description: 'Fee priority level',
			},
			{
				displayName: 'Custom Fee',
				name: 'customFee',
				type: 'string',
				default: '',
				description: 'Custom fee amount',
			},
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Transaction memo/note',
			},
		],
	},
];
