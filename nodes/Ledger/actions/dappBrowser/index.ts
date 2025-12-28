/**
 * n8n-nodes-ledger
 * Copyright (c) 2025
 *
 * This file is licensed under the Business Source License 1.1 (BSL 1.1).
 * You may use this file in compliance with the BSL 1.1 License.
 * You may obtain a copy of the BSL 1.1 License at:
 *
 *     https://mariadb.com/bsl11/
 *
 * See the LICENSE file in the project root for the full license text.
 * See the COMMERCIAL_LICENSE.md file for commercial licensing options.
 */

import { INodeProperties } from 'n8n-workflow';

export const dappBrowserOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
			},
		},
		options: [
			{
				name: 'Connect DApp',
				value: 'connectDApp',
				description: 'Connect to a decentralized application',
				action: 'Connect to a DApp',
			},
			{
				name: 'Disconnect DApp',
				value: 'disconnectDApp',
				description: 'Disconnect from a DApp',
				action: 'Disconnect from a DApp',
			},
			{
				name: 'Get Connected DApps',
				value: 'getConnectedDApps',
				description: 'Get list of connected DApps',
				action: 'Get connected DApps',
			},
			{
				name: 'Sign Request',
				value: 'signRequest',
				description: 'Sign a DApp request with Ledger device',
				action: 'Sign a DApp request',
			},
			{
				name: 'Approve Transaction',
				value: 'approveTransaction',
				description: 'Approve a DApp transaction',
				action: 'Approve a DApp transaction',
			},
			{
				name: 'Reject Transaction',
				value: 'rejectTransaction',
				description: 'Reject a DApp transaction',
				action: 'Reject a DApp transaction',
			},
			{
				name: 'Get Pending Requests',
				value: 'getPendingRequests',
				description: 'Get pending DApp requests',
				action: 'Get pending requests',
			},
			{
				name: 'Get Session Info',
				value: 'getSessionInfo',
				description: 'Get information about a DApp session',
				action: 'Get session info',
			},
		],
		default: 'connectDApp',
	},
];

export const dappBrowserFields: INodeProperties[] = [
	// Connect DApp fields
	{
		displayName: 'Connection Protocol',
		name: 'connectionProtocol',
		type: 'options',
		options: [
			{ name: 'WalletConnect V2', value: 'walletconnect_v2' },
			{ name: 'WalletConnect V1 (Legacy)', value: 'walletconnect_v1' },
			{ name: 'Ledger Connect', value: 'ledger_connect' },
		],
		default: 'walletconnect_v2',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['connectDApp'],
			},
		},
		description: 'The connection protocol to use',
	},
	{
		displayName: 'Connection URI',
		name: 'connectionUri',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['connectDApp'],
			},
		},
		description: 'The WalletConnect URI or connection string',
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['connectDApp', 'signRequest', 'approveTransaction'],
			},
		},
		description: 'The Ledger account to use for the connection',
	},
	{
		displayName: 'Chain',
		name: 'chain',
		type: 'options',
		options: [
			{ name: 'Ethereum', value: 'ethereum' },
			{ name: 'Polygon', value: 'polygon' },
			{ name: 'Arbitrum', value: 'arbitrum' },
			{ name: 'Optimism', value: 'optimism' },
			{ name: 'BNB Chain', value: 'bsc' },
			{ name: 'Avalanche', value: 'avalanche' },
			{ name: 'Base', value: 'base' },
			{ name: 'Solana', value: 'solana' },
		],
		default: 'ethereum',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['connectDApp'],
			},
		},
		description: 'The blockchain network for the connection',
	},
	// Disconnect DApp fields
	{
		displayName: 'Session ID',
		name: 'sessionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['disconnectDApp', 'getSessionInfo'],
			},
		},
		description: 'The unique identifier of the DApp session',
	},
	// Sign Request fields
	{
		displayName: 'Request ID',
		name: 'requestId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['signRequest', 'approveTransaction', 'rejectTransaction'],
			},
		},
		description: 'The unique identifier of the DApp request',
	},
	{
		displayName: 'Derivation Path',
		name: 'derivationPath',
		type: 'string',
		required: true,
		default: "m/44'/60'/0'/0/0",
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['signRequest', 'approveTransaction'],
			},
		},
		description: 'The BIP32 derivation path for signing',
	},
	// Get Pending Requests fields
	{
		displayName: 'Filter by Session',
		name: 'filterSession',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['getPendingRequests'],
			},
		},
		description: 'Filter pending requests by session ID (optional)',
	},
	{
		displayName: 'Request Type',
		name: 'requestType',
		type: 'options',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Transaction', value: 'transaction' },
			{ name: 'Sign Message', value: 'sign_message' },
			{ name: 'Sign Typed Data', value: 'sign_typed_data' },
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['getPendingRequests'],
			},
		},
		description: 'Filter by request type',
	},
	// Get Connected DApps filters
	{
		displayName: 'Filter by Chain',
		name: 'filterChain',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dappBrowser'],
				operation: ['getConnectedDApps'],
			},
		},
		description: 'Filter connected DApps by chain (optional)',
	},
];
