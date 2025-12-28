// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, ILoadOptionsFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { ERROR_CODES, LICENSING_NOTICE } from '../constants';

let licensingNoticeShown = false;

export interface TransportConfig {
	connectionType: 'ledgerLive' | 'usb' | 'bluetooth' | 'webhid' | 'http' | 'speculos';
	ledgerLiveEndpoint?: string;
	httpTransportUrl?: string;
	speculosUrl?: string;
	devicePath?: string;
	timeout?: number;
	debug?: boolean;
}

export interface LedgerTransport {
	exchange: (apdu: Buffer) => Promise<Buffer>;
	close: () => Promise<void>;
	decorateAppAPIMethods: (self: unknown, methods: string[], scrambleKey: string) => void;
	send: (cla: number, ins: number, p1: number, p2: number, data?: Buffer) => Promise<Buffer>;
}

export async function getTransportConfig(
	context: IExecuteFunctions | ILoadOptionsFunctions,
): Promise<TransportConfig> {
	const credentials = await context.getCredentials('ledgerDevice');
	return {
		connectionType: credentials.connectionType as TransportConfig['connectionType'],
		ledgerLiveEndpoint: credentials.ledgerLiveEndpoint as string,
		httpTransportUrl: credentials.httpTransportUrl as string,
		speculosUrl: credentials.speculosUrl as string,
		devicePath: credentials.devicePath as string,
		timeout: (credentials.timeout as number) || 30000,
		debug: credentials.debug as boolean,
	};
}

export async function createTransport(config: TransportConfig): Promise<LedgerTransport> {
	if (!licensingNoticeShown) {
		console.warn(LICENSING_NOTICE);
		licensingNoticeShown = true;
	}

	switch (config.connectionType) {
		case 'http':
		case 'speculos': {
			const url = config.connectionType === 'speculos' ? config.speculosUrl : config.httpTransportUrl;
			const TransportHttp = (await import('@ledgerhq/hw-transport-http')).default;
			return TransportHttp.open(url || 'http://localhost:8080');
		}
		case 'usb': {
			const TransportNodeHid = (await import('@ledgerhq/hw-transport-node-hid')).default;
			if (config.devicePath) {
				return TransportNodeHid.open(config.devicePath);
			}
			return TransportNodeHid.create(config.timeout);
		}
		case 'webhid': {
			const TransportWebHID = (await import('@ledgerhq/hw-transport-webhid')).default;
			return TransportWebHID.create(config.timeout);
		}
		case 'bluetooth': {
			const TransportBLE = (await import('@ledgerhq/hw-transport-web-ble')).default;
			return TransportBLE.create(config.timeout);
		}
		case 'ledgerLive':
		default: {
			const TransportHttp = (await import('@ledgerhq/hw-transport-http')).default;
			const wsEndpoint = config.ledgerLiveEndpoint || 'ws://localhost:8435';
			const httpEndpoint = wsEndpoint.replace('ws://', 'http://').replace('wss://', 'https://');
			return TransportHttp.open(httpEndpoint);
		}
	}
}

export async function withTransport<T>(
	context: IExecuteFunctions | ILoadOptionsFunctions,
	callback: (transport: LedgerTransport) => Promise<T>,
): Promise<T> {
	const config = await getTransportConfig(context);
	let transport: LedgerTransport | undefined;
	
	try {
		transport = await createTransport(config);
		return await callback(transport);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		
		if (errorMessage.includes('No device found')) {
			throw new NodeOperationError(
				context.getNode(),
				'Ledger device not found. Please ensure your device is connected, unlocked, and the correct app is open.',
				{ description: ERROR_CODES.DEVICE_NOT_FOUND },
			);
		}
		
		if (errorMessage.includes('locked')) {
			throw new NodeOperationError(
				context.getNode(),
				'Ledger device is locked. Please unlock your device and try again.',
				{ description: ERROR_CODES.DEVICE_LOCKED },
			);
		}
		
		if (errorMessage.includes('denied') || errorMessage.includes('rejected')) {
			throw new NodeOperationError(
				context.getNode(),
				'User rejected the request on the Ledger device.',
				{ description: ERROR_CODES.USER_REJECTED },
			);
		}
		
		throw new NodeOperationError(
			context.getNode(),
			`Ledger transport error: ${errorMessage}`,
			{ description: ERROR_CODES.TRANSPORT_ERROR },
		);
	} finally {
		if (transport) {
			try {
				await transport.close();
			} catch {
				// Ignore close errors
			}
		}
	}
}

export async function openApp(transport: LedgerTransport, appName: string): Promise<void> {
	const buffer = Buffer.alloc(appName.length + 1);
	buffer.writeUInt8(appName.length, 0);
	Buffer.from(appName, 'ascii').copy(buffer, 1);
	await transport.send(0xe0, 0xd8, 0x00, 0x00, buffer);
}

export async function closeApp(transport: LedgerTransport): Promise<void> {
	await transport.send(0xb0, 0xa7, 0x00, 0x00);
}

export async function getAppAndVersion(transport: LedgerTransport): Promise<{ name: string; version: string }> {
	const response = await transport.send(0xb0, 0x01, 0x00, 0x00);
	let i = 0;
	const format = response[i++];
	if (format !== 1) {
		throw new Error('Unsupported format');
	}
	const nameLength = response[i++];
	const name = response.slice(i, i + nameLength).toString('ascii');
	i += nameLength;
	const versionLength = response[i++];
	const version = response.slice(i, i + versionLength).toString('ascii');
	return { name, version };
}

export async function getDeviceInfo(transport: LedgerTransport): Promise<IDataObject> {
	try {
		const appInfo = await getAppAndVersion(transport);
		return {
			appName: appInfo.name,
			appVersion: appInfo.version,
			connected: true,
		};
	} catch {
		return { connected: true, appName: 'Unknown', appVersion: 'Unknown' };
	}
}
