import type { Wallet } from '@wallet-standard/base';
import { ProviderSolana } from '../ProviderSolana';
import { WalletInfo } from './types';
export declare function registerWallet(wallet: Wallet): void;
/** @deprecated */
export declare function DEPRECATED_registerWallet(wallet: Wallet): void;
export declare function registerSolanaWallet(provider: ProviderSolana, options: WalletInfo): void;
