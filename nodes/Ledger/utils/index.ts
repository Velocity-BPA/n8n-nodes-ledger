/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { DERIVATION_PATHS, SUPPORTED_CURRENCIES } from '../constants';

export function buildDerivationPath(
	currency: string,
	accountIndex: number = 0,
	addressIndex: number = 0,
	pathType: string = 'standard',
): string {
	const paths = DERIVATION_PATHS[currency as keyof typeof DERIVATION_PATHS];
	if (!paths) {
		throw new Error(`Unsupported currency: ${currency}`);
	}
	
	const basePath = paths[pathType as keyof typeof paths] || Object.values(paths)[0];
	
	// Replace account and address indices in the path
	return basePath
		.replace(/\/0'(?=\/|$)/, `/${accountIndex}'`)
		.replace(/\/0(?!['\/])/, `/${addressIndex}`);
}

export function parseDerivationPath(path: string): number[] {
	const parts = path.replace(/^m\//, '').split('/');
	return parts.map((part) => {
		const hardened = part.endsWith("'");
		const index = parseInt(hardened ? part.slice(0, -1) : part, 10);
		return hardened ? index + 0x80000000 : index;
	});
}

export function isValidDerivationPath(path: string): boolean {
	const regex = /^m(\/\d+'?)+$/;
	return regex.test(path);
}

export function getCurrencyInfo(currency: string) {
	return SUPPORTED_CURRENCIES[currency as keyof typeof SUPPORTED_CURRENCIES];
}

export function formatAmount(amount: string | number, decimals: number): string {
	const value = typeof amount === 'string' ? parseFloat(amount) : amount;
	return (value / Math.pow(10, decimals)).toFixed(decimals);
}

export function parseAmount(amount: string | number, decimals: number): bigint {
	const value = typeof amount === 'string' ? parseFloat(amount) : amount;
	return BigInt(Math.round(value * Math.pow(10, decimals)));
}

export function isValidEthereumAddress(address: string): boolean {
	return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidBitcoinAddress(address: string): boolean {
	// Basic validation for legacy, segwit, and native segwit addresses
	const legacyRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
	const segwitRegex = /^(bc1|tb1)[a-zA-HJ-NP-Z0-9]{25,90}$/;
	return legacyRegex.test(address) || segwitRegex.test(address);
}

export function isValidSolanaAddress(address: string): boolean {
	return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

export function isValidCosmosAddress(address: string, prefix: string = 'cosmos'): boolean {
	return new RegExp(`^${prefix}1[a-z0-9]{38}$`).test(address);
}

export function isValidXrpAddress(address: string): boolean {
	return /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(address);
}

export function isValidCardanoAddress(address: string): boolean {
	return /^(addr1|addr_test1)[a-z0-9]{50,100}$/.test(address);
}

export function isValidTezosAddress(address: string): boolean {
	return /^(tz1|tz2|tz3|KT1)[a-zA-Z0-9]{33}$/.test(address);
}

export function isValidAlgorandAddress(address: string): boolean {
	return /^[A-Z2-7]{58}$/.test(address);
}

export function isValidNearAddress(address: string): boolean {
	return /^[a-z0-9._-]+\.(near|testnet)$/.test(address) || /^[a-f0-9]{64}$/.test(address);
}

export function isValidStellarAddress(address: string): boolean {
	return /^G[A-Z2-7]{55}$/.test(address);
}

export function isValidPolkadotAddress(address: string): boolean {
	return /^[1-9A-HJ-NP-Za-km-z]{47,48}$/.test(address);
}

export function validateAddress(address: string, currency: string): boolean {
	switch (currency) {
		case 'bitcoin':
			return isValidBitcoinAddress(address);
		case 'ethereum':
		case 'polygon':
		case 'arbitrum':
		case 'optimism':
		case 'bsc':
		case 'avalanche':
		case 'base':
		case 'fantom':
		case 'gnosis':
		case 'zksync':
		case 'linea':
			return isValidEthereumAddress(address);
		case 'solana':
			return isValidSolanaAddress(address);
		case 'cosmos':
			return isValidCosmosAddress(address);
		case 'xrp':
			return isValidXrpAddress(address);
		case 'cardano':
			return isValidCardanoAddress(address);
		case 'tezos':
			return isValidTezosAddress(address);
		case 'algorand':
			return isValidAlgorandAddress(address);
		case 'near':
			return isValidNearAddress(address);
		case 'stellar':
			return isValidStellarAddress(address);
		case 'polkadot':
			return isValidPolkadotAddress(address);
		default:
			return true;
	}
}

export function hexToBuffer(hex: string): Buffer {
	const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
	return Buffer.from(cleanHex, 'hex');
}

export function bufferToHex(buffer: Buffer, prefix: boolean = true): string {
	const hex = buffer.toString('hex');
	return prefix ? `0x${hex}` : hex;
}

export function splitPath(path: string): number[] {
	const result: number[] = [];
	const components = path.split('/');
	for (const component of components) {
		if (component === 'm') continue;
		let value = parseInt(component, 10);
		if (component.endsWith("'")) {
			value += 0x80000000;
		}
		result.push(value);
	}
	return result;
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatHex(data: string | Buffer | Uint8Array): string {
	if (typeof data === 'string') {
		return data.startsWith('0x') ? data : `0x${data}`;
	}
	return `0x${Buffer.from(data).toString('hex')}`;
}
