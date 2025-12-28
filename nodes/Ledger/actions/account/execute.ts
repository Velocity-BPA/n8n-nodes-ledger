// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { withTransport, getAppAndVersion } from '../../transport';

export async function execute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<IDataObject> {
	switch (operation) {
		case 'getAccounts':
			return {
				accounts: [],
				note: 'Account list requires Ledger Live API integration',
			};

		case 'getAccount':
			return {
				account: null,
				note: 'Get account requires Ledger Live API integration',
			};

		case 'getAccountByCurrency': {
			const currency = this.getNodeParameter('currency', index, 'ethereum') as string;
			return {
				currency,
				account: null,
				note: 'Get account by currency requires Ledger Live API integration',
			};
		}

		case 'getAccountBalance':
			return {
				balance: '0',
				note: 'Account balance requires Ledger Live API or network query',
			};

		case 'getAccountAddress':
			return withTransport(this, async (transport) => {
				const appInfo = await getAppAndVersion(transport);
				return {
					appName: appInfo.name,
					note: 'Use currency-specific resource for address generation',
				};
			});

		case 'getFreshAddress':
			return {
				address: null,
				note: 'Fresh address generation requires Ledger Live API',
			};

		case 'syncAccount':
			return {
				synced: false,
				note: 'Account sync requires Ledger Live API',
			};

		case 'addAccount':
			return {
				added: false,
				note: 'Add account requires Ledger Live API',
			};

		case 'removeAccount':
			return {
				removed: false,
				note: 'Remove account requires Ledger Live API',
			};

		case 'renameAccount':
			return {
				renamed: false,
				note: 'Rename account requires Ledger Live API',
			};

		case 'getAccountOperations':
			return {
				operations: [],
				note: 'Operation history requires Ledger Live API',
			};

		case 'getAccountPendingOperations':
			return {
				pendingOperations: [],
				note: 'Pending operations require Ledger Live API',
			};

		case 'exportAccount':
			return {
				exported: false,
				note: 'Account export requires Ledger Live API',
			};

		case 'getExtendedPublicKey':
			return withTransport(this, async () => {
				return {
					note: 'Use currency-specific resource for xPub retrieval',
				};
			});

		default:
			throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
	}
}
