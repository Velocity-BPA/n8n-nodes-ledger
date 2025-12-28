/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const deviceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['device'],
			},
		},
		options: [
			{
				name: 'Close App',
				value: 'closeApp',
				description: 'Close the current app on device',
				action: 'Close app on device',
			},
			{
				name: 'Connect',
				value: 'connect',
				description: 'Connect to a Ledger device',
				action: 'Connect to device',
			},
			{
				name: 'Disconnect',
				value: 'disconnect',
				description: 'Disconnect from the device',
				action: 'Disconnect from device',
			},
			{
				name: 'Get Battery Level',
				value: 'getBatteryLevel',
				description: 'Get battery level (Nano X/S Plus)',
				action: 'Get battery level',
			},
			{
				name: 'Get Device Info',
				value: 'getDeviceInfo',
				description: 'Get device information',
				action: 'Get device info',
			},
			{
				name: 'Get Device Model',
				value: 'getDeviceModel',
				description: 'Get device model',
				action: 'Get device model',
			},
			{
				name: 'Get Device State',
				value: 'getDeviceState',
				description: 'Get current device state',
				action: 'Get device state',
			},
			{
				name: 'Get Firmware Version',
				value: 'getFirmwareVersion',
				description: 'Get firmware version',
				action: 'Get firmware version',
			},
			{
				name: 'Get Installed Apps',
				value: 'getInstalledApps',
				description: 'Get list of installed apps',
				action: 'Get installed apps',
			},
			{
				name: 'Get MCU Version',
				value: 'getMcuVersion',
				description: 'Get MCU version',
				action: 'Get MCU version',
			},
			{
				name: 'Get Running App',
				value: 'getRunningApp',
				description: 'Get currently running app',
				action: 'Get running app',
			},
			{
				name: 'Install App',
				value: 'installApp',
				description: 'Install an app on device',
				action: 'Install app',
			},
			{
				name: 'Is Device Locked',
				value: 'isDeviceLocked',
				description: 'Check if device is locked',
				action: 'Check if device is locked',
			},
			{
				name: 'List Connected Devices',
				value: 'listConnectedDevices',
				description: 'List all connected Ledger devices',
				action: 'List connected devices',
			},
			{
				name: 'Open App',
				value: 'openApp',
				description: 'Open an app on device',
				action: 'Open app on device',
			},
			{
				name: 'Uninstall App',
				value: 'uninstallApp',
				description: 'Uninstall an app from device',
				action: 'Uninstall app',
			},
		],
		default: 'getDeviceInfo',
	},
];

export const deviceFields: INodeProperties[] = [
	{
		displayName: 'App Name',
		name: 'appName',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['openApp', 'installApp', 'uninstallApp'],
			},
		},
		options: [
			{ name: 'Algorand', value: 'Algorand' },
			{ name: 'Bitcoin', value: 'Bitcoin' },
			{ name: 'Bitcoin Testnet', value: 'Bitcoin Test' },
			{ name: 'Cardano ADA', value: 'Cardano ADA' },
			{ name: 'Cosmos', value: 'Cosmos' },
			{ name: 'Ethereum', value: 'Ethereum' },
			{ name: 'NEAR', value: 'NEAR' },
			{ name: 'Polkadot', value: 'Polkadot' },
			{ name: 'Solana', value: 'Solana' },
			{ name: 'Stellar', value: 'Stellar' },
			{ name: 'Tezos Wallet', value: 'Tezos Wallet' },
			{ name: 'XRP', value: 'XRP' },
		],
		default: 'Ethereum',
		description: 'App to open/install/uninstall',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['device'],
			},
		},
		options: [
			{
				displayName: 'Timeout (ms)',
				name: 'timeout',
				type: 'number',
				default: 30000,
				description: 'Operation timeout in milliseconds',
			},
			{
				displayName: 'Wait for Device',
				name: 'waitForDevice',
				type: 'boolean',
				default: true,
				description: 'Whether to wait for device connection',
			},
		],
	},
];
