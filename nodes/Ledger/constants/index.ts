/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

export * from './devices';
export * from './currencies';
export * from './derivationPaths';
export * from './apps';

// Alias exports for backward compatibility with naming conventions
export { DEVICE_MODELS as LEDGER_DEVICE_MODELS } from './devices';
export { DEVICE_STATUSES as ERROR_CODES } from './devices';
export { CURRENCIES as SUPPORTED_CURRENCIES } from './currencies';
export { EVM_CURRENCIES as EVM_CHAINS } from './currencies';
export { DERIVATION_TEMPLATES as DERIVATION_PATHS } from './derivationPaths';

export const LICENSING_NOTICE = `
[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`;
