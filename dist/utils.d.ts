import { Transaction, VersionedTransaction } from '@solana/web3.js';
interface Indexed<T> {
    length: number;
    [index: number]: T;
}
export declare const encodeTransaction: (transaction: Transaction | VersionedTransaction) => string;
export declare const decodeSignedTransaction: (message: string) => Transaction | VersionedTransaction;
export declare function isWalletEventMethodMatch(method: string, name: string): boolean;
export declare function bytesEqual(a: Uint8Array, b: Uint8Array): boolean;
export declare function arraysEqual<T>(a: Indexed<T>, b: Indexed<T>): boolean;
export declare function parseToNativeTx(txByte: Uint8Array): Transaction | VersionedTransaction;
export {};
