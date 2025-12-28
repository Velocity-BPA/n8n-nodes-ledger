/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Ledger device model configurations
 */

export interface DeviceModel {
	id: string;
	name: string;
	productName: string;
	usbProductId: number;
	bluetoothSpec?: string[];
	memorySize: number;
	screenWidth: number;
	screenHeight: number;
	supportsUSB: boolean;
	supportsBluetooth: boolean;
	supportsNFC: boolean;
}

export const DEVICE_MODELS: Record<string, DeviceModel> = {
	nanoS: {
		id: 'nanoS',
		name: 'Nano S',
		productName: 'Ledger Nano S',
		usbProductId: 0x0001,
		memorySize: 320 * 1024,
		screenWidth: 128,
		screenHeight: 32,
		supportsUSB: true,
		supportsBluetooth: false,
		supportsNFC: false,
	},
	nanoSPlus: {
		id: 'nanoSPlus',
		name: 'Nano S Plus',
		productName: 'Ledger Nano S Plus',
		usbProductId: 0x5011,
		memorySize: 1536 * 1024,
		screenWidth: 128,
		screenHeight: 64,
		supportsUSB: true,
		supportsBluetooth: false,
		supportsNFC: false,
	},
	nanoX: {
		id: 'nanoX',
		name: 'Nano X',
		productName: 'Ledger Nano X',
		usbProductId: 0x4015,
		bluetoothSpec: ['Ledger Nano X'],
		memorySize: 2048 * 1024,
		screenWidth: 128,
		screenHeight: 64,
		supportsUSB: true,
		supportsBluetooth: true,
		supportsNFC: false,
	},
	stax: {
		id: 'stax',
		name: 'Stax',
		productName: 'Ledger Stax',
		usbProductId: 0x6011,
		bluetoothSpec: ['Ledger Stax'],
		memorySize: 4096 * 1024,
		screenWidth: 400,
		screenHeight: 670,
		supportsUSB: true,
		supportsBluetooth: true,
		supportsNFC: true,
	},
	flex: {
		id: 'flex',
		name: 'Flex',
		productName: 'Ledger Flex',
		usbProductId: 0x7011,
		bluetoothSpec: ['Ledger Flex'],
		memorySize: 4096 * 1024,
		screenWidth: 480,
		screenHeight: 600,
		supportsUSB: true,
		supportsBluetooth: true,
		supportsNFC: true,
	},
};

export const USB_VENDOR_ID = 0x2c97;

export const DEVICE_CONNECTION_STATES = {
	DISCONNECTED: 'disconnected',
	CONNECTING: 'connecting',
	CONNECTED: 'connected',
	APP_OPENED: 'app_opened',
	BUSY: 'busy',
	LOCKED: 'locked',
	ERROR: 'error',
} as const;

export type DeviceConnectionState = typeof DEVICE_CONNECTION_STATES[keyof typeof DEVICE_CONNECTION_STATES];

export const DEVICE_STATUSES = {
	OK: 0x9000,
	INCORRECT_LENGTH: 0x6700,
	MISSING_CRITICAL_PARAMETER: 0x6800,
	COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
	SECURITY_STATUS_NOT_SATISFIED: 0x6982,
	CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
	INCORRECT_DATA: 0x6a80,
	NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
	REFERENCED_DATA_NOT_FOUND: 0x6a88,
	FILE_ALREADY_EXISTS: 0x6a89,
	INCORRECT_P1_P2: 0x6b00,
	INS_NOT_SUPPORTED: 0x6d00,
	CLA_NOT_SUPPORTED: 0x6e00,
	TECHNICAL_PROBLEM: 0x6f00,
	MEMORY_PROBLEM: 0x9240,
	NO_EF_SELECTED: 0x9400,
	INVALID_OFFSET: 0x9402,
	FILE_NOT_FOUND: 0x9404,
	INCONSISTENT_FILE: 0x9408,
	ALGORITHM_NOT_SUPPORTED: 0x9484,
	INVALID_KCV: 0x9485,
	CODE_NOT_INITIALIZED: 0x9802,
	ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
	CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
	CONTRADICTION_INVALIDATION: 0x9810,
	CODE_BLOCKED: 0x9840,
	MAX_VALUE_REACHED: 0x9850,
	GP_AUTH_FAILED: 0x6300,
	LICENSING: 0x6f42,
	HALTED: 0x6faa,
	// Custom error codes for transport layer
	DEVICE_NOT_FOUND: 'DEVICE_NOT_FOUND',
	DEVICE_LOCKED: 'DEVICE_LOCKED',
	USER_REJECTED: 'USER_REJECTED',
	TRANSPORT_ERROR: 'TRANSPORT_ERROR',
} as const;

export const ERROR_DESCRIPTIONS: Record<number, string> = {
	0x6700: 'Incorrect length',
	0x6800: 'Missing critical parameter',
	0x6981: 'Command incompatible with file structure',
	0x6982: 'Security status not satisfied (device locked?)',
	0x6985: 'Conditions of use not satisfied (user rejected?)',
	0x6a80: 'Incorrect data',
	0x6a84: 'Not enough memory space',
	0x6a88: 'Referenced data not found',
	0x6a89: 'File already exists',
	0x6b00: 'Incorrect P1/P2 parameters',
	0x6d00: 'Instruction not supported',
	0x6e00: 'Class not supported',
	0x6f00: 'Technical problem',
	0x9240: 'Memory problem',
	0x9400: 'No EF selected',
	0x9402: 'Invalid offset',
	0x9404: 'File not found',
	0x9408: 'Inconsistent file',
	0x9484: 'Algorithm not supported',
	0x9485: 'Invalid KCV',
	0x9802: 'Code not initialized',
	0x9804: 'Access condition not fulfilled',
	0x9808: 'Contradiction secret code status',
	0x9810: 'Contradiction invalidation',
	0x9840: 'Code blocked',
	0x9850: 'Maximum value reached',
	0x6300: 'GP auth failed',
	0x6f42: 'Licensing error',
	0x6faa: 'Device halted',
};
