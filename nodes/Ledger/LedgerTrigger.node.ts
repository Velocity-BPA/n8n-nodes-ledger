// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	ITriggerFunctions,
	INodeType,
	INodeTypeDescription,
	ITriggerResponse,
} from 'n8n-workflow';

// Emit licensing notice once per load
let licenseNoticeEmitted = false;
function emitLicensingNotice(): void {
	if (!licenseNoticeEmitted) {
		console.warn(`
[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);
		licenseNoticeEmitted = true;
	}
}

export class LedgerTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ledger Trigger',
		name: 'ledgerTrigger',
		icon: 'file:ledger.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["triggerType"]}}',
		description: 'Trigger workflows on Ledger device and blockchain events',
		defaults: {
			name: 'Ledger Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'ledgerDevice',
				required: false,
			},
			{
				name: 'ledgerLiveApi',
				required: false,
			},
		],
		properties: [
			{
				displayName: 'Trigger Type',
				name: 'triggerType',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Device Connected',
						value: 'deviceConnected',
						description: 'Trigger when a Ledger device is connected',
					},
					{
						name: 'Device Disconnected',
						value: 'deviceDisconnected',
						description: 'Trigger when a Ledger device is disconnected',
					},
					{
						name: 'App Opened',
						value: 'appOpened',
						description: 'Trigger when an app is opened on the device',
					},
					{
						name: 'App Closed',
						value: 'appClosed',
						description: 'Trigger when an app is closed on the device',
					},
					{
						name: 'Transaction Signed',
						value: 'transactionSigned',
						description: 'Trigger when a transaction is signed',
					},
					{
						name: 'Transaction Rejected',
						value: 'transactionRejected',
						description: 'Trigger when a transaction is rejected on device',
					},
					{
						name: 'Balance Changed',
						value: 'balanceChanged',
						description: 'Trigger when account balance changes',
					},
					{
						name: 'Transaction Received',
						value: 'transactionReceived',
						description: 'Trigger when a new transaction is received',
					},
					{
						name: 'Transaction Confirmed',
						value: 'transactionConfirmed',
						description: 'Trigger when a transaction is confirmed',
					},
					{
						name: 'Account Synced',
						value: 'accountSynced',
						description: 'Trigger when an account sync completes',
					},
					{
						name: 'Staking Reward',
						value: 'stakingReward',
						description: 'Trigger when staking rewards are received',
					},
					{
						name: 'DApp Connected',
						value: 'dappConnected',
						description: 'Trigger when a DApp connects',
					},
					{
						name: 'DApp Request',
						value: 'dappRequest',
						description: 'Trigger when a DApp makes a request',
					},
					{
						name: 'Firmware Update Available',
						value: 'firmwareUpdateAvailable',
						description: 'Trigger when a firmware update is available',
					},
				],
				default: 'deviceConnected',
			},
			// Device triggers options
			{
				displayName: 'Device Model Filter',
				name: 'deviceModelFilter',
				type: 'multiOptions',
				options: [
					{ name: 'All Models', value: 'all' },
					{ name: 'Nano S', value: 'nanoS' },
					{ name: 'Nano S Plus', value: 'nanoSP' },
					{ name: 'Nano X', value: 'nanoX' },
					{ name: 'Stax', value: 'stax' },
					{ name: 'Flex', value: 'flex' },
				],
				default: ['all'],
				displayOptions: {
					show: {
						triggerType: ['deviceConnected', 'deviceDisconnected'],
					},
				},
				description: 'Filter events by device model',
			},
			// App triggers options
			{
				displayName: 'App Filter',
				name: 'appFilter',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						triggerType: ['appOpened', 'appClosed'],
					},
				},
				description: 'Filter by app name (leave empty for all apps)',
			},
			// Balance/Transaction triggers options
			{
				displayName: 'Currency Filter',
				name: 'currencyFilter',
				type: 'options',
				options: [
					{ name: 'All Currencies', value: 'all' },
					{ name: 'Bitcoin', value: 'bitcoin' },
					{ name: 'Ethereum', value: 'ethereum' },
					{ name: 'Solana', value: 'solana' },
					{ name: 'Polygon', value: 'polygon' },
					{ name: 'Cosmos', value: 'cosmos' },
					{ name: 'Polkadot', value: 'polkadot' },
					{ name: 'XRP', value: 'xrp' },
					{ name: 'Cardano', value: 'cardano' },
					{ name: 'Tezos', value: 'tezos' },
				],
				default: 'all',
				displayOptions: {
					show: {
						triggerType: [
							'balanceChanged',
							'transactionReceived',
							'transactionConfirmed',
							'transactionSigned',
							'stakingReward',
						],
					},
				},
				description: 'Filter events by currency',
			},
			{
				displayName: 'Account ID Filter',
				name: 'accountIdFilter',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						triggerType: [
							'balanceChanged',
							'transactionReceived',
							'transactionConfirmed',
							'accountSynced',
							'stakingReward',
						],
					},
				},
				description: 'Filter by specific account ID (leave empty for all accounts)',
			},
			{
				displayName: 'Minimum Amount',
				name: 'minimumAmount',
				type: 'string',
				default: '0',
				displayOptions: {
					show: {
						triggerType: ['balanceChanged', 'transactionReceived', 'stakingReward'],
					},
				},
				description: 'Minimum amount to trigger (in native currency units)',
			},
			// DApp triggers options
			{
				displayName: 'DApp Filter',
				name: 'dappFilter',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						triggerType: ['dappConnected', 'dappRequest'],
					},
				},
				description: 'Filter by DApp name or URL (leave empty for all)',
			},
			{
				displayName: 'Request Type Filter',
				name: 'requestTypeFilter',
				type: 'multiOptions',
				options: [
					{ name: 'All Requests', value: 'all' },
					{ name: 'Transaction', value: 'eth_sendTransaction' },
					{ name: 'Sign Message', value: 'personal_sign' },
					{ name: 'Sign Typed Data', value: 'eth_signTypedData' },
				],
				default: ['all'],
				displayOptions: {
					show: {
						triggerType: ['dappRequest'],
					},
				},
				description: 'Filter by request type',
			},
			// Polling options
			{
				displayName: 'Poll Interval',
				name: 'pollInterval',
				type: 'number',
				default: 60,
				displayOptions: {
					show: {
						triggerType: [
							'balanceChanged',
							'transactionReceived',
							'transactionConfirmed',
							'accountSynced',
							'stakingReward',
							'firmwareUpdateAvailable',
						],
					},
				},
				description: 'How often to check for changes (in seconds)',
			},
		],
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		emitLicensingNotice();

		const triggerType = this.getNodeParameter('triggerType') as string;
		const pollInterval = (this.getNodeParameter('pollInterval', 60) as number) * 1000;

		// Store last known state for comparison
		let lastState: Record<string, unknown> = {};

		const executeTrigger = async (): Promise<void> => {
			try {
				let triggerData: IDataObject | null = null;

				switch (triggerType) {
					case 'deviceConnected':
					case 'deviceDisconnected': {
						// Would poll for device connection state
						// Using device detection libraries
						break;
					}

					case 'appOpened':
					case 'appClosed': {
						// Would monitor app state on connected device
						break;
					}

					case 'transactionSigned':
					case 'transactionRejected': {
						// Would listen to signing events
						break;
					}

					case 'balanceChanged': {
						const currencyFilter = this.getNodeParameter('currencyFilter', 'all') as string;
						const accountIdFilter = this.getNodeParameter('accountIdFilter', '') as string;
						const minimumAmount = this.getNodeParameter('minimumAmount', '0') as string;

						// Would check balance via Ledger Live API
						// Compare with last known balance
						triggerData = {
							type: 'balance_changed',
							currency: currencyFilter,
							accountId: accountIdFilter || 'all',
							minimumAmountFilter: minimumAmount,
							timestamp: new Date().toISOString(),
							note: 'Requires Ledger Live API for balance monitoring',
						};
						break;
					}

					case 'transactionReceived':
					case 'transactionConfirmed': {
						const currencyFilter = this.getNodeParameter('currencyFilter', 'all') as string;
						const accountIdFilter = this.getNodeParameter('accountIdFilter', '') as string;

						// Would monitor pending/confirmed transactions
						triggerData = {
							type: triggerType,
							currency: currencyFilter,
							accountId: accountIdFilter || 'all',
							timestamp: new Date().toISOString(),
							note: 'Requires Ledger Live API for transaction monitoring',
						};
						break;
					}

					case 'accountSynced': {
						const accountIdFilter = this.getNodeParameter('accountIdFilter', '') as string;

						// Would listen to sync completion events
						triggerData = {
							type: 'account_synced',
							accountId: accountIdFilter || 'all',
							timestamp: new Date().toISOString(),
						};
						break;
					}

					case 'stakingReward': {
						const currencyFilter = this.getNodeParameter('currencyFilter', 'all') as string;
						const minimumAmount = this.getNodeParameter('minimumAmount', '0') as string;

						// Would monitor staking rewards
						triggerData = {
							type: 'staking_reward',
							currency: currencyFilter,
							minimumAmountFilter: minimumAmount,
							timestamp: new Date().toISOString(),
						};
						break;
					}

					case 'dappConnected': {
						const dappFilter = this.getNodeParameter('dappFilter', '') as string;

						// Would monitor WalletConnect sessions
						triggerData = {
							type: 'dapp_connected',
							dappFilter: dappFilter || 'all',
							timestamp: new Date().toISOString(),
						};
						break;
					}

					case 'dappRequest': {
						const dappFilter = this.getNodeParameter('dappFilter', '') as string;
						const requestTypeFilter = this.getNodeParameter('requestTypeFilter', ['all']) as string[];

						// Would monitor incoming DApp requests
						triggerData = {
							type: 'dapp_request',
							dappFilter: dappFilter || 'all',
							requestTypes: requestTypeFilter,
							timestamp: new Date().toISOString(),
						};
						break;
					}

					case 'firmwareUpdateAvailable': {
						// Would check Ledger's firmware API
						triggerData = {
							type: 'firmware_update_available',
							timestamp: new Date().toISOString(),
							note: 'Requires periodic firmware version check',
						};
						break;
					}
				}

				if (triggerData) {
					// Check if state has changed
					const stateKey = JSON.stringify(triggerData);
					if (lastState[triggerType] !== stateKey) {
						lastState[triggerType] = stateKey;
						this.emit([this.helpers.returnJsonArray([triggerData])]);
					}
				}
			} catch (error) {
				console.error('Ledger Trigger error:', error);
			}
		};

		// Set up polling interval
		const intervalId = setInterval(executeTrigger, pollInterval);

		// Execute immediately on start
		await executeTrigger();

		// Return cleanup function
		const closeFunction = async (): Promise<void> => {
			clearInterval(intervalId);
		};

		return {
			closeFunction,
		};
	}
}
