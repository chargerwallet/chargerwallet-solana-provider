"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSolanaChain = exports.SOLANA_CHAINS = exports.SOLANA_LOCALNET_CHAIN = exports.SOLANA_TESTNET_CHAIN = exports.SOLANA_DEVNET_CHAIN = exports.SOLANA_MAINNET_CHAIN = void 0;
exports.SOLANA_MAINNET_CHAIN = 'solana:mainnet';
exports.SOLANA_DEVNET_CHAIN = 'solana:devnet';
exports.SOLANA_TESTNET_CHAIN = 'solana:testnet';
exports.SOLANA_LOCALNET_CHAIN = 'solana:localnet';
exports.SOLANA_CHAINS = [
    exports.SOLANA_MAINNET_CHAIN,
    exports.SOLANA_DEVNET_CHAIN,
    exports.SOLANA_TESTNET_CHAIN,
    exports.SOLANA_LOCALNET_CHAIN,
];
function isSolanaChain(chain) {
    return exports.SOLANA_CHAINS.includes(chain);
}
exports.isSolanaChain = isSolanaChain;
