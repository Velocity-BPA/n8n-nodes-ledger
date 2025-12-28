/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Ledger application configurations
 */

export interface LedgerApp {
	name: string;
	appId: string;
	currency: string;
	currencyFamily: string;
	minVersion: string;
	supportsBlindSigning: boolean;
	supportsClearSigning: boolean;
	supportsEIP712?: boolean;
	icon?: string;
}

export const LEDGER_APPS: Record<string, LedgerApp> = {
	bitcoin: {
		name: 'Bitcoin',
		appId: 'bitcoin',
		currency: 'bitcoin',
		currencyFamily: 'bitcoin',
		minVersion: '2.0.0',
		supportsBlindSigning: false,
		supportsClearSigning: true,
	},
	bitcoinTestnet: {
		name: 'Bitcoin Test',
		appId: 'bitcoin_testnet',
		currency: 'bitcoin',
		currencyFamily: 'bitcoin',
		minVersion: '2.0.0',
		supportsBlindSigning: false,
		supportsClearSigning: true,
	},
	ethereum: {
		name: 'Ethereum',
		appId: 'ethereum',
		currency: 'ethereum',
		currencyFamily: 'ethereum',
		minVersion: '1.10.0',
		supportsBlindSigning: true,
		supportsClearSigning: true,
		supportsEIP712: true,
	},
	solana: {
		name: 'Solana',
		appId: 'solana',
		currency: 'solana',
		currencyFamily: 'solana',
		minVersion: '1.3.0',
		supportsBlindSigning: true,
		supportsClearSigning: false,
	},
	cosmos: {
		name: 'Cosmos',
		appId: 'cosmos',
		currency: 'cosmos',
		currencyFamily: 'cosmos',
		minVersion: '2.34.0',
		supportsBlindSigning: true,
		supportsClearSigning: true,
	},
	polkadot: {
		name: 'Polkadot',
		appId: 'polkadot',
		currency: 'polkadot',
		currencyFamily: 'polkadot',
		minVersion: '90.9430.0',
		supportsBlindSigning: true,
		supportsClearSigning: false,
	},
	xrp: {
		name: 'XRP',
		appId: 'xrp',
		currency: 'xrp',
		currencyFamily: 'ripple',
		minVersion: '2.0.0',
		supportsBlindSigning: false,
		supportsClearSigning: true,
	},
	cardano: {
		name: 'Cardano ADA',
		appId: 'cardano_ada',
		currency: 'cardano',
		currencyFamily: 'cardano',
		minVersion: '6.0.0',
		supportsBlindSigning: false,
		supportsClearSigning: true,
	},
	tezos: {
		name: 'Tezos Wallet',
		appId: 'tezos_wallet',
		currency: 'tezos',
		currencyFamily: 'tezos',
		minVersion: '2.4.0',
		supportsBlindSigning: true,
		supportsClearSigning: true,
	},
	algorand: {
		name: 'Algorand',
		appId: 'algorand',
		currency: 'algorand',
		currencyFamily: 'algorand',
		minVersion: '1.2.15',
		supportsBlindSigning: false,
		supportsClearSigning: true,
	},
	near: {
		name: 'NEAR',
		appId: 'near',
		currency: 'near',
		currencyFamily: 'near',
		minVersion: '1.0.0',
		supportsBlindSigning: true,
		supportsClearSigning: false,
	},
	stellar: {
		name: 'Stellar',
		appId: 'stellar',
		currency: 'stellar',
		currencyFamily: 'stellar',
		minVersion: '4.0.0',
		supportsBlindSigning: false,
		supportsClearSigning: true,
	},
	bolos: {
		name: 'BOLOS',
		appId: 'bolos',
		currency: '',
		currencyFamily: 'system',
		minVersion: '1.0.0',
		supportsBlindSigning: false,
		supportsClearSigning: false,
	},
};

export const APP_INSTRUCTIONS = {
	// Common instructions
	GET_VERSION: 0x01,
	GET_APP_NAME: 0x02,

	// Bitcoin specific
	BTC_GET_WALLET_PUBLIC_KEY: 0x40,
	BTC_GET_TRUSTED_INPUT: 0x42,
	BTC_UNTRUSTED_HASH_TRANSACTION_INPUT_START: 0x44,
	BTC_UNTRUSTED_HASH_SIGN: 0x48,
	BTC_UNTRUSTED_HASH_TRANSACTION_INPUT_FINALIZE_FULL: 0x4a,
	BTC_SIGN_MESSAGE: 0x4e,
	BTC_GET_WALLET_XPUB: 0xe0,

	// Ethereum specific
	ETH_GET_ADDRESS: 0x02,
	ETH_SIGN_TX: 0x04,
	ETH_SIGN_MESSAGE: 0x08,
	ETH_SIGN_EIP712: 0x0c,
	ETH_GET_CONFIG: 0x06,
	ETH_PROVIDE_ERC20_INFO: 0x0a,
	ETH_PROVIDE_NFT_INFO: 0x14,

	// Solana specific
	SOL_GET_ADDRESS: 0x02,
	SOL_SIGN_TX: 0x04,
	SOL_SIGN_MESSAGE: 0x06,

	// Cosmos specific
	COSMOS_GET_ADDRESS: 0x02,
	COSMOS_SIGN_TX: 0x04,

	// General
	SIGN_TX: 0x04,
	GET_ADDRESS: 0x02,
} as const;

export const APP_CLA = {
	BITCOIN: 0xe1,
	ETHEREUM: 0xe0,
	SOLANA: 0xe0,
	COSMOS: 0x55,
	POLKADOT: 0x90,
	XRP: 0xe0,
	CARDANO: 0xd7,
	TEZOS: 0x80,
	ALGORAND: 0x80,
	NEAR: 0x80,
	STELLAR: 0xe0,
	BOLOS: 0xe0,
} as const;

export function getAppForCurrency(currencyId: string): LedgerApp | undefined {
	return Object.values(LEDGER_APPS).find((app) => app.currency === currencyId);
}

export function getAppByName(appName: string): LedgerApp | undefined {
	return Object.values(LEDGER_APPS).find(
		(app) => app.name.toLowerCase() === appName.toLowerCase()
	);
}
