// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { LICENSING_NOTICE } from './constants';

export class Ledger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ledger',
		name: 'ledger',
		icon: 'file:ledger.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Ledger hardware wallets for multi-chain cryptocurrency management',
		defaults: { name: 'Ledger' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{ name: 'ledgerDevice', required: true },
			{ name: 'ledgerNetwork', required: false },
			{ name: 'ledgerLiveApi', required: false },
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Address', value: 'address' },
					{ name: 'Algorand', value: 'algorand' },
					{ name: 'Bitcoin', value: 'bitcoin' },
					{ name: 'Buy/Sell', value: 'buySell' },
					{ name: 'Cardano', value: 'cardano' },
					{ name: 'Cosmos', value: 'cosmos' },
					{ name: 'DApp Browser', value: 'dappBrowser' },
					{ name: 'Device', value: 'device' },
					{ name: 'Ethereum', value: 'ethereum' },
					{ name: 'EVM Chains', value: 'evmChains' },
					{ name: 'Ledger Live', value: 'ledgerLive' },
					{ name: 'Multi-Currency', value: 'multiCurrency' },
					{ name: 'Near', value: 'near' },
					{ name: 'NFT', value: 'nft' },
					{ name: 'Polkadot', value: 'polkadot' },
					{ name: 'Security', value: 'security' },
					{ name: 'Signing', value: 'signing' },
					{ name: 'Solana', value: 'solana' },
					{ name: 'Staking', value: 'staking' },
					{ name: 'Stellar', value: 'stellar' },
					{ name: 'Swap', value: 'swap' },
					{ name: 'Tezos', value: 'tezos' },
					{ name: 'Transaction', value: 'transaction' },
					{ name: 'Utility', value: 'utility' },
					{ name: 'XRP', value: 'xrp' },
				],
				default: 'device',
			},
			// Device operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['device'] } },
				options: [
					{ name: 'Close App', value: 'closeApp', action: 'Close app on device' },
					{ name: 'Connect', value: 'connect', action: 'Connect to device' },
					{ name: 'Disconnect', value: 'disconnect', action: 'Disconnect device' },
					{ name: 'Get Battery Level', value: 'getBatteryLevel', action: 'Get battery level' },
					{ name: 'Get Device Info', value: 'getDeviceInfo', action: 'Get device info' },
					{ name: 'Get Device Model', value: 'getDeviceModel', action: 'Get device model' },
					{ name: 'Get Device State', value: 'getDeviceState', action: 'Get device state' },
					{ name: 'Get Firmware Version', value: 'getFirmwareVersion', action: 'Get firmware version' },
					{ name: 'Get Installed Apps', value: 'getInstalledApps', action: 'Get installed apps' },
					{ name: 'Get MCU Version', value: 'getMcuVersion', action: 'Get MCU version' },
					{ name: 'Get Running App', value: 'getRunningApp', action: 'Get running app' },
					{ name: 'Install App', value: 'installApp', action: 'Install app on device' },
					{ name: 'Is Device Locked', value: 'isDeviceLocked', action: 'Check if device is locked' },
					{ name: 'List Devices', value: 'listDevices', action: 'List connected devices' },
					{ name: 'Open App', value: 'openApp', action: 'Open app on device' },
					{ name: 'Uninstall App', value: 'uninstallApp', action: 'Uninstall app from device' },
				],
				default: 'getDeviceInfo',
			},
			// Account operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['account'] } },
				options: [
					{ name: 'Add Account', value: 'addAccount', action: 'Add account' },
					{ name: 'Export Account', value: 'exportAccount', action: 'Export account' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get account' },
					{ name: 'Get Account Address', value: 'getAccountAddress', action: 'Get account address' },
					{ name: 'Get Account Balance', value: 'getAccountBalance', action: 'Get account balance' },
					{ name: 'Get Account by Currency', value: 'getAccountByCurrency', action: 'Get account by currency' },
					{ name: 'Get Account Operations', value: 'getAccountOperations', action: 'Get account operations' },
					{ name: 'Get Account Pending Operations', value: 'getAccountPendingOperations', action: 'Get pending operations' },
					{ name: 'Get Accounts', value: 'getAccounts', action: 'Get accounts' },
					{ name: 'Get Extended Public Key', value: 'getExtendedPublicKey', action: 'Get extended public key' },
					{ name: 'Get Fresh Address', value: 'getFreshAddress', action: 'Get fresh address' },
					{ name: 'Remove Account', value: 'removeAccount', action: 'Remove account' },
					{ name: 'Rename Account', value: 'renameAccount', action: 'Rename account' },
					{ name: 'Sync Account', value: 'syncAccount', action: 'Sync account' },
				],
				default: 'getAccounts',
			},
			// Bitcoin operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['bitcoin'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Create Transaction', value: 'createTransaction', action: 'Create transaction' },
					{ name: 'Derive Address', value: 'deriveAddress', action: 'Derive address' },
					{ name: 'Estimate Fee', value: 'estimateFee', action: 'Estimate fee' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Bitcoin account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Bitcoin address' },
					{ name: 'Get Addresses', value: 'getAddresses', action: 'Get Bitcoin addresses' },
					{ name: 'Get Change Address', value: 'getChangeAddress', action: 'Get change address' },
					{ name: 'Get PSBT', value: 'getPsbt', action: 'Get PSBT' },
					{ name: 'Get Recommended Fees', value: 'getRecommendedFees', action: 'Get recommended fees' },
					{ name: 'Get Transaction', value: 'getTransaction', action: 'Get transaction' },
					{ name: 'Get Transaction Status', value: 'getTransactionStatus', action: 'Get transaction status' },
					{ name: 'Get UTXOs', value: 'getUtxos', action: 'Get UTXOs' },
					{ name: 'Get xPub', value: 'getXpub', action: 'Get extended public key' },
					{ name: 'Sign Message', value: 'signMessage', action: 'Sign message' },
					{ name: 'Sign PSBT', value: 'signPsbt', action: 'Sign PSBT' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
					{ name: 'Verify Message', value: 'verifyMessage', action: 'Verify message' },
				],
				default: 'getAddress',
			},
			// Ethereum operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['ethereum'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Clear Sign Transaction', value: 'clearSignTransaction', action: 'Clear sign transaction' },
					{ name: 'Estimate Gas', value: 'estimateGas', action: 'Estimate gas' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Ethereum account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Ethereum address' },
					{ name: 'Get Chain ID', value: 'getChainId', action: 'Get chain ID' },
					{ name: 'Get Configuration', value: 'getConfiguration', action: 'Get configuration' },
					{ name: 'Get NFT Info', value: 'getNftInfo', action: 'Get NFT info' },
					{ name: 'Provide ERC20 Token Info', value: 'provideErc20TokenInfo', action: 'Provide ERC20 token info' },
					{ name: 'Sign EIP-1559 Transaction', value: 'signEip1559Transaction', action: 'Sign EIP-1559 transaction' },
					{ name: 'Sign EIP-2930 Transaction', value: 'signEip2930Transaction', action: 'Sign EIP-2930 transaction' },
					{ name: 'Sign Legacy Transaction', value: 'signLegacyTransaction', action: 'Sign legacy transaction' },
					{ name: 'Sign Message', value: 'signMessage', action: 'Sign message' },
					{ name: 'Sign Personal Message', value: 'signPersonalMessage', action: 'Sign personal message' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
					{ name: 'Sign Typed Data', value: 'signTypedData', action: 'Sign typed data EIP-712' },
				],
				default: 'getAddress',
			},
			// EVM Chains operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['evmChains'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get NFTs', value: 'getNfts', action: 'Get NFTs' },
					{ name: 'Get Token Balances', value: 'getTokenBalances', action: 'Get token balances' },
					{ name: 'Sign Message', value: 'signMessage', action: 'Sign message' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
					{ name: 'Sign Typed Data', value: 'signTypedData', action: 'Sign typed data' },
				],
				default: 'getAddress',
			},
			// Solana operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['solana'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Solana account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Solana address' },
					{ name: 'Get Addresses', value: 'getAddresses', action: 'Get Solana addresses' },
					{ name: 'Get Associated Token Account', value: 'getAssociatedTokenAccount', action: 'Get associated token account' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Configuration', value: 'getConfiguration', action: 'Get configuration' },
					{ name: 'Get NFTs', value: 'getNfts', action: 'Get NFTs' },
					{ name: 'Get Token Balances', value: 'getTokenBalances', action: 'Get token balances' },
					{ name: 'Sign Message', value: 'signMessage', action: 'Sign message' },
					{ name: 'Sign Off-Chain Message', value: 'signOffChainMessage', action: 'Sign off-chain message' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
					{ name: 'Sign Versioned Transaction', value: 'signVersionedTransaction', action: 'Sign versioned transaction' },
				],
				default: 'getAddress',
			},
			// Cosmos operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cosmos'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Cosmos account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Cosmos address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Delegations', value: 'getDelegations', action: 'Get delegations' },
					{ name: 'Get Public Key', value: 'getPublicKey', action: 'Get public key' },
					{ name: 'Get Rewards', value: 'getRewards', action: 'Get rewards' },
					{ name: 'Get Validators', value: 'getValidators', action: 'Get validators' },
					{ name: 'Sign Amino Transaction', value: 'signAminoTransaction', action: 'Sign Amino transaction' },
					{ name: 'Sign Direct Transaction', value: 'signDirectTransaction', action: 'Sign Direct transaction' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
				],
				default: 'getAddress',
			},
			// Polkadot operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['polkadot'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Polkadot account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Polkadot address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Metadata', value: 'getMetadata', action: 'Get metadata' },
					{ name: 'Sign Extrinsic', value: 'signExtrinsic', action: 'Sign extrinsic' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
				],
				default: 'getAddress',
			},
			// XRP operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['xrp'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get XRP account' },
					{ name: 'Get Account Info', value: 'getAccountInfo', action: 'Get account info' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get XRP address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Public Key', value: 'getPublicKey', action: 'Get public key' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
				],
				default: 'getAddress',
			},
			// Cardano operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cardano'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Derive Address', value: 'deriveAddress', action: 'Derive address' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Cardano account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Cardano address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Extended Public Key', value: 'getExtendedPublicKey', action: 'Get extended public key' },
					{ name: 'Get Staking Key', value: 'getStakingKey', action: 'Get staking key' },
					{ name: 'Get UTXOs', value: 'getUtxos', action: 'Get UTXOs' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
				],
				default: 'getAddress',
			},
			// Tezos operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['tezos'] } },
				options: [
					{ name: 'Broadcast Operation', value: 'broadcastOperation', action: 'Broadcast operation' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Tezos account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Tezos address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Public Key', value: 'getPublicKey', action: 'Get public key' },
					{ name: 'Sign Operation', value: 'signOperation', action: 'Sign operation' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
				],
				default: 'getAddress',
			},
			// Algorand operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['algorand'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Algorand account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Algorand address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Public Key', value: 'getPublicKey', action: 'Get public key' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
				],
				default: 'getAddress',
			},
			// Near operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['near'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Near account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Near address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Public Key', value: 'getPublicKey', action: 'Get public key' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
				],
				default: 'getAddress',
			},
			// Stellar operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['stellar'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Get Account', value: 'getAccount', action: 'Get Stellar account' },
					{ name: 'Get Address', value: 'getAddress', action: 'Get Stellar address' },
					{ name: 'Get Balance', value: 'getBalance', action: 'Get balance' },
					{ name: 'Get Public Key', value: 'getPublicKey', action: 'Get public key' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
				],
				default: 'getAddress',
			},
			// Multi-Currency operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['multiCurrency'] } },
				options: [
					{ name: 'Convert Amount', value: 'convertAmount', action: 'Convert amount' },
					{ name: 'Get All Accounts', value: 'getAllAccounts', action: 'Get all accounts' },
					{ name: 'Get Balances Overview', value: 'getBalancesOverview', action: 'Get balances overview' },
					{ name: 'Get Currency by Ticker', value: 'getCurrencyByTicker', action: 'Get currency by ticker' },
					{ name: 'Get Currency Info', value: 'getCurrencyInfo', action: 'Get currency info' },
					{ name: 'Get Exchange Rates', value: 'getExchangeRates', action: 'Get exchange rates' },
					{ name: 'Get Portfolio Value', value: 'getPortfolioValue', action: 'Get portfolio value' },
					{ name: 'Get Supported Currencies', value: 'getSupportedCurrencies', action: 'Get supported currencies' },
				],
				default: 'getSupportedCurrencies',
			},
			// Transaction operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['transaction'] } },
				options: [
					{ name: 'Broadcast Transaction', value: 'broadcastTransaction', action: 'Broadcast transaction' },
					{ name: 'Cancel Transaction', value: 'cancelTransaction', action: 'Cancel transaction' },
					{ name: 'Create Transaction', value: 'createTransaction', action: 'Create transaction' },
					{ name: 'Estimate Fees', value: 'estimateFees', action: 'Estimate fees' },
					{ name: 'Get Pending Transactions', value: 'getPendingTransactions', action: 'Get pending transactions' },
					{ name: 'Get Recommended Fees', value: 'getRecommendedFees', action: 'Get recommended fees' },
					{ name: 'Get Transaction', value: 'getTransaction', action: 'Get transaction' },
					{ name: 'Get Transaction History', value: 'getTransactionHistory', action: 'Get transaction history' },
					{ name: 'Get Transaction Status', value: 'getTransactionStatus', action: 'Get transaction status' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
					{ name: 'Simulate Transaction', value: 'simulateTransaction', action: 'Simulate transaction' },
					{ name: 'Speed Up Transaction', value: 'speedUpTransaction', action: 'Speed up transaction' },
				],
				default: 'getTransactionHistory',
			},
			// Address operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['address'] } },
				options: [
					{ name: 'Get Address', value: 'getAddress', action: 'Get address' },
					{ name: 'Get Address at Derivation Path', value: 'getAddressAtPath', action: 'Get address at derivation path' },
					{ name: 'Get Address Balance', value: 'getAddressBalance', action: 'Get address balance' },
					{ name: 'Get Address Info', value: 'getAddressInfo', action: 'Get address info' },
					{ name: 'Get All Addresses', value: 'getAllAddresses', action: 'Get all addresses' },
					{ name: 'Get Fresh Address', value: 'getFreshAddress', action: 'Get fresh address' },
					{ name: 'Validate Address', value: 'validateAddress', action: 'Validate address' },
					{ name: 'Verify Address on Device', value: 'verifyAddressOnDevice', action: 'Verify address on device' },
					{ name: 'Watch Address', value: 'watchAddress', action: 'Watch address' },
				],
				default: 'getAddress',
			},
			// Signing operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['signing'] } },
				options: [
					{ name: 'Display on Device', value: 'displayOnDevice', action: 'Display on device' },
					{ name: 'Get Signature', value: 'getSignature', action: 'Get signature' },
					{ name: 'Multi-Sign Transaction', value: 'multiSignTransaction', action: 'Multi-sign transaction' },
					{ name: 'Sign Hash', value: 'signHash', action: 'Sign hash' },
					{ name: 'Sign Message', value: 'signMessage', action: 'Sign message' },
					{ name: 'Sign Personal Message', value: 'signPersonalMessage', action: 'Sign personal message' },
					{ name: 'Sign PSBT', value: 'signPsbt', action: 'Sign PSBT Bitcoin' },
					{ name: 'Sign Transaction', value: 'signTransaction', action: 'Sign transaction' },
					{ name: 'Sign Typed Data', value: 'signTypedData', action: 'Sign typed data EIP-712' },
					{ name: 'Verify Signature', value: 'verifySignature', action: 'Verify signature' },
				],
				default: 'signMessage',
			},
			// Staking operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['staking'] } },
				options: [
					{ name: 'Claim Rewards', value: 'claimRewards', action: 'Claim rewards' },
					{ name: 'Get Claimable Rewards', value: 'getClaimableRewards', action: 'Get claimable rewards' },
					{ name: 'Get Staking APY', value: 'getStakingApy', action: 'Get staking APY' },
					{ name: 'Get Staking by Currency', value: 'getStakingByCurrency', action: 'Get staking by currency' },
					{ name: 'Get Staking Info', value: 'getStakingInfo', action: 'Get staking info' },
					{ name: 'Get Staking Positions', value: 'getStakingPositions', action: 'Get staking positions' },
					{ name: 'Get Validators', value: 'getValidators', action: 'Get validators' },
					{ name: 'Stake', value: 'stake', action: 'Stake' },
					{ name: 'Unstake', value: 'unstake', action: 'Unstake' },
				],
				default: 'getStakingPositions',
			},
			// NFT operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['nft'] } },
				options: [
					{ name: 'Get Hidden NFTs', value: 'getHiddenNfts', action: 'Get hidden NFTs' },
					{ name: 'Get NFT Collection', value: 'getNftCollection', action: 'Get NFT collection' },
					{ name: 'Get NFT Floor Price', value: 'getNftFloorPrice', action: 'Get NFT floor price' },
					{ name: 'Get NFT Metadata', value: 'getNftMetadata', action: 'Get NFT metadata' },
					{ name: 'Get NFTs', value: 'getNfts', action: 'Get NFTs' },
					{ name: 'Get NFTs by Account', value: 'getNftsByAccount', action: 'Get NFTs by account' },
					{ name: 'Hide NFT', value: 'hideNft', action: 'Hide NFT' },
					{ name: 'Sign NFT Transaction', value: 'signNftTransaction', action: 'Sign NFT transaction' },
					{ name: 'Unhide NFT', value: 'unhideNft', action: 'Unhide NFT' },
				],
				default: 'getNfts',
			},
			// Swap operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['swap'] } },
				options: [
					{ name: 'Complete Swap', value: 'completeSwap', action: 'Complete swap' },
					{ name: 'Get Supported Pairs', value: 'getSupportedPairs', action: 'Get supported pairs' },
					{ name: 'Get Swap History', value: 'getSwapHistory', action: 'Get swap history' },
					{ name: 'Get Swap Providers', value: 'getSwapProviders', action: 'Get swap providers' },
					{ name: 'Get Swap Quote', value: 'getSwapQuote', action: 'Get swap quote' },
					{ name: 'Get Swap Rates', value: 'getSwapRates', action: 'Get swap rates' },
					{ name: 'Get Swap Status', value: 'getSwapStatus', action: 'Get swap status' },
					{ name: 'Initiate Swap', value: 'initiateSwap', action: 'Initiate swap' },
				],
				default: 'getSwapProviders',
			},
			// Buy/Sell operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['buySell'] } },
				options: [
					{ name: 'Get Buy Providers', value: 'getBuyProviders', action: 'Get buy providers' },
					{ name: 'Get Buy Quote', value: 'getBuyQuote', action: 'Get buy quote' },
					{ name: 'Get Buy Status', value: 'getBuyStatus', action: 'Get buy status' },
					{ name: 'Get Sell Providers', value: 'getSellProviders', action: 'Get sell providers' },
					{ name: 'Get Sell Quote', value: 'getSellQuote', action: 'Get sell quote' },
					{ name: 'Get Transaction History', value: 'getTransactionHistory', action: 'Get transaction history' },
					{ name: 'Initiate Buy', value: 'initiateBuy', action: 'Initiate buy' },
					{ name: 'Initiate Sell', value: 'initiateSell', action: 'Initiate sell' },
				],
				default: 'getBuyProviders',
			},
			// DApp Browser operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['dappBrowser'] } },
				options: [
					{ name: 'Approve DApp Request', value: 'approveDappRequest', action: 'Approve DApp request' },
					{ name: 'Connect to DApp', value: 'connectToDapp', action: 'Connect to DApp' },
					{ name: 'Disconnect DApp', value: 'disconnectDapp', action: 'Disconnect DApp' },
					{ name: 'Get Connected DApps', value: 'getConnectedDapps', action: 'Get connected DApps' },
					{ name: 'Get DApp Manifest', value: 'getDappManifest', action: 'Get DApp manifest' },
					{ name: 'Reject DApp Request', value: 'rejectDappRequest', action: 'Reject DApp request' },
					{ name: 'Sign DApp Message', value: 'signDappMessage', action: 'Sign DApp message' },
					{ name: 'Sign DApp Transaction', value: 'signDappTransaction', action: 'Sign DApp transaction' },
				],
				default: 'getConnectedDapps',
			},
			// Ledger Live operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['ledgerLive'] } },
				options: [
					{ name: 'Export Accounts', value: 'exportAccounts', action: 'Export accounts' },
					{ name: 'Get Connected Accounts', value: 'getConnectedAccounts', action: 'Get connected accounts' },
					{ name: 'Get Currency Settings', value: 'getCurrencySettings', action: 'Get currency settings' },
					{ name: 'Get Ledger Live Version', value: 'getLedgerLiveVersion', action: 'Get Ledger Live version' },
					{ name: 'Get Market Data', value: 'getMarketData', action: 'Get market data' },
					{ name: 'Get Operation History', value: 'getOperationHistory', action: 'Get operation history' },
					{ name: 'Get Settings', value: 'getSettings', action: 'Get settings' },
					{ name: 'Import Accounts', value: 'importAccounts', action: 'Import accounts' },
					{ name: 'Sync All Accounts', value: 'syncAllAccounts', action: 'Sync all accounts' },
				],
				default: 'getLedgerLiveVersion',
			},
			// Security operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['security'] } },
				options: [
					{ name: 'Change PIN', value: 'changePin', action: 'Change PIN' },
					{ name: 'Check for Updates', value: 'checkForUpdates', action: 'Check for updates' },
					{ name: 'Get Recovery Phrase Status', value: 'getRecoveryPhraseStatus', action: 'Get recovery phrase status' },
					{ name: 'Get Security Check', value: 'getSecurityCheck', action: 'Get security check' },
					{ name: 'Get Security Recommendations', value: 'getSecurityRecommendations', action: 'Get security recommendations' },
					{ name: 'Reset Device', value: 'resetDevice', action: 'Reset device' },
					{ name: 'Set PIN', value: 'setPin', action: 'Set PIN' },
					{ name: 'Update Firmware', value: 'updateFirmware', action: 'Update firmware' },
					{ name: 'Verify Device Genuineness', value: 'verifyDeviceGenuineness', action: 'Verify device genuineness' },
				],
				default: 'getSecurityCheck',
			},
			// Utility operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['utility'] } },
				options: [
					{ name: 'Derive Path', value: 'derivePath', action: 'Derive path' },
					{ name: 'Get App Version', value: 'getAppVersion', action: 'Get app version' },
					{ name: 'Get Connection Status', value: 'getConnectionStatus', action: 'Get connection status' },
					{ name: 'Get Derivation Paths', value: 'getDerivationPaths', action: 'Get derivation paths' },
					{ name: 'Get Device Transport', value: 'getDeviceTransport', action: 'Get device transport' },
					{ name: 'Get SDK Version', value: 'getSdkVersion', action: 'Get SDK version' },
					{ name: 'Get Supported Currencies', value: 'getSupportedCurrencies', action: 'Get supported currencies' },
					{ name: 'Test Connection', value: 'testConnection', action: 'Test connection' },
					{ name: 'Validate Derivation Path', value: 'validateDerivationPath', action: 'Validate derivation path' },
				],
				default: 'getConnectionStatus',
			},
			// Common parameters
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'options',
				options: [
					{ name: 'Algorand', value: 'algorand' },
					{ name: 'Arbitrum', value: 'arbitrum' },
					{ name: 'Avalanche', value: 'avalanche' },
					{ name: 'Base', value: 'base' },
					{ name: 'Bitcoin', value: 'bitcoin' },
					{ name: 'BNB Chain', value: 'bsc' },
					{ name: 'Cardano', value: 'cardano' },
					{ name: 'Cosmos', value: 'cosmos' },
					{ name: 'Ethereum', value: 'ethereum' },
					{ name: 'Fantom', value: 'fantom' },
					{ name: 'Gnosis', value: 'gnosis' },
					{ name: 'Linea', value: 'linea' },
					{ name: 'Near', value: 'near' },
					{ name: 'Optimism', value: 'optimism' },
					{ name: 'Polkadot', value: 'polkadot' },
					{ name: 'Polygon', value: 'polygon' },
					{ name: 'Solana', value: 'solana' },
					{ name: 'Stellar', value: 'stellar' },
					{ name: 'Tezos', value: 'tezos' },
					{ name: 'XRP', value: 'xrp' },
					{ name: 'zkSync Era', value: 'zksync' },
				],
				default: 'ethereum',
				displayOptions: {
					show: {
						resource: ['address', 'signing', 'staking', 'transaction', 'multiCurrency'],
					},
				},
			},
			{
				displayName: 'Account Index',
				name: 'accountIndex',
				type: 'number',
				default: 0,
				description: 'Account index for derivation path',
				displayOptions: {
					show: {
						resource: ['bitcoin', 'ethereum', 'solana', 'cosmos', 'polkadot', 'xrp', 'cardano', 'tezos', 'algorand', 'near', 'stellar', 'address', 'evmChains'],
					},
				},
			},
			{
				displayName: 'Address Index',
				name: 'addressIndex',
				type: 'number',
				default: 0,
				description: 'Address index for derivation path',
				displayOptions: {
					show: {
						resource: ['bitcoin', 'ethereum', 'address', 'evmChains'],
					},
				},
			},
			{
				displayName: 'Derivation Path',
				name: 'derivationPath',
				type: 'string',
				default: '',
				placeholder: "m/44'/60'/0'/0/0",
				description: 'Custom derivation path (overrides account/address index)',
				displayOptions: {
					show: {
						resource: ['bitcoin', 'ethereum', 'solana', 'cosmos', 'polkadot', 'xrp', 'cardano', 'tezos', 'algorand', 'near', 'stellar', 'address', 'signing', 'evmChains'],
					},
				},
			},
			{
				displayName: 'Verify on Device',
				name: 'verifyOnDevice',
				type: 'boolean',
				default: true,
				description: 'Whether to verify the address on the Ledger device screen',
				displayOptions: {
					show: {
						operation: ['getAddress', 'verifyAddressOnDevice'],
					},
				},
			},
			{
				displayName: 'App Name',
				name: 'appName',
				type: 'string',
				default: '',
				placeholder: 'Ethereum',
				description: 'Name of the app to open/close on the device',
				displayOptions: {
					show: {
						operation: ['openApp', 'installApp', 'uninstallApp'],
					},
				},
			},
			{
				displayName: 'Transaction Data',
				name: 'transactionData',
				type: 'string',
				default: '',
				placeholder: '{"to": "0x...", "value": "0x...", "data": "0x..."}',
				description: 'Transaction data as JSON or hex',
				typeOptions: { rows: 4 },
				displayOptions: {
					show: {
						operation: ['signTransaction', 'createTransaction', 'signEip1559Transaction', 'signLegacyTransaction', 'signNftTransaction', 'signDappTransaction'],
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				placeholder: 'Message to sign',
				description: 'Message to sign',
				displayOptions: {
					show: {
						operation: ['signMessage', 'signPersonalMessage', 'signDappMessage', 'signOffChainMessage'],
					},
				},
			},
			{
				displayName: 'Typed Data',
				name: 'typedData',
				type: 'string',
				default: '',
				placeholder: '{"types": {...}, "primaryType": "...", "domain": {...}, "message": {...}}',
				description: 'EIP-712 typed data as JSON',
				typeOptions: { rows: 6 },
				displayOptions: {
					show: {
						operation: ['signTypedData'],
					},
				},
			},
			{
				displayName: 'Transaction Hash',
				name: 'transactionHash',
				type: 'string',
				default: '',
				placeholder: '0x...',
				description: 'Transaction hash',
				displayOptions: {
					show: {
						operation: ['getTransaction', 'getTransactionStatus', 'cancelTransaction', 'speedUpTransaction'],
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				placeholder: '0x...',
				description: 'Wallet address',
				displayOptions: {
					show: {
						operation: ['getAddressBalance', 'getAddressInfo', 'validateAddress', 'watchAddress', 'getAccountInfo', 'getNftsByAccount'],
					},
				},
			},
			{
				displayName: 'Network',
				name: 'network',
				type: 'options',
				options: [
					{ name: 'Mainnet', value: 'mainnet' },
					{ name: 'Testnet', value: 'testnet' },
				],
				default: 'mainnet',
				displayOptions: {
					show: {
						resource: ['bitcoin', 'ethereum', 'solana', 'cosmos', 'polkadot', 'xrp', 'cardano', 'tezos', 'algorand', 'near', 'stellar', 'evmChains'],
					},
				},
			},
			{
				displayName: 'EVM Chain',
				name: 'evmChain',
				type: 'options',
				options: [
					{ name: 'Arbitrum', value: 'arbitrum' },
					{ name: 'Avalanche C-Chain', value: 'avalanche' },
					{ name: 'Base', value: 'base' },
					{ name: 'BNB Chain', value: 'bsc' },
					{ name: 'Ethereum', value: 'ethereum' },
					{ name: 'Fantom', value: 'fantom' },
					{ name: 'Gnosis Chain', value: 'gnosis' },
					{ name: 'Linea', value: 'linea' },
					{ name: 'Optimism', value: 'optimism' },
					{ name: 'Polygon', value: 'polygon' },
					{ name: 'zkSync Era', value: 'zksync' },
					{ name: 'Custom', value: 'custom' },
				],
				default: 'ethereum',
				displayOptions: {
					show: {
						resource: ['evmChains'],
					},
				},
			},
			{
				displayName: 'PSBT',
				name: 'psbt',
				type: 'string',
				default: '',
				placeholder: 'Base64 encoded PSBT',
				description: 'Partially Signed Bitcoin Transaction',
				displayOptions: {
					show: {
						operation: ['signPsbt', 'getPsbt'],
					},
				},
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'string',
				default: '',
				placeholder: '0.1',
				description: 'Amount to send or stake',
				displayOptions: {
					show: {
						operation: ['stake', 'unstake', 'convertAmount', 'initiateBuy', 'initiateSell'],
					},
				},
			},
			{
				displayName: 'Validator Address',
				name: 'validatorAddress',
				type: 'string',
				default: '',
				placeholder: 'Validator address',
				description: 'Validator address for staking',
				displayOptions: {
					show: {
						operation: ['stake', 'unstake', 'claimRewards'],
					},
				},
			},
			{
				displayName: 'NFT Contract Address',
				name: 'nftContractAddress',
				type: 'string',
				default: '',
				placeholder: '0x...',
				description: 'NFT contract address',
				displayOptions: {
					show: {
						operation: ['getNftCollection', 'getNftMetadata', 'getNftFloorPrice', 'hideNft', 'unhideNft'],
					},
				},
			},
			{
				displayName: 'Token ID',
				name: 'tokenId',
				type: 'string',
				default: '',
				placeholder: '1',
				description: 'NFT token ID',
				displayOptions: {
					show: {
						operation: ['getNftMetadata', 'hideNft', 'unhideNft'],
					},
				},
			},
			{
				displayName: 'DApp URL',
				name: 'dappUrl',
				type: 'string',
				default: '',
				placeholder: 'https://app.uniswap.org',
				description: 'DApp URL to connect to',
				displayOptions: {
					show: {
						operation: ['connectToDapp', 'getDappManifest'],
					},
				},
			},
			{
				displayName: 'From Currency',
				name: 'fromCurrency',
				type: 'string',
				default: 'BTC',
				description: 'Source currency for swap',
				displayOptions: {
					show: {
						operation: ['getSwapQuote', 'getSwapRates', 'initiateSwap', 'convertAmount'],
					},
				},
			},
			{
				displayName: 'To Currency',
				name: 'toCurrency',
				type: 'string',
				default: 'ETH',
				description: 'Target currency for swap',
				displayOptions: {
					show: {
						operation: ['getSwapQuote', 'getSwapRates', 'initiateSwap', 'convertAmount'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Emit licensing notice once
		console.warn(LICENSING_NOTICE);

		for (let i = 0; i < items.length; i++) {
			try {
				let result: unknown;

				// Import and execute the appropriate resource handler
				switch (resource) {
					case 'device':
						result = await (await import('./actions/device/execute')).execute.call(this, i, operation);
						break;
					case 'account':
						result = await (await import('./actions/account/execute')).execute.call(this, i, operation);
						break;
					case 'bitcoin':
						result = await (await import('./actions/bitcoin/execute')).execute.call(this, i, operation);
						break;
					case 'ethereum':
						result = await (await import('./actions/ethereum/execute')).execute.call(this, i, operation);
						break;
					case 'evmChains':
						result = await (await import('./actions/evmChains/execute')).execute.call(this, i, operation);
						break;
					case 'solana':
						result = await (await import('./actions/solana/execute')).execute.call(this, i, operation);
						break;
					case 'cosmos':
						result = await (await import('./actions/cosmos/execute')).execute.call(this, i, operation);
						break;
					case 'polkadot':
						result = await (await import('./actions/polkadot/execute')).execute.call(this, i, operation);
						break;
					case 'xrp':
						result = await (await import('./actions/xrp/execute')).execute.call(this, i, operation);
						break;
					case 'cardano':
						result = await (await import('./actions/cardano/execute')).execute.call(this, i, operation);
						break;
					case 'tezos':
						result = await (await import('./actions/tezos/execute')).execute.call(this, i, operation);
						break;
					case 'algorand':
						result = await (await import('./actions/algorand/execute')).execute.call(this, i, operation);
						break;
					case 'near':
						result = await (await import('./actions/near/execute')).execute.call(this, i, operation);
						break;
					case 'stellar':
						result = await (await import('./actions/stellar/execute')).execute.call(this, i, operation);
						break;
					case 'multiCurrency':
						result = await (await import('./actions/multiCurrency/execute')).execute.call(this, i, operation);
						break;
					case 'transaction':
						result = await (await import('./actions/transaction/execute')).execute.call(this, i, operation);
						break;
					case 'address':
						result = await (await import('./actions/address/execute')).execute.call(this, i, operation);
						break;
					case 'signing':
						result = await (await import('./actions/signing/execute')).execute.call(this, i, operation);
						break;
					case 'staking':
						result = await (await import('./actions/staking/execute')).execute.call(this, i, operation);
						break;
					case 'nft':
						result = await (await import('./actions/nft/execute')).execute.call(this, i, operation);
						break;
					case 'swap':
						result = await (await import('./actions/swap/execute')).execute.call(this, i, operation);
						break;
					case 'buySell':
						result = await (await import('./actions/buySell/execute')).execute.call(this, i, operation);
						break;
					case 'dappBrowser':
						result = await (await import('./actions/dappBrowser/execute')).execute.call(this, i, operation);
						break;
					case 'ledgerLive':
						result = await (await import('./actions/ledgerLive/execute')).execute.call(this, i, operation);
						break;
					case 'security':
						result = await (await import('./actions/security/execute')).execute.call(this, i, operation);
						break;
					case 'utility':
						result = await (await import('./actions/utility/execute')).execute.call(this, i, operation);
						break;
					default:
						throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
				}

				returnData.push({ json: result as IDataObject });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error instanceof Error ? error.message : String(error) },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
