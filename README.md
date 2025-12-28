# n8n-nodes-ledger

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Ledger hardware wallet integration, providing 26 resource categories and 200+ operations for secure cryptocurrency management, multi-chain support, and blockchain automation.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)

## Features

- **Multi-Device Support**: Nano S, Nano S Plus, Nano X, Stax, and Flex
- **26 Resource Categories**: Device, Account, Bitcoin, Ethereum, EVM Chains, Solana, Cosmos, Polkadot, XRP, Cardano, Tezos, Algorand, Near, Stellar, Multi-Currency, Transaction, Address, Signing, Staking, NFT, Swap, Buy/Sell, DApp Browser, Ledger Live, Security, Utility
- **200+ Operations**: Comprehensive coverage of Ledger functionality
- **Multiple Connection Types**: USB HID, Bluetooth, WebHID, HTTP Transport, Speculos simulator
- **Multi-Chain Support**: Bitcoin, Ethereum, 11 EVM chains, Solana, Cosmos ecosystem, and more
- **Secure by Design**: Hardware-based signing, never exposes private keys
- **Trigger Node**: Real-time event monitoring for device and blockchain events

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-ledger`
5. Click **Install**

### Manual Installation

```bash
npm install n8n-nodes-ledger
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-ledger.git
cd n8n-nodes-ledger

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-ledger

# Restart n8n
n8n start
```

## Credentials Setup

### Ledger Device Credentials

| Field | Description |
|-------|-------------|
| Connection Type | USB HID, Bluetooth, WebHID, HTTP, Speculos |
| Device Path | Optional: Specific device path |
| Account Index | Default account index (0) |

### Ledger Live API Credentials

| Field | Description |
|-------|-------------|
| WebSocket Endpoint | Ledger Live WebSocket URL |
| API Version | API version (default: 1.0.0) |
| Permissions | Requested permissions for operations |

### Ledger Network Credentials

| Field | Description |
|-------|-------------|
| Network | Mainnet or Testnet |
| RPC Endpoint | Custom RPC endpoint URL |
| Explorer API | Block explorer API endpoint |
| Chain ID | EVM chain ID (for EVM networks) |

## Resources & Operations

### Device Resource
- Connect/Disconnect Device
- Get Device Info, Model, Firmware Version, MCU Version
- Get Battery Level, Device State, Lock Status
- List Connected Devices
- Open/Close/Get Running App
- Get/Install/Uninstall Apps

### Account Resource
- Get Accounts, Get Account by Currency
- Get Account Balance, Address, Fresh Address
- Sync Account, Add/Remove/Rename Account
- Get Operations, Pending Operations
- Export Account, Get Extended Public Key

### Bitcoin Resource
- Get Bitcoin Address (Native SegWit, SegWit, Legacy, Taproot)
- Create/Sign Transaction, Sign PSBT
- Broadcast Transaction, Get UTXOs
- Estimate/Get Recommended Fees
- Sign/Verify Message, Get xPub

### Ethereum Resource
- Get Ethereum Address
- Sign Transaction (EIP-1559, Legacy, EIP-2930)
- Sign Message, Personal Message, Typed Data (EIP-712)
- Provide ERC20 Token Info
- Clear Sign Transaction
- Broadcast Transaction, Estimate Gas

### EVM Chains Resource
Support for: Ethereum, Polygon, Arbitrum, Optimism, BNB Chain, Avalanche, Base, Fantom, Gnosis Chain, zkSync Era, Linea, Custom EVM

### Additional Chains
- **Solana**: Addresses, Transactions, Versioned Transactions, Token Accounts
- **Cosmos**: Amino/Direct Transactions, Validators, Delegations, Rewards
- **Polkadot**: Addresses, Extrinsics, Metadata
- **XRP**: Addresses, Transactions, Account Info
- **Cardano**: Addresses, Staking Keys, UTXOs, Extended Public Keys
- **Tezos**: Addresses, Operations, Public Keys
- **Algorand**: Addresses, Transactions, Public Keys
- **Near**: Addresses, Transactions, Public Keys
- **Stellar**: Addresses, Transactions, Public Keys

### Multi-Currency Resource
- Get All Accounts, Balances Overview, Portfolio Value
- Get Supported Currencies, Currency Info
- Get Exchange Rates, Convert Amount

### Transaction Resource
- Create/Sign/Broadcast Transaction
- Get Transaction Status, History
- Estimate Fees, Simulate Transaction
- Cancel/Speed Up Transaction

### Address Resource
- Get/Verify Address on Device
- Get Fresh Address, Address at Path
- Validate Address, Get Balance

### Signing Resource
- Sign Transaction, Message, Typed Data, Hash
- Sign PSBT (Bitcoin)
- Multi-Sign Transaction
- Display on Device, Verify Signature

### Staking Resource
- Get Staking Positions by Currency
- Stake, Unstake, Claim Rewards
- Get Validators, APY, Claimable Rewards

### NFT Resource
- Get NFTs by Account/Collection
- Get NFT Metadata, Floor Price
- Sign NFT Transaction
- Hide/Unhide NFT

### Swap Resource (Ledger Live)
- Get Swap Providers, Quotes, Rates
- Initiate/Complete Swap
- Get Swap Status, History

### Buy/Sell Resource (Ledger Live)
- Get Buy/Sell Providers, Quotes
- Initiate Buy/Sell
- Get Transaction History

### DApp Browser Resource
- Connect/Disconnect DApp
- Sign DApp Transaction/Message
- Get/Approve/Reject Requests

### Ledger Live Resource
- Get Version, Connected Accounts
- Sync All Accounts
- Get/Export/Import Settings
- Get Market Data

### Security Resource
- Get Security Check
- Verify Device Genuineness
- Update Firmware, Check for Updates
- Get Security Recommendations
- Reset Device, Change PIN

### Utility Resource
- Get Supported Currencies
- Get/Validate Derivation Paths
- Test Connection, Get SDK Version

## Trigger Node

The Ledger Trigger node monitors events in real-time:

### Device Triggers
- Device Connected/Disconnected
- App Opened/Closed
- Transaction Signed/Rejected

### Account Triggers
- Balance Changed
- Transaction Received/Confirmed
- Account Synced

### Staking Triggers
- Staking Reward Received

### DApp Triggers
- DApp Connected
- DApp Request

### Security Triggers
- Firmware Update Available

## Usage Examples

### Get Bitcoin Address

```javascript
// Configure Ledger node
Resource: Bitcoin
Operation: Get Bitcoin Address
Address Type: Native SegWit (bech32)
Account Index: 0
Address Index: 0
Network: Mainnet
```

### Sign Ethereum Transaction

```javascript
// Configure Ledger node
Resource: Ethereum
Operation: Sign EIP-1559 Transaction
To Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f1DB84
Value: 0.1
Max Fee Per Gas: 30
Max Priority Fee: 2
Derivation Path: m/44'/60'/0'/0/0
```

### Multi-Chain Balance Check

```javascript
// Configure Ledger node
Resource: Multi-Currency
Operation: Get Balances Overview
Currencies: bitcoin,ethereum,solana,polygon
```

## Ledger Concepts

### Derivation Paths
HD wallet paths following BIP32/44/49/84/86 standards:
- **BIP44** (`m/44'/coin'/account'/change/index`): Multi-currency standard
- **BIP49** (`m/49'/coin'/...`): SegWit P2SH
- **BIP84** (`m/84'/coin'/...`): Native SegWit
- **BIP86** (`m/86'/coin'/...`): Taproot

### Device Models
| Model | Bluetooth | Screen | Apps |
|-------|-----------|--------|------|
| Nano S | No | 128x32 | ~3 |
| Nano S Plus | No | 128x64 | ~100 |
| Nano X | Yes | 128x64 | ~100 |
| Stax | Yes | 400x672 | ~100 |
| Flex | Yes | 480x600 | ~100 |

### Clear Signing vs Blind Signing
- **Clear Signing**: Human-readable transaction details on device
- **Blind Signing**: Raw data signing (less secure, use with caution)

## Networks

| Currency | Mainnet | Testnet |
|----------|---------|---------|
| Bitcoin | ✓ | ✓ (Testnet3) |
| Ethereum | ✓ | ✓ (Sepolia, Goerli) |
| Solana | ✓ | ✓ (Devnet) |
| Polygon | ✓ | ✓ (Mumbai) |
| All EVM | ✓ | ✓ |

## Error Handling

The node provides detailed error messages for common scenarios:
- Device not connected
- App not open on device
- User rejected transaction
- Invalid derivation path
- Insufficient funds
- Network errors

## Security Best Practices

1. **Always verify addresses on device screen**
2. **Never share your recovery phrase**
3. **Use strong PIN codes (8 digits recommended)**
4. **Keep firmware updated**
5. **Verify app hashes after installation**
6. **Use clear signing when possible**
7. **Double-check transaction details**

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint

# Fix linting issues
npm run lint:fix

# Watch mode
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes linting and tests before submitting.

## Support

- 📧 Email: support@velobpa.com
- 🐛 Issues: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-ledger/issues)
- 📖 Documentation: [Ledger Developer Portal](https://developers.ledger.com/)

## Acknowledgments

- [Ledger](https://www.ledger.com/) for hardware wallet technology
- [n8n](https://n8n.io/) for the workflow automation platform
- The open-source community for supporting libraries
