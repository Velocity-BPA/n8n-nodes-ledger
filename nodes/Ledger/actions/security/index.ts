/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const securityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['security'],
			},
		},
		options: [
			{
				name: 'Get Security Check',
				value: 'getSecurityCheck',
				description: 'Perform a comprehensive security check on the device',
				action: 'Get security check',
			},
			{
				name: 'Verify Device Genuineness',
				value: 'verifyDeviceGenuineness',
				description: 'Verify that the device is a genuine Ledger device',
				action: 'Verify device genuineness',
			},
			{
				name: 'Update Firmware',
				value: 'updateFirmware',
				description: 'Check and update device firmware',
				action: 'Update firmware',
			},
			{
				name: 'Check For Updates',
				value: 'checkForUpdates',
				description: 'Check if firmware or app updates are available',
				action: 'Check for updates',
			},
			{
				name: 'Get Security Recommendations',
				value: 'getSecurityRecommendations',
				description: 'Get security recommendations for the device',
				action: 'Get security recommendations',
			},
			{
				name: 'Reset Device',
				value: 'resetDevice',
				description: 'Reset the device to factory settings',
				action: 'Reset device',
			},
			{
				name: 'Get Recovery Phrase Status',
				value: 'getRecoveryPhraseStatus',
				description: 'Check if recovery phrase has been backed up',
				action: 'Get recovery phrase status',
			},
			{
				name: 'Set PIN',
				value: 'setPin',
				description: 'Set device PIN code',
				action: 'Set PIN',
			},
			{
				name: 'Change PIN',
				value: 'changePin',
				description: 'Change the device PIN code',
				action: 'Change PIN',
			},
		],
		default: 'getSecurityCheck',
	},
];

export const securityFields: INodeProperties[] = [
	// Get Security Check fields
	{
		displayName: 'Include App Hashes',
		name: 'includeAppHashes',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['security'],
				operation: ['getSecurityCheck'],
			},
		},
		description: 'Whether to verify hashes of installed apps',
	},
	{
		displayName: 'Include Firmware Check',
		name: 'includeFirmwareCheck',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['security'],
				operation: ['getSecurityCheck'],
			},
		},
		description: 'Whether to check firmware integrity',
	},

	// Update Firmware fields
	{
		displayName: 'Force Update',
		name: 'forceUpdate',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['security'],
				operation: ['updateFirmware'],
			},
		},
		description: 'Whether to force update even if current version is up to date',
	},
	{
		displayName: 'Target Version',
		name: 'targetVersion',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['security'],
				operation: ['updateFirmware'],
			},
		},
		description: 'Specific firmware version to update to (leave empty for latest)',
	},

	// Check For Updates fields
	{
		displayName: 'Check Firmware',
		name: 'checkFirmware',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['security'],
				operation: ['checkForUpdates'],
			},
		},
		description: 'Whether to check for firmware updates',
	},
	{
		displayName: 'Check Apps',
		name: 'checkApps',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['security'],
				operation: ['checkForUpdates'],
			},
		},
		description: 'Whether to check for app updates',
	},

	// Reset Device fields
	{
		displayName: 'Confirm Reset',
		name: 'confirmReset',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['security'],
				operation: ['resetDevice'],
			},
		},
		description: 'Whether to confirm device reset (WARNING: This will erase all data)',
	},

	// Set PIN fields
	{
		displayName: 'PIN Length',
		name: 'pinLength',
		type: 'options',
		options: [
			{ name: '4 Digits', value: 4 },
			{ name: '6 Digits', value: 6 },
			{ name: '8 Digits', value: 8 },
		],
		default: 4,
		displayOptions: {
			show: {
				resource: ['security'],
				operation: ['setPin', 'changePin'],
			},
		},
		description: 'Length of the PIN code',
	},
];
