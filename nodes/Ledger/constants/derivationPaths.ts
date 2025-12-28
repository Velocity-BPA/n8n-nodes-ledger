/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * BIP-32/44/49/84 derivation path utilities
 */

export interface DerivationPathTemplate {
	id: string;
	name: string;
	description: string;
	template: string;
	purpose: number;
	coinType: number;
	example: string;
	isHardened: boolean;
}

export const DERIVATION_TEMPLATES: Record<string, DerivationPathTemplate> = {
	// Bitcoin paths
	btcLegacy: {
		id: 'btcLegacy',
		name: 'Bitcoin Legacy (BIP44)',
		description: 'Legacy P2PKH addresses starting with 1',
		template: "m/44'/0'/{{account}}'/{{change}}/{{index}}",
		purpose: 44,
		coinType: 0,
		example: "m/44'/0'/0'/0/0",
		isHardened: false,
	},
	btcSegwitCompat: {
		id: 'btcSegwitCompat',
		name: 'Bitcoin SegWit Compatible (BIP49)',
		description: 'P2SH-wrapped SegWit addresses starting with 3',
		template: "m/49'/0'/{{account}}'/{{change}}/{{index}}",
		purpose: 49,
		coinType: 0,
		example: "m/49'/0'/0'/0/0",
		isHardened: false,
	},
	btcSegwitNative: {
		id: 'btcSegwitNative',
		name: 'Bitcoin Native SegWit (BIP84)',
		description: 'Native SegWit (bech32) addresses starting with bc1q',
		template: "m/84'/0'/{{account}}'/{{change}}/{{index}}",
		purpose: 84,
		coinType: 0,
		example: "m/84'/0'/0'/0/0",
		isHardened: false,
	},
	btcTaproot: {
		id: 'btcTaproot',
		name: 'Bitcoin Taproot (BIP86)',
		description: 'Taproot addresses starting with bc1p',
		template: "m/86'/0'/{{account}}'/{{change}}/{{index}}",
		purpose: 86,
		coinType: 0,
		example: "m/86'/0'/0'/0/0",
		isHardened: false,
	},

	// Ethereum paths
	ethStandard: {
		id: 'ethStandard',
		name: 'Ethereum Standard (BIP44)',
		description: 'Standard Ethereum derivation path',
		template: "m/44'/60'/{{account}}'/0/{{index}}",
		purpose: 44,
		coinType: 60,
		example: "m/44'/60'/0'/0/0",
		isHardened: false,
	},
	ethLedgerLegacy: {
		id: 'ethLedgerLegacy',
		name: 'Ethereum Ledger Legacy',
		description: 'Legacy Ledger Live derivation path',
		template: "m/44'/60'/0'/{{index}}",
		purpose: 44,
		coinType: 60,
		example: "m/44'/60'/0'/0",
		isHardened: false,
	},
	ethLedgerLive: {
		id: 'ethLedgerLive',
		name: 'Ethereum Ledger Live',
		description: 'Ledger Live derivation path',
		template: "m/44'/60'/{{account}}'/0/0",
		purpose: 44,
		coinType: 60,
		example: "m/44'/60'/0'/0/0",
		isHardened: false,
	},

	// Solana paths
	solanaStandard: {
		id: 'solanaStandard',
		name: 'Solana Standard',
		description: 'Standard Solana derivation path',
		template: "m/44'/501'/{{account}}'/{{index}}'",
		purpose: 44,
		coinType: 501,
		example: "m/44'/501'/0'/0'",
		isHardened: true,
	},

	// Cosmos paths
	cosmosStandard: {
		id: 'cosmosStandard',
		name: 'Cosmos Standard',
		description: 'Standard Cosmos Hub derivation path',
		template: "m/44'/118'/{{account}}'/0/{{index}}",
		purpose: 44,
		coinType: 118,
		example: "m/44'/118'/0'/0/0",
		isHardened: false,
	},

	// Polkadot paths
	polkadotStandard: {
		id: 'polkadotStandard',
		name: 'Polkadot Standard',
		description: 'Standard Polkadot derivation path',
		template: "m/44'/354'/{{account}}'/0'/{{index}}'",
		purpose: 44,
		coinType: 354,
		example: "m/44'/354'/0'/0'/0'",
		isHardened: true,
	},

	// XRP paths
	xrpStandard: {
		id: 'xrpStandard',
		name: 'XRP Standard',
		description: 'Standard XRP Ledger derivation path',
		template: "m/44'/144'/{{account}}'/0/{{index}}",
		purpose: 44,
		coinType: 144,
		example: "m/44'/144'/0'/0/0",
		isHardened: false,
	},

	// Cardano paths
	cardanoShelley: {
		id: 'cardanoShelley',
		name: 'Cardano Shelley',
		description: 'Cardano Shelley era derivation path',
		template: "m/1852'/1815'/{{account}}'",
		purpose: 1852,
		coinType: 1815,
		example: "m/1852'/1815'/0'",
		isHardened: true,
	},

	// Tezos paths
	tezosStandard: {
		id: 'tezosStandard',
		name: 'Tezos Standard',
		description: 'Standard Tezos derivation path',
		template: "m/44'/1729'/{{account}}'/0'",
		purpose: 44,
		coinType: 1729,
		example: "m/44'/1729'/0'/0'",
		isHardened: true,
	},

	// Algorand paths
	algorandStandard: {
		id: 'algorandStandard',
		name: 'Algorand Standard',
		description: 'Standard Algorand derivation path',
		template: "m/44'/283'/{{account}}'/0/{{index}}",
		purpose: 44,
		coinType: 283,
		example: "m/44'/283'/0'/0/0",
		isHardened: false,
	},

	// NEAR paths
	nearStandard: {
		id: 'nearStandard',
		name: 'NEAR Standard',
		description: 'Standard NEAR Protocol derivation path',
		template: "m/44'/397'/{{account}}'",
		purpose: 44,
		coinType: 397,
		example: "m/44'/397'/0'",
		isHardened: true,
	},

	// Stellar paths
	stellarStandard: {
		id: 'stellarStandard',
		name: 'Stellar Standard',
		description: 'Standard Stellar derivation path',
		template: "m/44'/148'/{{account}}'",
		purpose: 44,
		coinType: 148,
		example: "m/44'/148'/0'",
		isHardened: true,
	},
};

export interface DerivationPathComponents {
	purpose: number;
	coinType: number;
	account: number;
	change?: number;
	index?: number;
}

/**
 * Parse a derivation path string into components
 */
export function parseDerivationPath(path: string): DerivationPathComponents | null {
	const regex = /^m\/(\d+)'?\/(\d+)'?\/(\d+)'?(?:\/(\d+)'?)?(?:\/(\d+)'?)?$/;
	const match = path.match(regex);

	if (!match) {
		return null;
	}

	return {
		purpose: parseInt(match[1] || '0', 10),
		coinType: parseInt(match[2] || '0', 10),
		account: parseInt(match[3] || '0', 10),
		change: match[4] ? parseInt(match[4], 10) : undefined,
		index: match[5] ? parseInt(match[5], 10) : undefined,
	};
}

/**
 * Build a derivation path from template and parameters
 */
export function buildDerivationPath(
	template: string,
	params: { account?: number; change?: number; index?: number }
): string {
	let path = template;
	path = path.replace('{{account}}', String(params.account ?? 0));
	path = path.replace('{{change}}', String(params.change ?? 0));
	path = path.replace('{{index}}', String(params.index ?? 0));
	return path;
}

/**
 * Validate a derivation path format
 */
export function isValidDerivationPath(path: string): boolean {
	const regex = /^m(\/\d+'?)+$/;
	return regex.test(path);
}

/**
 * Get derivation template for a currency
 */
export function getDerivationTemplateForCurrency(
	currencyId: string
): DerivationPathTemplate | undefined {
	const currencyTemplateMap: Record<string, string> = {
		bitcoin: 'btcSegwitNative',
		ethereum: 'ethStandard',
		polygon: 'ethStandard',
		arbitrum: 'ethStandard',
		optimism: 'ethStandard',
		bsc: 'ethStandard',
		avalanche: 'ethStandard',
		base: 'ethStandard',
		fantom: 'ethStandard',
		gnosis: 'ethStandard',
		zksync: 'ethStandard',
		linea: 'ethStandard',
		solana: 'solanaStandard',
		cosmos: 'cosmosStandard',
		polkadot: 'polkadotStandard',
		xrp: 'xrpStandard',
		cardano: 'cardanoShelley',
		tezos: 'tezosStandard',
		algorand: 'algorandStandard',
		near: 'nearStandard',
		stellar: 'stellarStandard',
	};

	const templateId = currencyTemplateMap[currencyId];
	return templateId ? DERIVATION_TEMPLATES[templateId] : undefined;
}
