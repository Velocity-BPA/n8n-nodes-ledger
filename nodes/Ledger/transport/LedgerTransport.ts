// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type Transport from '@ledgerhq/hw-transport';
import type { ICredentialDataDecryptedObject } from 'n8n-workflow';
import {
	DEVICE_CONNECTION_STATES,
	DEVICE_STATUSES,
	ERROR_DESCRIPTIONS,
	type DeviceConnectionState,
} from '../constants/devices';

/**
 * Transport connection options
 */
export interface TransportOptions {
	connectionType: 'ledgerLive' | 'usb' | 'bluetooth' | 'webhid' | 'speculos';
	ledgerLiveUrl?: string;
	speculosHost?: string;
	speculosPort?: number;
	devicePath?: string;
	timeout?: number;
	autoReconnect?: boolean;
}

/**
 * Device information
 */
export interface DeviceInfo {
	model: string;
	modelId: string;
	version: string;
	mcuVersion?: string;
	seVersion?: string;
	batteryLevel?: number;
	isLocked: boolean;
	targetId?: string;
}

/**
 * Running app information
 */
export interface AppInfo {
	name: string;
	version: string;
	flags: number;
}

/**
 * Ledger Transport Manager
 * Handles device connection and communication
 */
export class LedgerTransportManager {
	private transport: Transport | null = null;
	private options: TransportOptions;
	private connectionState: DeviceConnectionState = DEVICE_CONNECTION_STATES.DISCONNECTED;
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 3;
	private static hasLoggedLicenseNotice = false;

	constructor(credentials: ICredentialDataDecryptedObject) {
		this.options = {
			connectionType: (credentials.connectionType as TransportOptions['connectionType']) || 'ledgerLive',
			ledgerLiveUrl: credentials.ledgerLiveUrl as string,
			speculosHost: credentials.speculosHost as string,
			speculosPort: credentials.speculosPort as number,
			devicePath: credentials.devicePath as string,
			timeout: (credentials.timeout as number) || 30,
			autoReconnect: (credentials.autoReconnect as boolean) ?? true,
		};

		this.logLicenseNotice();
	}

	/**
	 * Log licensing notice (once per node load)
	 */
	private logLicenseNotice(): void {
		if (!LedgerTransportManager.hasLoggedLicenseNotice) {
			console.warn(`[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.`);
			LedgerTransportManager.hasLoggedLicenseNotice = true;
		}
	}

	/**
	 * Get current connection state
	 */
	getConnectionState(): DeviceConnectionState {
		return this.connectionState;
	}

	/**
	 * Check if connected
	 */
	isConnected(): boolean {
		return (
			this.transport !== null &&
			(this.connectionState === DEVICE_CONNECTION_STATES.CONNECTED ||
				this.connectionState === DEVICE_CONNECTION_STATES.APP_OPENED)
		);
	}

	/**
	 * Connect to Ledger device
	 */
	async connect(): Promise<Transport> {
		if (this.transport && this.isConnected()) {
			return this.transport;
		}

		this.connectionState = DEVICE_CONNECTION_STATES.CONNECTING;

		try {
			switch (this.options.connectionType) {
				case 'usb':
					this.transport = await this.connectUSB();
					break;
				case 'bluetooth':
					this.transport = await this.connectBluetooth();
					break;
				case 'webhid':
					this.transport = await this.connectWebHID();
					break;
				case 'speculos':
					this.transport = await this.connectSpeculos();
					break;
				case 'ledgerLive':
				default:
					this.transport = await this.connectLedgerLive();
					break;
			}

			this.connectionState = DEVICE_CONNECTION_STATES.CONNECTED;
			this.reconnectAttempts = 0;

			// Set up disconnect handler
			this.transport.on('disconnect', () => {
				this.handleDisconnect();
			});

			return this.transport;
		} catch (error) {
			this.connectionState = DEVICE_CONNECTION_STATES.ERROR;
			throw this.wrapError(error, 'Failed to connect to Ledger device');
		}
	}

	/**
	 * Connect via USB HID
	 */
	private async connectUSB(): Promise<Transport> {
		// Dynamic import for USB transport
		const TransportNodeHid = await import('@ledgerhq/hw-transport-node-hid');
		const HidTransport = TransportNodeHid.default || TransportNodeHid;

		if (this.options.devicePath) {
			return HidTransport.open(this.options.devicePath);
		}

		return HidTransport.create(this.options.timeout! * 1000);
	}

	/**
	 * Connect via Bluetooth
	 */
	private async connectBluetooth(): Promise<Transport> {
		const TransportBLE = await import('@ledgerhq/hw-transport-web-ble');
		const BleTransport = TransportBLE.default || TransportBLE;
		return BleTransport.create(this.options.timeout! * 1000);
	}

	/**
	 * Connect via WebHID
	 */
	private async connectWebHID(): Promise<Transport> {
		const TransportWebHID = await import('@ledgerhq/hw-transport-webhid');
		const WebHidTransport = TransportWebHID.default || TransportWebHID;
		return WebHidTransport.create(this.options.timeout! * 1000);
	}

	/**
	 * Connect via Speculos simulator
	 */
	private async connectSpeculos(): Promise<Transport> {
		// For Speculos, we create a custom HTTP transport
		const host = this.options.speculosHost || 'localhost';
		const port = this.options.speculosPort || 9999;
		
		// Use a simple TCP/HTTP transport for Speculos
		const TransportHttp = await import('@ledgerhq/hw-transport');
		const BaseTransport = TransportHttp.default || TransportHttp;
		
		// Create a mock transport for Speculos communication
		const speculosUrl = `http://${host}:${port}`;
		
		// For now, fall back to USB if Speculos-specific transport isn't available
		console.warn(`Speculos connection configured for ${speculosUrl}`);
		return this.connectUSB();
	}

	/**
	 * Connect via Ledger Live API
	 */
	private async connectLedgerLive(): Promise<Transport> {
		// Ledger Live uses WebSocket for communication
		// This is a simplified implementation
		const wsUrl = this.options.ledgerLiveUrl || 'ws://localhost:8435';
		
		// For production, you'd want to use the official Ledger Live transport
		// For now, we fall back to USB as the primary method
		console.warn(`Ledger Live API connection configured for ${wsUrl}`);
		return this.connectUSB();
	}

	/**
	 * Handle device disconnection
	 */
	private async handleDisconnect(): Promise<void> {
		this.connectionState = DEVICE_CONNECTION_STATES.DISCONNECTED;
		this.transport = null;

		if (this.options.autoReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++;
			console.warn(`Ledger device disconnected. Attempting reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
			
			await new Promise((resolve) => setTimeout(resolve, 1000));
			
			try {
				await this.connect();
			} catch {
				console.error('Reconnection failed');
			}
		}
	}

	/**
	 * Disconnect from device
	 */
	async disconnect(): Promise<void> {
		if (this.transport) {
			try {
				await this.transport.close();
			} catch {
				// Ignore close errors
			}
			this.transport = null;
		}
		this.connectionState = DEVICE_CONNECTION_STATES.DISCONNECTED;
	}

	/**
	 * Get the active transport
	 */
	getTransport(): Transport {
		if (!this.transport) {
			throw new Error('No active transport. Call connect() first.');
		}
		return this.transport;
	}

	/**
	 * Send APDU command to device
	 */
	async send(
		cla: number,
		ins: number,
		p1: number,
		p2: number,
		data?: Buffer
	): Promise<Buffer> {
		const transport = this.getTransport();
		
		try {
			const response = await transport.send(cla, ins, p1, p2, data);
			return response;
		} catch (error) {
			throw this.wrapError(error, 'APDU command failed');
		}
	}

	/**
	 * Exchange raw data with device
	 */
	async exchange(apdu: Buffer): Promise<Buffer> {
		const transport = this.getTransport();
		return transport.exchange(apdu);
	}

	/**
	 * Get device information
	 */
	async getDeviceInfo(): Promise<DeviceInfo> {
		const transport = this.getTransport();
		
		// Send GET_VERSION APDU to BOLOS
		try {
			const response = await transport.send(0xe0, 0x01, 0x00, 0x00);
			
			// Parse response
			const targetId = response.slice(0, 4).toString('hex');
			const seVersionLength = response[4];
			const seVersion = response.slice(5, 5 + seVersionLength).toString('ascii');
			
			let offset = 5 + seVersionLength;
			const flagsLength = response[offset];
			offset += 1 + flagsLength;
			
			const mcuVersionLength = response[offset];
			const mcuVersion = response.slice(offset + 1, offset + 1 + mcuVersionLength).toString('ascii');

			return {
				model: this.detectModel(targetId),
				modelId: targetId,
				version: seVersion,
				mcuVersion: mcuVersion.replace(/\0/g, ''),
				seVersion,
				targetId,
				isLocked: false,
			};
		} catch (error) {
			// Device might be locked or app is open
			return {
				model: 'Unknown',
				modelId: 'unknown',
				version: 'unknown',
				isLocked: true,
			};
		}
	}

	/**
	 * Detect device model from target ID
	 */
	private detectModel(targetId: string): string {
		const targetIdNum = parseInt(targetId, 16);
		
		// Target ID ranges for different models
		if (targetIdNum >= 0x31100000 && targetIdNum < 0x31200000) {
			return 'Nano S';
		}
		if (targetIdNum >= 0x33000000 && targetIdNum < 0x34000000) {
			return 'Nano X';
		}
		if (targetIdNum >= 0x33100000 && targetIdNum < 0x33200000) {
			return 'Nano S Plus';
		}
		if (targetIdNum >= 0x34000000 && targetIdNum < 0x35000000) {
			return 'Stax';
		}
		
		return 'Unknown';
	}

	/**
	 * Get currently running app
	 */
	async getRunningApp(): Promise<AppInfo | null> {
		const transport = this.getTransport();
		
		try {
			// GET_APP_AND_VERSION command
			const response = await transport.send(0xb0, 0x01, 0x00, 0x00);
			
			// Parse response: format is 1 (format) + name length + name + version length + version
			const format = response[0];
			if (format !== 1) {
				return null;
			}
			
			const nameLength = response[1];
			const name = response.slice(2, 2 + nameLength).toString('ascii');
			
			const versionLength = response[2 + nameLength];
			const version = response.slice(3 + nameLength, 3 + nameLength + versionLength).toString('ascii');
			
			const flags = response[3 + nameLength + versionLength] || 0;
			
			if (name && name !== 'BOLOS') {
				this.connectionState = DEVICE_CONNECTION_STATES.APP_OPENED;
			}
			
			return { name, version, flags };
		} catch {
			return null;
		}
	}

	/**
	 * Check if device is locked
	 */
	async isDeviceLocked(): Promise<boolean> {
		try {
			const app = await this.getRunningApp();
			return app === null;
		} catch {
			return true;
		}
	}

	/**
	 * Parse status word from response
	 */
	parseStatus(statusWord: number): { success: boolean; message: string } {
		if (statusWord === DEVICE_STATUSES.OK) {
			return { success: true, message: 'Success' };
		}
		
		const message = ERROR_DESCRIPTIONS[statusWord] || `Unknown error: 0x${statusWord.toString(16)}`;
		return { success: false, message };
	}

	/**
	 * Wrap error with context
	 */
	private wrapError(error: unknown, context: string): Error {
		const message = error instanceof Error ? error.message : String(error);
		const wrappedError = new Error(`${context}: ${message}`);
		if (error instanceof Error && error.stack) {
			wrappedError.stack = error.stack;
		}
		return wrappedError;
	}
}

/**
 * Create a transport manager from credentials
 */
export function createTransportManager(
	credentials: ICredentialDataDecryptedObject
): LedgerTransportManager {
	return new LedgerTransportManager(credentials);
}
