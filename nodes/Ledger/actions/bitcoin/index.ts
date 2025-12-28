/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const bitcoinOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bitcoin'],
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
				name: 'Create Transaction',
				value: 'createTransaction',
				description: 'Create a new transaction',
				action: 'Create transaction',
			},
			{
				name: 'Derive Address',
				value: 'deriveAddress',
				description: 'Derive address from xPub',
				action: 'Derive address',
			},
			{
				name: 'Estimate Fee',
				value: 'estimateFee',
				description: 'Estimate transaction fee',
				action: 'Estimate fee',
			},
			{
				name: 'Get Bitcoin Account',
				value: 'getBitcoinAccount',
				description: 'Get Bitcoin account details',
				action: 'Get Bitcoin account',
			},
			{
				name: 'Get Bitcoin Address',
				value: 'getBitcoinAddress',
				description: 'Get Bitcoin address',
				action: 'Get Bitcoin address',
			},
			{
				name: 'Get Bitcoin Addresses',
				value: 'getBitcoinAddresses',
				description: 'Get multiple addresses',
				action: 'Get Bitcoin addresses batch',
			},
			{
				name: 'Get Change Address',
				value: 'getChangeAddress',
				description: 'Get change address',
				action: 'Get change address',
			},
			{
				name: 'Get PSBT',
				value: 'getPsbt',
				description: 'Get PSBT details',
				action: 'Get PSBT',
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
				name: 'Get Transaction Status',
				value: 'getTransactionStatus',
				description: 'Get transaction status',
				action: 'Get transaction status',
			},
			{
				name: 'Get UTXOs',
				value: 'getUtxos',
				description: 'Get unspent transaction outputs',
				action: 'Get UTXOs',
			},
			{
				name: 'Get xPub',
				value: 'getXpub',
				description: 'Get extended public key',
				action: 'Get xPub',
			},
			{
				name: 'Sign Message',
				value: 'signMessage',
				description: 'Sign a message',
				action: 'Sign message',
			},
			{
				name: 'Sign PSBT',
				value: 'signPsbt',
				description: 'Sign a PSBT',
				action: 'Sign PSBT',
			},
			{
				name: 'Sign Transaction',
				value: 'signTransaction',
				description: 'Sign a transaction',
				action: 'Sign transaction',
			},
			{
				name: 'Verify Message',
				value: 'verifyMessage',
				description: 'Verify a signed message',
				action: 'Verify message',
			},
		],
		default: 'getBitcoinAddress',
	},
];

export const bitcoinFields: INodeProperties[] = [
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
			},
		},
		options: [
			{ name: 'Mainnet', value: 'mainnet' },
			{ name: 'Testnet', value: 'testnet' },
		],
		default: 'mainnet',
		description: 'Bitcoin network',
	},
	{
		displayName: 'Address Type',
		name: 'addressType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['getBitcoinAddress', 'getBitcoinAddresses', 'getChangeAddress', 'getXpub'],
			},
		},
		options: [
			{ name: 'Native SegWit (Bech32)', value: 'bech32' },
			{ name: 'SegWit (P2SH)', value: 'p2sh' },
			{ name: 'Legacy (P2PKH)', value: 'legacy' },
			{ name: 'Taproot (P2TR)', value: 'taproot' },
		],
		default: 'bech32',
		description: 'Bitcoin address type',
	},
	{
		displayName: 'Account Index',
		name: 'accountIndex',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: [
					'getBitcoinAddress',
					'getBitcoinAddresses',
					'getChangeAddress',
					'getBitcoinAccount',
					'getXpub',
					'signMessage',
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
				resource: ['bitcoin'],
				operation: ['getBitcoinAddress'],
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
				resource: ['bitcoin'],
				operation: ['getBitcoinAddresses'],
			},
		},
		default: 10,
		description: 'Number of addresses to generate',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['signMessage', 'verifyMessage'],
			},
		},
		default: '',
		required: true,
		description: 'Message to sign or verify',
	},
	{
		displayName: 'Signature',
		name: 'signature',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['verifyMessage'],
			},
		},
		default: '',
		required: true,
		description: 'Signature to verify',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['verifyMessage', 'getUtxos'],
			},
		},
		default: '',
		description: 'Bitcoin address',
	},
	{
		displayName: 'Transaction ID',
		name: 'txId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['getTransaction', 'getTransactionStatus'],
			},
		},
		default: '',
		required: true,
		description: 'Transaction ID',
	},
	{
		displayName: 'Raw Transaction',
		name: 'rawTransaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['signTransaction', 'broadcastTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Raw transaction hex',
	},
	{
		displayName: 'PSBT',
		name: 'psbt',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['signPsbt', 'getPsbt'],
			},
		},
		default: '',
		required: true,
		description: 'PSBT in base64 format',
	},
	{
		displayName: 'Recipient Address',
		name: 'recipientAddress',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['createTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Recipient Bitcoin address',
	},
	{
		displayName: 'Amount (Satoshis)',
		name: 'amountSatoshis',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['createTransaction', 'estimateFee'],
			},
		},
		default: 0,
		required: true,
		description: 'Amount in satoshis',
	},
	{
		displayName: 'xPub',
		name: 'xpub',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bitcoin'],
				operation: ['deriveAddress'],
			},
		},
		default: '',
		required: true,
		description: 'Extended public key',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['bitcoin'],
			},
		},
		options: [
			{
				displayName: 'Fee Rate (sat/vB)',
				name: 'feeRate',
				type: 'number',
				default: 10,
				description: 'Fee rate in satoshis per virtual byte',
			},
			{
				displayName: 'Verify on Device',
				name: 'verifyOnDevice',
				type: 'boolean',
				default: true,
				description: 'Whether to verify on device display',
			},
			{
				displayName: 'RBF Enabled',
				name: 'rbfEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether to enable Replace-By-Fee',
			},
		],
	},
];
