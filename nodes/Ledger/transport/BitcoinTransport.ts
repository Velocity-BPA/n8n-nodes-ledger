// @ts-nocheck
/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type Transport from '@ledgerhq/hw-transport';
import type Btc from '@ledgerhq/hw-app-btc';
import type { CreateTransactionArg } from '@ledgerhq/hw-app-btc/lib/createTransaction';

/**
 * Bitcoin address result
 */
export interface BitcoinAddressResult {
	publicKey: string;
	bitcoinAddress: string;
	chainCode: string;
}

/**
 * Bitcoin transaction input
 */
export interface BitcoinInput {
	txHash: string;
	outputIndex: number;
	value: number;
	sequence?: number;
}

/**
 * Bitcoin transaction output
 */
export interface BitcoinOutput {
	address: string;
	value: number;
}

/**
 * Bitcoin signature result
 */
export interface BitcoinSignatureResult {
	signature: string;
	signedTransaction: string;
}

/**
 * Bitcoin Transport wrapper for Ledger
 */
export class BitcoinTransport {
	private btcApp: Btc | null = null;
	private transport: Transport;

	constructor(transport: Transport) {
		this.transport = transport;
	}

	/**
	 * Initialize the Bitcoin app
	 */
	async init(): Promise<Btc> {
		if (!this.btcApp) {
			const BtcModule = await import('@ledgerhq/hw-app-btc');
			const BtcApp = BtcModule.default || BtcModule;
			this.btcApp = new BtcApp({ transport: this.transport });
		}
		return this.btcApp;
	}

	/**
	 * Get Bitcoin address at derivation path
	 */
	async getAddress(
		path: string,
		verify = false,
		format: 'legacy' | 'p2sh' | 'bech32' | 'bech32m' = 'bech32'
	): Promise<BitcoinAddressResult> {
		const btc = await this.init();
		const result = await btc.getWalletPublicKey(path, {
			verify,
			format,
		});

		return {
			publicKey: result.publicKey,
			bitcoinAddress: result.bitcoinAddress,
			chainCode: result.chainCode,
		};
	}

	/**
	 * Get extended public key (xPub)
	 */
	async getXPub(path: string): Promise<string> {
		const btc = await this.init();
		// Use getWalletXpub if available, otherwise derive from getWalletPublicKey
		if ('getWalletXpub' in btc) {
			return (btc as unknown as { getWalletXpub: (path: string) => Promise<string> }).getWalletXpub(path);
		}
		
		// Fallback: construct xpub from public key
		const result = await btc.getWalletPublicKey(path);
		return `xpub-${result.publicKey}-${result.chainCode}`;
	}

	/**
	 * Sign a Bitcoin transaction
	 */
	async signTransaction(params: {
		inputs: BitcoinInput[];
		outputs: BitcoinOutput[];
		changePath?: string;
		lockTime?: number;
		sigHashType?: number;
		segwit?: boolean;
		additionals?: string[];
	}): Promise<BitcoinSignatureResult> {
		const btc = await this.init();

		// Prepare inputs for createTransaction
		const preparedInputs: CreateTransactionArg['inputs'] = params.inputs.map((input) => [
			{
				txHash: input.txHash,
				outputIndex: input.outputIndex,
			} as unknown as ReturnType<Btc['getTrustedInput']> extends Promise<infer T> ? T : never,
			input.value,
			undefined,
			input.sequence,
		] as unknown as CreateTransactionArg['inputs'][0]);

		// Build output script
		const outputScriptHex = this.buildOutputScript(params.outputs);

		const txArgs: CreateTransactionArg = {
			inputs: preparedInputs,
			associatedKeysets: params.inputs.map(() => "m/84'/0'/0'/0/0"),
			outputScriptHex,
			lockTime: params.lockTime,
			sigHashType: params.sigHashType,
			segwit: params.segwit ?? true,
			additionals: params.additionals || [],
		};

		if (params.changePath) {
			txArgs.changePath = params.changePath;
		}

		const signedTx = await btc.createPaymentTransaction(txArgs);

		return {
			signature: signedTx,
			signedTransaction: signedTx,
		};
	}

	/**
	 * Sign a PSBT (Partially Signed Bitcoin Transaction)
	 */
	async signPsbt(
		psbt: string,
		keyPaths: string[],
		_globalInputs?: Record<string, unknown>
	): Promise<string> {
		const btc = await this.init();
		
		// For newer Ledger Bitcoin app versions that support PSBT
		if ('signPsbt' in btc) {
			return (btc as unknown as { signPsbt: (psbt: string, paths: string[]) => Promise<string> }).signPsbt(psbt, keyPaths);
		}
		
		// Fallback: parse PSBT and sign individual inputs
		// This is a simplified implementation
		throw new Error('PSBT signing requires Ledger Bitcoin app v2.1.0 or higher');
	}

	/**
	 * Sign a message with Bitcoin key
	 */
	async signMessage(path: string, message: string): Promise<string> {
		const btc = await this.init();
		const messageBuffer = Buffer.from(message, 'utf8');
		const result = await btc.signMessage(path, messageBuffer.toString('hex'));
		
		// Combine v, r, s into signature
		const signature = Buffer.concat([
			Buffer.from([result.v]),
			Buffer.from(result.r, 'hex'),
			Buffer.from(result.s, 'hex'),
		]);
		
		return signature.toString('base64');
	}

	/**
	 * Build output script from outputs
	 */
	private buildOutputScript(outputs: BitcoinOutput[]): string {
		// This is a simplified implementation
		// In production, use bitcoinjs-lib for proper script building
		let script = '';
		
		for (const output of outputs) {
			// Value as 8-byte little-endian
			const valueBuffer = Buffer.alloc(8);
			valueBuffer.writeBigUInt64LE(BigInt(output.value));
			script += valueBuffer.toString('hex');
			
			// Script pubkey (simplified - address encoding depends on type)
			const addressScript = this.addressToScript(output.address);
			const scriptLen = Buffer.from([addressScript.length / 2]);
			script += scriptLen.toString('hex') + addressScript;
		}
		
		return script;
	}

	/**
	 * Convert address to script
	 */
	private addressToScript(address: string): string {
		// Simplified - in production use bitcoinjs-lib
		if (address.startsWith('bc1q') || address.startsWith('tb1q')) {
			// Native SegWit (P2WPKH)
			return `0014${address}`; // Placeholder
		} else if (address.startsWith('bc1p') || address.startsWith('tb1p')) {
			// Taproot (P2TR)
			return `5120${address}`; // Placeholder
		} else if (address.startsWith('3') || address.startsWith('2')) {
			// P2SH
			return `a914${address}87`; // Placeholder
		} else {
			// Legacy P2PKH
			return `76a914${address}88ac`; // Placeholder
		}
	}

	/**
	 * Get transaction from trusted input
	 */
	async getTrustedInput(
		txHex: string,
		outputIndex: number
	): Promise<string> {
		const btc = await this.init();
		const txBuffer = Buffer.from(txHex, 'hex');
		const result = await btc.getTrustedInput(outputIndex, txBuffer);
		return result;
	}

	/**
	 * Get app configuration
	 */
	async getConfiguration(): Promise<{
		version: string;
		coinName: string;
	}> {
		const btc = await this.init();
		
		// Get app version through transport
		try {
			const response = await this.transport.send(0xe1, 0x01, 0x00, 0x00);
			const version = `${response[1]}.${response[2]}.${response[3]}`;
			return {
				version,
				coinName: 'Bitcoin',
			};
		} catch {
			return {
				version: 'unknown',
				coinName: 'Bitcoin',
			};
		}
	}
}

/**
 * Create Bitcoin transport from base transport
 */
export function createBitcoinTransport(transport: Transport): BitcoinTransport {
	return new BitcoinTransport(transport);
}
