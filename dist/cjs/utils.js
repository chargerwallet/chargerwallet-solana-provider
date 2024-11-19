"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToNativeTx = exports.arraysEqual = exports.bytesEqual = exports.isWalletEventMethodMatch = exports.decodeSignedTransaction = exports.encodeTransaction = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const encodeTransaction = (transaction) => {
    return bs58_1.default.encode(transaction.serialize({ requireAllSignatures: false }));
};
exports.encodeTransaction = encodeTransaction;
const decodeSignedTransaction = (message) => {
    const txByte = bs58_1.default.decode(message);
    try {
        return web3_js_1.Transaction.from(txByte);
    }
    catch (_a) {
        return web3_js_1.VersionedTransaction.deserialize(txByte);
    }
};
exports.decodeSignedTransaction = decodeSignedTransaction;
function isWalletEventMethodMatch(method, name) {
    return method === `metamask_${name}` || method === `wallet_events_${name}`;
}
exports.isWalletEventMethodMatch = isWalletEventMethodMatch;
function bytesEqual(a, b) {
    return arraysEqual(a, b);
}
exports.bytesEqual = bytesEqual;
function arraysEqual(a, b) {
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
exports.arraysEqual = arraysEqual;
function parseToNativeTx(txByte) {
    try {
        return web3_js_1.Transaction.from(txByte);
    }
    catch (e) {
        return web3_js_1.VersionedTransaction.deserialize(txByte);
    }
}
exports.parseToNativeTx = parseToNativeTx;
