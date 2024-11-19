import { PublicKey, VersionedTransaction } from '@solana/web3.js';
import type { SendOptions, Transaction } from '@solana/web3.js';
import { IInpageProviderConfig } from '@chargerwallet/cross-inpage-provider-core';
import { IJsonRpcRequest } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderSolanaBase } from './ProviderSolanaBase';
import type * as TypeUtils from './type-utils';
export type DisplayEncoding = 'utf8' | 'hex';
export type ConnectOptions = {
    onlyIfTrusted?: boolean;
};
export type SolanaRequest = {
    'connect': (params: ConnectOptions | undefined) => Promise<{
        publicKey: PublicKey;
    }>;
    'disconnect': () => Promise<void>;
    'signMessage': (params: {
        message: string;
        display?: DisplayEncoding;
    }) => Promise<{
        signature: string;
        publicKey: string;
    }>;
    'signTransaction': (params: {
        message: string;
    }) => Promise<Transaction>;
    'signAllTransactions': (params: {
        message: string[];
    }) => Promise<Transaction[]>;
    'signAndSendTransaction': (params: {
        message: string;
        options?: SendOptions;
    }) => Promise<{
        signature: string;
        publicKey: string;
    }>;
};
export type JsBridgeRequest = {
    [K in keyof SolanaRequest]: (params: Parameters<SolanaRequest[K]>[0]) => Promise<TypeUtils.WireStringified<TypeUtils.ResolvePromise<ReturnType<SolanaRequest[K]>>>>;
};
declare const PROVIDER_EVENTS: {
    readonly connect: "connect";
    readonly disconnect: "disconnect";
    readonly accountChanged: "accountChanged";
    readonly message_low_level: "message_low_level";
};
type SolanaProviderEventsMap = {
    [PROVIDER_EVENTS.connect]: (publicKey: PublicKey) => void;
    [PROVIDER_EVENTS.disconnect]: () => void;
    [PROVIDER_EVENTS.accountChanged]: (publicKey: PublicKey | null) => void;
    [PROVIDER_EVENTS.message_low_level]: (payload: IJsonRpcRequest) => void;
};
type SolanaAccountInfo = {
    publicKey: string;
};
interface IProviderSolana extends ProviderSolanaBase {
    readonly isPhantom: true;
    readonly isGlow: true;
    readonly isSolflare: true;
    isConnected: boolean;
    publicKey: PublicKey | null;
    /**
     * Connect wallet, and get wallet public key
     * @param {Object} options - Connection options
     * @param {string} options.onlyIfTrusted - Only connect when user have connected before, otherwise would throw an error
     * @emits `connect` on success
     */
    connect(options?: ConnectOptions): Promise<{
        publicKey: PublicKey;
    }>;
    /**
     * Disconnect wallet
     */
    disconnect(): Promise<void>;
    /**
     * @deprecated
     * Sign multiple transactions
     * @returns Transaction[]
     */
    signAllTransactions(transactions: (Transaction | VersionedTransaction)[]): Promise<(Transaction | VersionedTransaction)[]>;
    /**
     * @deprecated
     * Sign one transaction
     * @returns Transaction
     */
    signTransaction(transaction: Transaction | VersionedTransaction): Promise<Transaction | VersionedTransaction>;
    /**
     * Sign and send a transaction
     * @returns {Object} Signature and public key
     */
    signAndSendTransaction(transaction: Transaction | VersionedTransaction, options?: SendOptions): Promise<{
        publicKey: string;
        signature: string;
    }>;
    /** Sign a message
     * @param message - The message to be signed.
     * @param {string} [display='utf8'] - Specify how the message should be displayed. (default: 'uft8')
     */
    signMessage(message: Uint8Array, display?: DisplayEncoding): Promise<{
        signature: Uint8Array;
        publicKey: PublicKey;
    }>;
}
type ChargerWalletSolanaProviderProps = IInpageProviderConfig & {
    timeout?: number;
};
declare class ProviderSolana extends ProviderSolanaBase implements IProviderSolana {
    readonly isPhantom = true;
    readonly isSolflare = true;
    readonly isGlow = true;
    private _publicKey;
    get publicKey(): PublicKey | null;
    get isConnected(): boolean;
    constructor(props: ChargerWalletSolanaProviderProps);
    private _registerEvents;
    private _callBridge;
    private postMessage;
    connect(options?: ConnectOptions): Promise<{
        publicKey: PublicKey;
    }>;
    private _handleConnected;
    disconnect(): Promise<void>;
    private _handleDisconnected;
    isAccountsChanged(account: SolanaAccountInfo | undefined): boolean;
    private _handleAccountChange;
    signAndSendTransaction(transaction: Transaction | VersionedTransaction, options?: Partial<SendOptions>): Promise<{
        publicKey: string;
        signature: string;
    }>;
    private _handleSignAndSendTransaction;
    signTransaction(transaction: Transaction | VersionedTransaction): Promise<Transaction | VersionedTransaction>;
    private _handleSignTransaction;
    signAllTransactions(transactions: (Transaction | VersionedTransaction)[]): Promise<(Transaction | VersionedTransaction)[]>;
    private _handleSignAllTransactions;
    signMessage(message: Uint8Array, display?: DisplayEncoding): Promise<{
        signature: Uint8Array;
        publicKey: PublicKey;
    }>;
    private _handleSignMessage;
    request<T extends keyof SolanaRequest>(method: T, params: Parameters<SolanaRequest[T]>[0]): ReturnType<SolanaRequest[T]>;
    request<T extends keyof SolanaRequest>(payload: {
        method: T;
        params: Parameters<SolanaRequest[T]>[0];
    }): ReturnType<SolanaRequest[T]>;
    on<E extends keyof SolanaProviderEventsMap>(event: E, listener: SolanaProviderEventsMap[E]): this;
    emit<E extends keyof SolanaProviderEventsMap>(event: E, ...args: Parameters<SolanaProviderEventsMap[E]>): boolean;
}
export { ProviderSolana };
