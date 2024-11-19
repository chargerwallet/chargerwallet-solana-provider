import { type SolanaSignAndSendTransactionFeature, type SolanaSignMessageFeature, type SolanaSignTransactionFeature } from '@solana/wallet-standard-features';
import type { Wallet } from '@wallet-standard/base';
import { type StandardConnectFeature, type StandardDisconnectFeature, type StandardEventsFeature } from '@wallet-standard/features';
import { ChargerWalletSolanaWalletAccount } from './account';
import { ProviderSolana } from '../ProviderSolana';
import { WalletInfo } from './types';
export declare const ChargerWalletNamespace = "chargerwallet:";
export type ChargerWalletFeature = {
    [ChargerWalletNamespace]: {
        chargerwallet: ProviderSolana;
    };
};
export declare class ChargerWalletSolanaStandardWallet implements Wallet {
    #private;
    get version(): "1.0.0";
    get name(): "ChargerWallet";
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
    get chains(): ("solana:mainnet" | "solana:devnet" | "solana:testnet" | "solana:localnet")[];
    get features(): StandardConnectFeature & StandardDisconnectFeature & StandardEventsFeature & SolanaSignAndSendTransactionFeature & SolanaSignTransactionFeature & SolanaSignMessageFeature & ChargerWalletFeature;
    get accounts(): ChargerWalletSolanaWalletAccount[];
    constructor(provider: ProviderSolana, options: WalletInfo);
}
