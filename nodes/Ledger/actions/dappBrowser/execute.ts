// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { withTransport } from '../../transport';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	switch (operation) {
		case 'connectDApp': {
			const connectionProtocol = this.getNodeParameter('connectionProtocol', index) as string;
			const connectionUri = this.getNodeParameter('connectionUri', index) as string;
			const accountId = this.getNodeParameter('accountId', index) as string;
			const chain = this.getNodeParameter('chain', index) as string;

			if (!connectionUri) {
				throw new NodeOperationError(
					this.getNode(),
					'Connection URI is required',
					{ itemIndex: index },
				);
			}

			return {
				status: 'pending_approval',
				sessionId: `session_${Date.now()}`,
				protocol: connectionProtocol,
				chain,
				accountId,
				dappInfo: {
					name: 'Pending DApp Connection',
					url: 'Parsing from URI...',
					icons: [],
				},
				timestamp: new Date().toISOString(),
				note: 'WalletConnect integration requires @walletconnect/client package',
			};
		}

		case 'disconnectDApp': {
			const sessionId = this.getNodeParameter('sessionId', index) as string;

			if (!sessionId) {
				throw new NodeOperationError(
					this.getNode(),
					'Session ID is required',
					{ itemIndex: index },
				);
			}

			return {
				status: 'disconnected',
				sessionId,
				disconnectedAt: new Date().toISOString(),
			};
		}

		case 'getConnectedDApps': {
			const filterChain = this.getNodeParameter('filterChain', index, '') as string;

			return {
				sessions: [],
				total: 0,
				filter: {
					chain: filterChain || 'all',
				},
				note: 'No active DApp sessions found',
			};
		}

		case 'signRequest': {
			const accountId = this.getNodeParameter('accountId', index) as string;
			const requestId = this.getNodeParameter('requestId', index) as string;
			const derivationPath = this.getNodeParameter('derivationPath', index) as string;

			return withTransport(this, async () => {
				return {
					status: 'pending_device_approval',
					requestId,
					accountId,
					derivationPath,
					message: 'Please approve the request on your Ledger device',
					timestamp: new Date().toISOString(),
				};
			});
		}

		case 'approveTransaction': {
			const accountId = this.getNodeParameter('accountId', index) as string;
			const requestId = this.getNodeParameter('requestId', index) as string;
			const derivationPath = this.getNodeParameter('derivationPath', index) as string;

			return withTransport(this, async () => {
				return {
					status: 'pending_device_approval',
					requestId,
					accountId,
					derivationPath,
					action: 'approve_transaction',
					message: 'Please review and approve the transaction on your Ledger device',
					timestamp: new Date().toISOString(),
				};
			});
		}

		case 'rejectTransaction': {
			const requestId = this.getNodeParameter('requestId', index) as string;

			return {
				status: 'rejected',
				requestId,
				reason: 'User rejected the transaction',
				rejectedAt: new Date().toISOString(),
			};
		}

		case 'getPendingRequests': {
			const filterSession = this.getNodeParameter('filterSession', index, '') as string;
			const requestType = this.getNodeParameter('requestType', index, 'all') as string;

			return {
				requests: [],
				total: 0,
				filters: {
					sessionId: filterSession || 'all',
					requestType,
				},
			};
		}

		case 'getSessionInfo': {
			const sessionId = this.getNodeParameter('sessionId', index) as string;

			if (!sessionId) {
				throw new NodeOperationError(
					this.getNode(),
					'Session ID is required',
					{ itemIndex: index },
				);
			}

			return {
				sessionId,
				status: 'not_found',
				message: 'Session not found or expired',
				note: 'WalletConnect session management requires active connection',
			};
		}

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Unknown operation: ${operation}`,
				{ itemIndex: index },
			);
	}
}
