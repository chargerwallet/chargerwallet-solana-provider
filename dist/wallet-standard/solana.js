export const SOLANA_MAINNET_CHAIN = 'solana:mainnet';
export const SOLANA_DEVNET_CHAIN = 'solana:devnet';
export const SOLANA_TESTNET_CHAIN = 'solana:testnet';
export const SOLANA_LOCALNET_CHAIN = 'solana:localnet';
export const SOLANA_CHAINS = [
    SOLANA_MAINNET_CHAIN,
    SOLANA_DEVNET_CHAIN,
    SOLANA_TESTNET_CHAIN,
    SOLANA_LOCALNET_CHAIN,
];
export function isSolanaChain(chain) {
    return SOLANA_CHAINS.includes(chain);
}
