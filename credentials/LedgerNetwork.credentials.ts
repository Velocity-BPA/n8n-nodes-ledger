/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LedgerNetwork implements ICredentialType {
	name = 'ledgerNetwork';
	displayName = 'Ledger Network Configuration';
	documentationUrl = 'https://github.com/Velocity-BPA/n8n-nodes-ledger#credentials-setup';
	properties: INodeProperties[] = [
		{
			displayName: 'Blockchain',
			name: 'blockchain',
			type: 'options',
			default: 'ethereum',
			options: [
				{ name: 'Bitcoin', value: 'bitcoin' },
				{ name: 'Ethereum', value: 'ethereum' },
				{ name: 'Polygon', value: 'polygon' },
				{ name: 'Arbitrum', value: 'arbitrum' },
				{ name: 'Optimism', value: 'optimism' },
				{ name: 'BNB Chain', value: 'bsc' },
				{ name: 'Avalanche C-Chain', value: 'avalanche' },
				{ name: 'Base', value: 'base' },
				{ name: 'Fantom', value: 'fantom' },
				{ name: 'Gnosis Chain', value: 'gnosis' },
				{ name: 'zkSync Era', value: 'zksync' },
				{ name: 'Linea', value: 'linea' },
				{ name: 'Solana', value: 'solana' },
				{ name: 'Cosmos', value: 'cosmos' },
				{ name: 'Polkadot', value: 'polkadot' },
				{ name: 'XRP Ledger', value: 'xrp' },
				{ name: 'Cardano', value: 'cardano' },
				{ name: 'Tezos', value: 'tezos' },
				{ name: 'Algorand', value: 'algorand' },
				{ name: 'Near', value: 'near' },
				{ name: 'Stellar', value: 'stellar' },
				{ name: 'Custom EVM', value: 'custom' },
			],
			description: 'Select the blockchain network',
		},
		{
			displayName: 'Network',
			name: 'network',
			type: 'options',
			default: 'mainnet',
			options: [
				{ name: 'Mainnet', value: 'mainnet' },
				{ name: 'Testnet', value: 'testnet' },
				{ name: 'Devnet', value: 'devnet' },
			],
			description: 'Select the network environment',
		},
		{
			displayName: 'RPC Endpoint URL',
			name: 'rpcUrl',
			type: 'string',
			default: '',
			placeholder: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
			description: 'RPC endpoint URL for blockchain interaction',
			required: true,
		},
		{
			displayName: 'Explorer API Endpoint',
			name: 'explorerApiUrl',
			type: 'string',
			default: '',
			placeholder: 'https://api.etherscan.io/api',
			description: 'Block explorer API endpoint (optional)',
		},
		{
			displayName: 'Explorer API Key',
			name: 'explorerApiKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'API key for block explorer (optional)',
		},
		{
			displayName: 'Chain ID',
			name: 'chainId',
			type: 'number',
			default: 1,
			description: 'Chain ID for EVM networks',
			displayOptions: {
				show: {
					blockchain: [
						'ethereum',
						'polygon',
						'arbitrum',
						'optimism',
						'bsc',
						'avalanche',
						'base',
						'fantom',
						'gnosis',
						'zksync',
						'linea',
						'custom',
					],
				},
			},
		},
		{
			displayName: 'Currency Symbol',
			name: 'currencySymbol',
			type: 'string',
			default: 'ETH',
			description: 'Native currency symbol',
		},
		{
			displayName: 'Currency Decimals',
			name: 'currencyDecimals',
			type: 'number',
			default: 18,
			description: 'Native currency decimals',
		},
		{
			displayName: 'WebSocket RPC URL',
			name: 'wsRpcUrl',
			type: 'string',
			default: '',
			placeholder: 'wss://eth-mainnet.g.alchemy.com/v2/your-api-key',
			description: 'WebSocket RPC endpoint for real-time updates (optional)',
		},
		{
			displayName: 'Request Timeout (Seconds)',
			name: 'timeout',
			type: 'number',
			default: 30,
			description: 'Timeout for RPC requests in seconds',
		},
		{
			displayName: 'Max Retries',
			name: 'maxRetries',
			type: 'number',
			default: 3,
			description: 'Maximum number of retry attempts for failed requests',
		},
	];
}
