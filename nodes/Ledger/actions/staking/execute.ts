// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function executeStakingOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const currency = this.getNodeParameter('currency', i) as string;
			const network = this.getNodeParameter('network', i, 'mainnet') as string;

			switch (operation) {
				case 'getStakingPositions': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					// Requires Ledger Live API
					returnData.push({
						json: {
							accountId,
							currency,
							network,
							positions: [],
							message: 'Staking positions require Ledger Live API connection',
						},
					});
					break;
				}

				case 'getStakingByCurrency': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					returnData.push({
						json: {
							accountId,
							currency,
							network,
							positions: [],
							message: 'Use Ledger Live API for staking data',
						},
					});
					break;
				}

				case 'getValidators': {
					const limit = this.getNodeParameter('options.limit', i, 100) as number;
					const sortBy = this.getNodeParameter('options.sortBy', i, 'apy') as string;

					// Fetch validators from network-specific APIs
					returnData.push({
						json: {
							currency,
							network,
							validators: [],
							limit,
							sortBy,
							message: `Validators list requires ${currency} network API`,
						},
					});
					break;
				}

				case 'getStakingApy': {
					returnData.push({
						json: {
							currency,
							network,
							apy: null,
							message: 'APY data requires network-specific API',
						},
					});
					break;
				}

				case 'getStakingInfo': {
					const validatorAddress = this.getNodeParameter('validatorAddress', i, '') as string;
					returnData.push({
						json: {
							currency,
							network,
							validatorAddress,
							info: null,
							message: 'Staking info requires network API',
						},
					});
					break;
				}

				case 'getClaimableRewards': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					const includePending = this.getNodeParameter('options.includePending', i, true) as boolean;
					returnData.push({
						json: {
							accountId,
							currency,
							network,
							includePending,
							claimableRewards: null,
							message: 'Claimable rewards require Ledger Live API',
						},
					});
					break;
				}

				case 'stake': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					const validatorAddress = this.getNodeParameter('validatorAddress', i, '') as string;
					const amount = this.getNodeParameter('amount', i) as string;

					// Staking requires signing on device
					returnData.push({
						json: {
							accountId,
							validatorAddress,
							amount,
							currency,
							network,
							message: `Use ${currency} resource to sign staking transaction`,
							steps: [
								'1. Create staking transaction',
								'2. Sign on Ledger device',
								'3. Broadcast transaction',
							],
						},
					});
					break;
				}

				case 'unstake': {
					const accountId = this.getNodeParameter('accountId', i) as string;
					const validatorAddress = this.getNodeParameter('validatorAddress', i, '') as string;
					const amount = this.getNodeParameter('amount', i) as string;

					returnData.push({
						json: {
							accountId,
							validatorAddress,
							amount,
							currency,
							network,
							message: `Use ${currency} resource to sign unstaking transaction`,
							note: 'Unstaking may have a cooldown period',
						},
					});
					break;
				}

				case 'claimRewards': {
					const accountId = this.getNodeParameter('accountId', i) as string;

					returnData.push({
						json: {
							accountId,
							currency,
							network,
							message: `Use ${currency} resource to claim rewards`,
						},
					});
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Operation "${operation}" is not supported for Staking`,
					);
			}
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: (error as Error).message } });
				continue;
			}
			throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
		}
	}

	return returnData;
}
// Export alias for main node
export { executeStakingOperation as execute };
