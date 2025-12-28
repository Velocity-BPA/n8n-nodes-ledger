// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { withTransport, getAppAndVersion, openApp, closeApp, getDeviceInfo } from '../../transport';
import { LEDGER_DEVICE_MODELS } from '../../constants';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	switch (operation) {
		case 'connect':
			return withTransport(this, async (transport) => {
				const info = await getDeviceInfo(transport);
				return { success: true, ...info };
			});

		case 'disconnect':
			return { success: true, message: 'Device disconnected' };

		case 'getDeviceInfo':
			return withTransport(this, async (transport) => {
				return getDeviceInfo(transport);
			});

		case 'getDeviceModel':
			return withTransport(this, async () => {
				return { models: Object.values(LEDGER_DEVICE_MODELS) };
			});

		case 'getFirmwareVersion':
			return withTransport(this, async (transport) => {
				const response = await transport.send(0xe0, 0x01, 0x00, 0x00);
				const version = response.slice(0, response.length - 2).toString('ascii');
				return { firmwareVersion: version };
			});

		case 'getMcuVersion':
			return withTransport(this, async (transport) => {
				try {
					const response = await transport.send(0xe0, 0x01, 0x00, 0x00);
					return { mcuVersion: response.toString('hex') };
				} catch {
					return { mcuVersion: 'Unknown' };
				}
			});

		case 'getBatteryLevel':
			return withTransport(this, async () => {
				return { 
					batteryLevel: 'N/A', 
					note: 'Battery level requires Ledger Live API for accurate reading' 
				};
			});

		case 'isDeviceLocked':
			return withTransport(this, async (transport) => {
				try {
					await getAppAndVersion(transport);
					return { locked: false };
				} catch {
					return { locked: true };
				}
			});

		case 'getDeviceState':
			return withTransport(this, async (transport) => {
				try {
					const appInfo = await getAppAndVersion(transport);
					return { 
						state: 'ready', 
						appName: appInfo.name,
						appVersion: appInfo.version 
					};
				} catch {
					return { state: 'locked_or_disconnected' };
				}
			});

		case 'listDevices':
			return withTransport(this, async () => {
				return { 
					devices: [{ id: 'connected', type: 'ledger', connected: true }],
					note: 'Full device enumeration requires native USB access' 
				};
			});

		case 'openApp': {
			const appName = this.getNodeParameter('appName', index) as string;
			if (!appName) {
				throw new NodeOperationError(this.getNode(), 'App name is required');
			}
			return withTransport(this, async (transport) => {
				await openApp(transport, appName);
				return { success: true, appName };
			});
		}

		case 'closeApp':
			return withTransport(this, async (transport) => {
				await closeApp(transport);
				return { success: true, message: 'App closed' };
			});

		case 'getRunningApp':
			return withTransport(this, async (transport) => {
				const appInfo = await getAppAndVersion(transport);
				return { appName: appInfo.name, appVersion: appInfo.version };
			});

		case 'getInstalledApps':
			return { 
				apps: [],
				note: 'Installed apps list requires Ledger Live API' 
			};

		case 'installApp': {
			const appName = this.getNodeParameter('appName', index) as string;
			return { 
				success: false, 
				appName,
				note: 'App installation requires Ledger Live API' 
			};
		}

		case 'uninstallApp': {
			const appName = this.getNodeParameter('appName', index) as string;
			return { 
				success: false, 
				appName,
				note: 'App uninstallation requires Ledger Live API' 
			};
		}

		default:
			throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
