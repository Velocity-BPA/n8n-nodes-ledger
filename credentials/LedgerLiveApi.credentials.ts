/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class LedgerLiveApi implements ICredentialType {
	name = 'ledgerLiveApi';
	displayName = 'Ledger Live API';
	documentationUrl = 'https://github.com/Velocity-BPA/n8n-nodes-ledger#credentials-setup';
	properties: INodeProperties[] = [
		{
			displayName: 'WebSocket Endpoint',
			name: 'wsEndpoint',
			type: 'string',
			default: 'ws://localhost:8435',
			description: 'Ledger Live WebSocket API endpoint',
			required: true,
		},
		{
			displayName: 'API Version',
			name: 'apiVersion',
			type: 'options',
			default: '2',
			options: [
				{
					name: 'Version 1',
					value: '1',
				},
				{
					name: 'Version 2',
					value: '2',
				},
			],
			description: 'Ledger Live API version',
		},
		{
			displayName: 'Custom Manifest',
			name: 'customManifest',
			type: 'json',
			default: '',
			description: 'Optional custom manifest for Ledger Live connection',
			typeOptions: {
				alwaysOpenEditWindow: true,
			},
		},
		{
			displayName: 'Use Secure Connection',
			name: 'secure',
			type: 'boolean',
			default: false,
			description: 'Whether to use WSS instead of WS for secure connections',
		},
		{
			displayName: 'Heartbeat Interval (Seconds)',
			name: 'heartbeatInterval',
			type: 'number',
			default: 30,
			description: 'Interval for sending heartbeat messages to keep connection alive',
		},
		{
			displayName: 'Reconnect Attempts',
			name: 'reconnectAttempts',
			type: 'number',
			default: 3,
			description: 'Number of reconnection attempts before giving up',
		},
		{
			displayName: 'Reconnect Delay (Milliseconds)',
			name: 'reconnectDelay',
			type: 'number',
			default: 1000,
			description: 'Delay between reconnection attempts in milliseconds',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.wsEndpoint}}',
			method: 'GET',
			url: '/health',
			skipSslCertificateValidation: true,
		},
	};
}
