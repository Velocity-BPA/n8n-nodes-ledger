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

export class LedgerDevice implements ICredentialType {
	name = 'ledgerDevice';
	displayName = 'Ledger Device';
	documentationUrl = 'https://github.com/Velocity-BPA/n8n-nodes-ledger#credentials-setup';
	properties: INodeProperties[] = [
		{
			displayName: 'Connection Type',
			name: 'connectionType',
			type: 'options',
			default: 'ledgerLive',
			options: [
				{
					name: 'Ledger Live API',
					value: 'ledgerLive',
					description: 'Connect via Ledger Live desktop application',
				},
				{
					name: 'USB HID',
					value: 'usb',
					description: 'Direct USB connection to Ledger device',
				},
				{
					name: 'Bluetooth',
					value: 'bluetooth',
					description: 'Bluetooth connection (Nano X, Stax)',
				},
				{
					name: 'WebHID',
					value: 'webhid',
					description: 'WebHID transport for browser environments',
				},
				{
					name: 'Speculos Simulator',
					value: 'speculos',
					description: 'Connect to Speculos emulator for testing',
				},
			],
		},
		{
			displayName: 'Ledger Live WebSocket URL',
			name: 'ledgerLiveUrl',
			type: 'string',
			default: 'ws://localhost:8435',
			description: 'WebSocket endpoint for Ledger Live API connection',
			displayOptions: {
				show: {
					connectionType: ['ledgerLive'],
				},
			},
		},
		{
			displayName: 'Speculos Host',
			name: 'speculosHost',
			type: 'string',
			default: 'localhost',
			description: 'Hostname of the Speculos simulator',
			displayOptions: {
				show: {
					connectionType: ['speculos'],
				},
			},
		},
		{
			displayName: 'Speculos Port',
			name: 'speculosPort',
			type: 'number',
			default: 9999,
			description: 'Port of the Speculos simulator',
			displayOptions: {
				show: {
					connectionType: ['speculos'],
				},
			},
		},
		{
			displayName: 'Device Path',
			name: 'devicePath',
			type: 'string',
			default: '',
			description: 'Optional specific device path for USB connection',
			displayOptions: {
				show: {
					connectionType: ['usb'],
				},
			},
			placeholder: 'e.g., /dev/hidraw0',
		},
		{
			displayName: 'Default Account Index',
			name: 'accountIndex',
			type: 'number',
			default: 0,
			description: 'Default account index for address derivation',
		},
		{
			displayName: 'Connection Timeout (Seconds)',
			name: 'timeout',
			type: 'number',
			default: 30,
			description: 'Timeout for device connection in seconds',
		},
		{
			displayName: 'Auto Reconnect',
			name: 'autoReconnect',
			type: 'boolean',
			default: true,
			description: 'Whether to automatically reconnect if connection is lost',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.ledgerLiveUrl || "ws://localhost:8435"}}',
			method: 'GET',
			url: '/health',
			skipSslCertificateValidation: true,
		},
	};
}
