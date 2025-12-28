/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const signingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['signing'],
			},
		},
		options: [
			{
				name: 'Display on Device',
				value: 'displayOnDevice',
				description: 'Display data on device for verification',
				action: 'Display on device',
			},
			{
				name: 'Get Signature',
				value: 'getSignature',
				description: 'Get signature from signed data',
				action: 'Get signature',
			},
			{
				name: 'Multi-Sign Transaction',
				value: 'multiSignTransaction',
				description: 'Sign with multiple signers',
				action: 'Multi-sign transaction',
			},
			{
				name: 'Sign Hash',
				value: 'signHash',
				description: 'Sign a hash directly',
				action: 'Sign hash',
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
				name: 'Sign PSBT',
				value: 'signPsbt',
				description: 'Sign a Partially Signed Bitcoin Transaction',
				action: 'Sign PSBT',
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
				description: 'Sign typed structured data (EIP-712)',
				action: 'Sign typed data',
			},
			{
				name: 'Verify Signature',
				value: 'verifySignature',
				description: 'Verify a signature',
				action: 'Verify signature',
			},
		],
		default: 'signMessage',
	},
];

export const signingFields: INodeProperties[] = [
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['signing'],
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
			{ name: 'Tezos (XTZ)', value: 'tezos' },
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
				resource: ['signing'],
			},
		},
		default: 0,
		description: 'Account index for signing',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['signing'],
				operation: ['signMessage', 'signPersonalMessage', 'displayOnDevice'],
			},
		},
		default: '',
		required: true,
		description: 'Message to sign',
	},
	{
		displayName: 'Hash',
		name: 'hash',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['signing'],
				operation: ['signHash'],
			},
		},
		default: '',
		required: true,
		description: 'Hash to sign (32 bytes hex)',
	},
	{
		displayName: 'Transaction Data',
		name: 'transactionData',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['signing'],
				operation: ['signTransaction', 'multiSignTransaction'],
			},
		},
		default: '',
		required: true,
		description: 'Raw transaction data',
	},
	{
		displayName: 'PSBT',
		name: 'psbt',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['signing'],
				operation: ['signPsbt'],
			},
		},
		default: '',
		required: true,
		description: 'PSBT in base64 format',
	},
	{
		displayName: 'Typed Data',
		name: 'typedData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['signing'],
				operation: ['signTypedData'],
			},
		},
		default: '{}',
		required: true,
		description: 'EIP-712 typed data object',
	},
	{
		displayName: 'Signature',
		name: 'signature',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['signing'],
				operation: ['verifySignature', 'getSignature'],
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
				resource: ['signing'],
				operation: ['verifySignature'],
			},
		},
		default: '',
		required: true,
		description: 'Address that signed the message',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['signing'],
			},
		},
		options: [
			{
				displayName: 'Display on Device',
				name: 'displayOnDevice',
				type: 'boolean',
				default: true,
				description: 'Whether to display and verify on device',
			},
		],
	},
];
