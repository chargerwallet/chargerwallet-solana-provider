import { Transaction, VersionedTransaction } from '@solana/web3.js';
import base58 from 'bs58';
export const encodeTransaction = (transaction) => {
    return base58.encode(transaction.serialize({ requireAllSignatures: false }));
};
export const decodeSignedTransaction = (message) => {
    const txByte = base58.decode(message);
    try {
        return Transaction.from(txByte);
    }
    catch (_a) {
        return VersionedTransaction.deserialize(txByte);
    }
};
export function isWalletEventMethodMatch(method, name) {
    return method === `metamask_${name}` || method === `wallet_events_${name}`;
}
export function bytesEqual(a, b) {
    return arraysEqual(a, b);
}
export function arraysEqual(a, b) {
    if (a === b)
        return true;
    const length = a.length;
    if (length !== b.length)
        return false;
    for (let i = 0; i < length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
export function parseToNativeTx(txByte) {
    try {
        return Transaction.from(txByte);
    }
    catch (e) {
        return VersionedTransaction.deserialize(txByte);
    }
}
