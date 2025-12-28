/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	formatBalance,
	parseAmount,
	validateDerivationPath,
	buildDerivationPath,
	hexToBuffer,
	bufferToHex,
	validateAddress,
	truncateAddress,
} from '../../nodes/Ledger/utils';

describe('Ledger Utils', () => {
	describe('formatBalance', () => {
		it('should format balance with default decimals', () => {
			const result = formatBalance('1000000000000000000', 18);
			expect(result).toBe('1');
		});

		it('should format balance with 8 decimals', () => {
			const result = formatBalance('100000000', 8);
			expect(result).toBe('1');
		});

		it('should handle small amounts', () => {
			const result = formatBalance('1000000', 18);
			expect(result).toBe('0.000000000001');
		});

		it('should handle zero', () => {
			const result = formatBalance('0', 18);
			expect(result).toBe('0');
		});
	});

	describe('parseAmount', () => {
		it('should parse amount with 18 decimals', () => {
			const result = parseAmount('1', 18);
			expect(result).toBe('1000000000000000000');
		});

		it('should parse amount with 8 decimals', () => {
			const result = parseAmount('1', 8);
			expect(result).toBe('100000000');
		});

		it('should parse decimal amounts', () => {
			const result = parseAmount('0.5', 18);
			expect(result).toBe('500000000000000000');
		});
	});

	describe('validateDerivationPath', () => {
		it('should validate correct BIP44 path', () => {
			expect(validateDerivationPath("m/44'/60'/0'/0/0")).toBe(true);
		});

		it('should validate Bitcoin path', () => {
			expect(validateDerivationPath("m/84'/0'/0'/0/0")).toBe(true);
		});

		it('should reject invalid paths', () => {
			expect(validateDerivationPath('invalid')).toBe(false);
		});

		it('should reject empty path', () => {
			expect(validateDerivationPath('')).toBe(false);
		});
	});

	describe('buildDerivationPath', () => {
		it('should build Ethereum path', () => {
			const path = buildDerivationPath('ethereum', 0, 0);
			expect(path).toMatch(/^m\/44'\/60'\/\d+'\/0\/\d+$/);
		});

		it('should build Bitcoin native segwit path', () => {
			const path = buildDerivationPath('bitcoin', 0, 0, 'native_segwit');
			expect(path).toMatch(/^m\/84'\/0'\/\d+'\/0\/\d+$/);
		});

		it('should build Solana path', () => {
			const path = buildDerivationPath('solana', 0, 0);
			expect(path).toMatch(/^m\/44'\/501'\/\d+'(\/\d+')?$/);
		});
	});

	describe('hexToBuffer', () => {
		it('should convert hex string to buffer', () => {
			const result = hexToBuffer('deadbeef');
			expect(result).toBeInstanceOf(Buffer);
			expect(result.toString('hex')).toBe('deadbeef');
		});

		it('should handle 0x prefix', () => {
			const result = hexToBuffer('0xdeadbeef');
			expect(result.toString('hex')).toBe('deadbeef');
		});
	});

	describe('bufferToHex', () => {
		it('should convert buffer to hex string', () => {
			const buffer = Buffer.from('deadbeef', 'hex');
			const result = bufferToHex(buffer);
			expect(result).toBe('deadbeef');
		});

		it('should add 0x prefix when requested', () => {
			const buffer = Buffer.from('deadbeef', 'hex');
			const result = bufferToHex(buffer, true);
			expect(result).toBe('0xdeadbeef');
		});
	});

	describe('validateAddress', () => {
		it('should validate Ethereum address', () => {
			expect(validateAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f1DB84', 'ethereum')).toBe(true);
		});

		it('should reject invalid Ethereum address', () => {
			expect(validateAddress('invalid', 'ethereum')).toBe(false);
		});

		it('should validate Bitcoin address', () => {
			expect(validateAddress('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4', 'bitcoin')).toBe(true);
		});
	});

	describe('truncateAddress', () => {
		it('should truncate address', () => {
			const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f1DB84';
			const result = truncateAddress(address);
			expect(result).toBe('0x742d...DB84');
		});

		it('should handle custom lengths', () => {
			const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f1DB84';
			const result = truncateAddress(address, 8, 8);
			expect(result).toBe('0x742d35...95f1DB84');
		});

		it('should return full address if short', () => {
			const address = '0x1234';
			const result = truncateAddress(address);
			expect(result).toBe('0x1234');
		});
	});
});
