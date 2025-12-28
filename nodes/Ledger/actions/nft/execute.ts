// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function executeNftOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	operation: string,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const chain = this.getNodeParameter('chain', i) as string;

			switch (operation) {
				case 'getNfts':
				case 'getNftsByAccount': {
					const accountAddress = this.getNodeParameter('accountAddress', i) as string;
					const includeMetadata = this.getNodeParameter('options.includeMetadata', i, true) as boolean;
					const limit = this.getNodeParameter('options.limit', i, 100) as number;

					// Requires Ledger Live API or external NFT API
					returnData.push({
						json: {
							accountAddress,
							chain,
							nfts: [],
							includeMetadata,
							limit,
							message: 'NFT fetching requires Ledger Live API or external NFT API (OpenSea, Alchemy)',
						},
					});
					break;
				}

				case 'getNftCollection': {
					const contractAddress = this.getNodeParameter('contractAddress', i) as string;

					returnData.push({
						json: {
							contractAddress,
							chain,
							collection: null,
							message: 'Collection data requires external NFT API',
						},
					});
					break;
				}

				case 'getNftMetadata': {
					const contractAddress = this.getNodeParameter('contractAddress', i) as string;
					const tokenId = this.getNodeParameter('tokenId', i) as string;

					returnData.push({
						json: {
							contractAddress,
							tokenId,
							chain,
							metadata: null,
							message: 'Metadata requires contract call or NFT API',
						},
					});
					break;
				}

				case 'getNftFloorPrice': {
					const contractAddress = this.getNodeParameter('contractAddress', i) as string;

					returnData.push({
						json: {
							contractAddress,
							chain,
							floorPrice: null,
							message: 'Floor price requires marketplace API (OpenSea, Blur)',
						},
					});
					break;
				}

				case 'signNftTransaction': {
					const contractAddress = this.getNodeParameter('contractAddress', i) as string;
					const tokenId = this.getNodeParameter('tokenId', i) as string;
					const recipient = this.getNodeParameter('recipient', i) as string;

					returnData.push({
						json: {
							contractAddress,
							tokenId,
							recipient,
							chain,
							message: 'Use Ethereum/EVM resource to sign NFT transfer transaction',
							steps: [
								'1. Build ERC-721/1155 transfer transaction',
								'2. Sign with Ledger device',
								'3. Broadcast transaction',
							],
						},
					});
					break;
				}

				case 'getHiddenNfts': {
					const accountAddress = this.getNodeParameter('accountAddress', i) as string;

					returnData.push({
						json: {
							accountAddress,
							chain,
							hiddenNfts: [],
							message: 'Hidden NFTs are managed in Ledger Live',
						},
					});
					break;
				}

				case 'hideNft':
				case 'unhideNft': {
					const contractAddress = this.getNodeParameter('contractAddress', i) as string;
					const tokenId = this.getNodeParameter('tokenId', i) as string;

					returnData.push({
						json: {
							contractAddress,
							tokenId,
							chain,
							action: operation === 'hideNft' ? 'hidden' : 'unhidden',
							message: 'NFT visibility is managed through Ledger Live',
						},
					});
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Operation "${operation}" is not supported for NFT`,
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
export { executeNftOperation as execute };
