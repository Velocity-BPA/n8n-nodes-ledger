/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Supported cryptocurrency configurations
 */

export interface CurrencyConfig {
	id: string;
	name: string;
	ticker: string;
	family: string;
	decimals: number;
	appName: string;
	derivationPath: string;
	coinType: number;
	isEVM: boolean;
	chainId?: number;
	explorerUrl?: string;
	rpcUrl?: string;
	testnetConfig?: {
		name: string;
		chainId?: number;
		explorerUrl?: string;
		rpcUrl?: string;
	};
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
	bitcoin: {
		id: 'bitcoin',
		name: 'Bitcoin',
		ticker: 'BTC',
		family: 'bitcoin',
		decimals: 8,
		appName: 'Bitcoin',
		derivationPath: "m/84'/0'/0'",
		coinType: 0,
		isEVM: false,
		explorerUrl: 'https://blockstream.info',
		testnetConfig: {
			name: 'Bitcoin Testnet',
			explorerUrl: 'https://blockstream.info/testnet',
		},
	},
	ethereum: {
		id: 'ethereum',
		name: 'Ethereum',
		ticker: 'ETH',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 1,
		explorerUrl: 'https://etherscan.io',
		rpcUrl: 'https://eth.llamarpc.com',
		testnetConfig: {
			name: 'Sepolia Testnet',
			chainId: 11155111,
			explorerUrl: 'https://sepolia.etherscan.io',
			rpcUrl: 'https://rpc.sepolia.org',
		},
	},
	polygon: {
		id: 'polygon',
		name: 'Polygon',
		ticker: 'MATIC',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 137,
		explorerUrl: 'https://polygonscan.com',
		rpcUrl: 'https://polygon-rpc.com',
		testnetConfig: {
			name: 'Mumbai Testnet',
			chainId: 80001,
			explorerUrl: 'https://mumbai.polygonscan.com',
			rpcUrl: 'https://rpc-mumbai.maticvigil.com',
		},
	},
	arbitrum: {
		id: 'arbitrum',
		name: 'Arbitrum One',
		ticker: 'ETH',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 42161,
		explorerUrl: 'https://arbiscan.io',
		rpcUrl: 'https://arb1.arbitrum.io/rpc',
		testnetConfig: {
			name: 'Arbitrum Sepolia',
			chainId: 421614,
			explorerUrl: 'https://sepolia.arbiscan.io',
			rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
		},
	},
	optimism: {
		id: 'optimism',
		name: 'Optimism',
		ticker: 'ETH',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 10,
		explorerUrl: 'https://optimistic.etherscan.io',
		rpcUrl: 'https://mainnet.optimism.io',
		testnetConfig: {
			name: 'Optimism Sepolia',
			chainId: 11155420,
			explorerUrl: 'https://sepolia-optimism.etherscan.io',
			rpcUrl: 'https://sepolia.optimism.io',
		},
	},
	bsc: {
		id: 'bsc',
		name: 'BNB Chain',
		ticker: 'BNB',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 56,
		explorerUrl: 'https://bscscan.com',
		rpcUrl: 'https://bsc-dataseed.binance.org',
		testnetConfig: {
			name: 'BSC Testnet',
			chainId: 97,
			explorerUrl: 'https://testnet.bscscan.com',
			rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
		},
	},
	avalanche: {
		id: 'avalanche',
		name: 'Avalanche C-Chain',
		ticker: 'AVAX',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 43114,
		explorerUrl: 'https://snowtrace.io',
		rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
		testnetConfig: {
			name: 'Fuji Testnet',
			chainId: 43113,
			explorerUrl: 'https://testnet.snowtrace.io',
			rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
		},
	},
	base: {
		id: 'base',
		name: 'Base',
		ticker: 'ETH',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 8453,
		explorerUrl: 'https://basescan.org',
		rpcUrl: 'https://mainnet.base.org',
		testnetConfig: {
			name: 'Base Sepolia',
			chainId: 84532,
			explorerUrl: 'https://sepolia.basescan.org',
			rpcUrl: 'https://sepolia.base.org',
		},
	},
	fantom: {
		id: 'fantom',
		name: 'Fantom',
		ticker: 'FTM',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 250,
		explorerUrl: 'https://ftmscan.com',
		rpcUrl: 'https://rpc.ftm.tools',
	},
	gnosis: {
		id: 'gnosis',
		name: 'Gnosis Chain',
		ticker: 'xDAI',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 100,
		explorerUrl: 'https://gnosisscan.io',
		rpcUrl: 'https://rpc.gnosischain.com',
	},
	zksync: {
		id: 'zksync',
		name: 'zkSync Era',
		ticker: 'ETH',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 324,
		explorerUrl: 'https://explorer.zksync.io',
		rpcUrl: 'https://mainnet.era.zksync.io',
		testnetConfig: {
			name: 'zkSync Sepolia',
			chainId: 300,
			explorerUrl: 'https://sepolia.explorer.zksync.io',
			rpcUrl: 'https://sepolia.era.zksync.dev',
		},
	},
	linea: {
		id: 'linea',
		name: 'Linea',
		ticker: 'ETH',
		family: 'ethereum',
		decimals: 18,
		appName: 'Ethereum',
		derivationPath: "m/44'/60'/0'/0",
		coinType: 60,
		isEVM: true,
		chainId: 59144,
		explorerUrl: 'https://lineascan.build',
		rpcUrl: 'https://rpc.linea.build',
	},
	solana: {
		id: 'solana',
		name: 'Solana',
		ticker: 'SOL',
		family: 'solana',
		decimals: 9,
		appName: 'Solana',
		derivationPath: "m/44'/501'/0'/0'",
		coinType: 501,
		isEVM: false,
		explorerUrl: 'https://explorer.solana.com',
		rpcUrl: 'https://api.mainnet-beta.solana.com',
		testnetConfig: {
			name: 'Solana Devnet',
			explorerUrl: 'https://explorer.solana.com?cluster=devnet',
			rpcUrl: 'https://api.devnet.solana.com',
		},
	},
	cosmos: {
		id: 'cosmos',
		name: 'Cosmos Hub',
		ticker: 'ATOM',
		family: 'cosmos',
		decimals: 6,
		appName: 'Cosmos',
		derivationPath: "m/44'/118'/0'/0/0",
		coinType: 118,
		isEVM: false,
		explorerUrl: 'https://www.mintscan.io/cosmos',
		rpcUrl: 'https://cosmos-rpc.polkachu.com',
	},
	polkadot: {
		id: 'polkadot',
		name: 'Polkadot',
		ticker: 'DOT',
		family: 'polkadot',
		decimals: 10,
		appName: 'Polkadot',
		derivationPath: "m/44'/354'/0'/0'/0'",
		coinType: 354,
		isEVM: false,
		explorerUrl: 'https://polkadot.subscan.io',
	},
	xrp: {
		id: 'xrp',
		name: 'XRP Ledger',
		ticker: 'XRP',
		family: 'ripple',
		decimals: 6,
		appName: 'XRP',
		derivationPath: "m/44'/144'/0'/0/0",
		coinType: 144,
		isEVM: false,
		explorerUrl: 'https://xrpscan.com',
	},
	cardano: {
		id: 'cardano',
		name: 'Cardano',
		ticker: 'ADA',
		family: 'cardano',
		decimals: 6,
		appName: 'Cardano ADA',
		derivationPath: "m/1852'/1815'/0'",
		coinType: 1815,
		isEVM: false,
		explorerUrl: 'https://cardanoscan.io',
	},
	tezos: {
		id: 'tezos',
		name: 'Tezos',
		ticker: 'XTZ',
		family: 'tezos',
		decimals: 6,
		appName: 'Tezos Wallet',
		derivationPath: "m/44'/1729'/0'/0'",
		coinType: 1729,
		isEVM: false,
		explorerUrl: 'https://tzstats.com',
	},
	algorand: {
		id: 'algorand',
		name: 'Algorand',
		ticker: 'ALGO',
		family: 'algorand',
		decimals: 6,
		appName: 'Algorand',
		derivationPath: "m/44'/283'/0'/0/0",
		coinType: 283,
		isEVM: false,
		explorerUrl: 'https://algoexplorer.io',
	},
	near: {
		id: 'near',
		name: 'NEAR Protocol',
		ticker: 'NEAR',
		family: 'near',
		decimals: 24,
		appName: 'NEAR',
		derivationPath: "m/44'/397'/0'",
		coinType: 397,
		isEVM: false,
		explorerUrl: 'https://explorer.near.org',
	},
	stellar: {
		id: 'stellar',
		name: 'Stellar',
		ticker: 'XLM',
		family: 'stellar',
		decimals: 7,
		appName: 'Stellar',
		derivationPath: "m/44'/148'/0'",
		coinType: 148,
		isEVM: false,
		explorerUrl: 'https://stellar.expert',
	},
};

export const CURRENCY_FAMILIES = [
	'bitcoin',
	'ethereum',
	'solana',
	'cosmos',
	'polkadot',
	'ripple',
	'cardano',
	'tezos',
	'algorand',
	'near',
	'stellar',
] as const;

export type CurrencyFamily = typeof CURRENCY_FAMILIES[number];

export const EVM_CURRENCIES = Object.values(CURRENCIES).filter((c) => c.isEVM);

export const NON_EVM_CURRENCIES = Object.values(CURRENCIES).filter((c) => !c.isEVM);

export function getCurrencyById(id: string): CurrencyConfig | undefined {
	return CURRENCIES[id];
}

export function getCurrencyByTicker(ticker: string): CurrencyConfig | undefined {
	return Object.values(CURRENCIES).find(
		(c) => c.ticker.toLowerCase() === ticker.toLowerCase()
	);
}

export function getCurrenciesByFamily(family: CurrencyFamily): CurrencyConfig[] {
	return Object.values(CURRENCIES).filter((c) => c.family === family);
}
