import type { IdentifierString } from '@wallet-standard/base';
export declare const SOLANA_MAINNET_CHAIN = "solana:mainnet";
export declare const SOLANA_DEVNET_CHAIN = "solana:devnet";
export declare const SOLANA_TESTNET_CHAIN = "solana:testnet";
export declare const SOLANA_LOCALNET_CHAIN = "solana:localnet";
export declare const SOLANA_CHAINS: readonly ["solana:mainnet", "solana:devnet", "solana:testnet", "solana:localnet"];
export type SolanaChain = typeof SOLANA_CHAINS[number];
export declare function isSolanaChain(chain: IdentifierString): chain is SolanaChain;
