"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ChargerWalletSolanaStandardWallet_instances, _ChargerWalletSolanaStandardWallet_listeners, _ChargerWalletSolanaStandardWallet_version, _ChargerWalletSolanaStandardWallet_name, _ChargerWalletSolanaStandardWallet_icon, _ChargerWalletSolanaStandardWallet_account, _ChargerWalletSolanaStandardWallet_provider, _ChargerWalletSolanaStandardWallet_on, _ChargerWalletSolanaStandardWallet_emit, _ChargerWalletSolanaStandardWallet_off, _ChargerWalletSolanaStandardWallet_connected, _ChargerWalletSolanaStandardWallet_disconnected, _ChargerWalletSolanaStandardWallet_reconnected, _ChargerWalletSolanaStandardWallet_connect, _ChargerWalletSolanaStandardWallet_disconnect, _ChargerWalletSolanaStandardWallet_signAndSendTransaction, _ChargerWalletSolanaStandardWallet_signTransaction, _ChargerWalletSolanaStandardWallet_signMessage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargerWalletSolanaStandardWallet = exports.ChargerWalletNamespace = void 0;
const wallet_standard_features_1 = require("@solana/wallet-standard-features");
const features_1 = require("@wallet-standard/features");
const bs58_1 = __importDefault(require("bs58"));
const account_1 = require("./account");
const solana_1 = require("./solana");
const utils_1 = require("../utils");
exports.ChargerWalletNamespace = 'chargerwallet:';
class ChargerWalletSolanaStandardWallet {
    get version() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_version, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_name, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_icon, "f");
    }
    get chains() {
        return solana_1.SOLANA_CHAINS.slice();
    }
    get features() {
        return {
            [features_1.StandardConnect]: {
                version: '1.0.0',
                connect: __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_connect, "f"),
            },
            [features_1.StandardDisconnect]: {
                version: '1.0.0',
                disconnect: __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_disconnect, "f"),
            },
            [features_1.StandardEvents]: {
                version: '1.0.0',
                on: __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_on, "f"),
            },
            [wallet_standard_features_1.SolanaSignAndSendTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: ['legacy', 0],
                signAndSendTransaction: __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_signAndSendTransaction, "f"),
            },
            [wallet_standard_features_1.SolanaSignTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: ['legacy', 0],
                signTransaction: __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_signTransaction, "f"),
            },
            [wallet_standard_features_1.SolanaSignMessage]: {
                version: '1.0.0',
                signMessage: __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_signMessage, "f"),
            },
            [exports.ChargerWalletNamespace]: {
                chargerwallet: __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f"),
            },
        };
    }
    get accounts() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f") ? [__classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f")] : [];
    }
    constructor(provider, options) {
        _ChargerWalletSolanaStandardWallet_instances.add(this);
        _ChargerWalletSolanaStandardWallet_listeners.set(this, {});
        _ChargerWalletSolanaStandardWallet_version.set(this, '1.0.0');
        _ChargerWalletSolanaStandardWallet_name.set(this, 'ChargerWallet');
        _ChargerWalletSolanaStandardWallet_icon.set(this, void 0);
        _ChargerWalletSolanaStandardWallet_account.set(this, null);
        _ChargerWalletSolanaStandardWallet_provider.set(this, void 0);
        _ChargerWalletSolanaStandardWallet_on.set(this, (event, listener) => {
            var _a;
            ((_a = __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.push(listener)) || (__classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_listeners, "f")[event] = [listener]);
            return () => __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_instances, "m", _ChargerWalletSolanaStandardWallet_off).call(this, event, listener);
        });
        _ChargerWalletSolanaStandardWallet_connected.set(this, () => {
            var _a;
            const address = (_a = __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").publicKey) === null || _a === void 0 ? void 0 : _a.toBase58();
            if (address) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const publicKey = __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").publicKey.toBytes();
                const account = __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f");
                if (!account || account.address !== address || !(0, utils_1.bytesEqual)(account.publicKey, publicKey)) {
                    __classPrivateFieldSet(this, _ChargerWalletSolanaStandardWallet_account, new account_1.ChargerWalletSolanaWalletAccount({ address, publicKey }), "f");
                    __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_instances, "m", _ChargerWalletSolanaStandardWallet_emit).call(this, 'change', { accounts: this.accounts });
                }
            }
        });
        _ChargerWalletSolanaStandardWallet_disconnected.set(this, () => {
            if (__classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f")) {
                __classPrivateFieldSet(this, _ChargerWalletSolanaStandardWallet_account, null, "f");
                __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_instances, "m", _ChargerWalletSolanaStandardWallet_emit).call(this, 'change', { accounts: this.accounts });
            }
        });
        _ChargerWalletSolanaStandardWallet_reconnected.set(this, () => {
            if (__classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").publicKey) {
                __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_connected, "f").call(this);
            }
            else {
                __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_disconnected, "f").call(this);
            }
        });
        _ChargerWalletSolanaStandardWallet_connect.set(this, ({ silent } = {}) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f")) {
                yield __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").connect(silent ? { onlyIfTrusted: true } : undefined);
            }
            __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_connected, "f").call(this);
            return { accounts: this.accounts };
        }));
        _ChargerWalletSolanaStandardWallet_disconnect.set(this, () => __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").disconnect();
        }));
        _ChargerWalletSolanaStandardWallet_signAndSendTransaction.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain, options } = inputs[0];
                const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } = options || {};
                if (account !== __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f"))
                    throw new Error('invalid account');
                if (!(0, solana_1.isSolanaChain)(chain))
                    throw new Error('invalid chain');
                const { signature } = yield __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").signAndSendTransaction((0, utils_1.parseToNativeTx)(transaction), {
                    preflightCommitment,
                    minContextSlot,
                    maxRetries,
                    skipPreflight,
                });
                outputs.push({ signature: bs58_1.default.decode(signature) });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(yield __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_signAndSendTransaction, "f").call(this, input)));
                }
            }
            return outputs;
        }));
        _ChargerWalletSolanaStandardWallet_signTransaction.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f"))
                    throw new Error('invalid account');
                if (chain && !(0, solana_1.isSolanaChain)(chain))
                    throw new Error('invalid chain');
                const signedTransaction = yield __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").signTransaction((0, utils_1.parseToNativeTx)(transaction));
                outputs.push({ signedTransaction: signedTransaction.serialize({ requireAllSignatures: false }) });
            }
            else if (inputs.length > 1) {
                let chain = undefined;
                for (const input of inputs) {
                    if (input.account !== __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f"))
                        throw new Error('invalid account');
                    if (input.chain) {
                        if (!(0, solana_1.isSolanaChain)(input.chain))
                            throw new Error('invalid chain');
                        if (chain) {
                            if (input.chain !== chain)
                                throw new Error('conflicting chain');
                        }
                        else {
                            chain = input.chain;
                        }
                    }
                }
                const transactions = inputs.map(({ transaction }) => (0, utils_1.parseToNativeTx)(transaction));
                const signedTransactions = yield __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").signAllTransactions(transactions);
                outputs.push(...signedTransactions.map((signedTransaction) => ({ signedTransaction: signedTransaction.serialize({ requireAllSignatures: false }) })));
            }
            return outputs;
        }));
        _ChargerWalletSolanaStandardWallet_signMessage.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { message, account } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_account, "f"))
                    throw new Error('invalid account');
                const { signature } = yield __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_provider, "f").signMessage(message);
                outputs.push({ signedMessage: message, signature });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(yield __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_signMessage, "f").call(this, input)));
                }
            }
            return outputs;
        }));
        if (new.target === ChargerWalletSolanaStandardWallet) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _ChargerWalletSolanaStandardWallet_provider, provider, "f");
        __classPrivateFieldSet(this, _ChargerWalletSolanaStandardWallet_icon, options.icon, "f");
        provider.on('connect', __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_connected, "f"));
        provider.on('disconnect', __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_disconnected, "f"));
        provider.on('accountChanged', __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_reconnected, "f"));
        __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_connected, "f").call(this);
    }
}
exports.ChargerWalletSolanaStandardWallet = ChargerWalletSolanaStandardWallet;
_ChargerWalletSolanaStandardWallet_listeners = new WeakMap(), _ChargerWalletSolanaStandardWallet_version = new WeakMap(), _ChargerWalletSolanaStandardWallet_name = new WeakMap(), _ChargerWalletSolanaStandardWallet_icon = new WeakMap(), _ChargerWalletSolanaStandardWallet_account = new WeakMap(), _ChargerWalletSolanaStandardWallet_provider = new WeakMap(), _ChargerWalletSolanaStandardWallet_on = new WeakMap(), _ChargerWalletSolanaStandardWallet_connected = new WeakMap(), _ChargerWalletSolanaStandardWallet_disconnected = new WeakMap(), _ChargerWalletSolanaStandardWallet_reconnected = new WeakMap(), _ChargerWalletSolanaStandardWallet_connect = new WeakMap(), _ChargerWalletSolanaStandardWallet_disconnect = new WeakMap(), _ChargerWalletSolanaStandardWallet_signAndSendTransaction = new WeakMap(), _ChargerWalletSolanaStandardWallet_signTransaction = new WeakMap(), _ChargerWalletSolanaStandardWallet_signMessage = new WeakMap(), _ChargerWalletSolanaStandardWallet_instances = new WeakSet(), _ChargerWalletSolanaStandardWallet_emit = function _ChargerWalletSolanaStandardWallet_emit(event, ...args) {
    var _a;
    // eslint-disable-next-line prefer-spread
    (_a = __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => listener.apply(null, args));
}, _ChargerWalletSolanaStandardWallet_off = function _ChargerWalletSolanaStandardWallet_off(event, listener) {
    var _a;
    __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_listeners, "f")[event] = (_a = __classPrivateFieldGet(this, _ChargerWalletSolanaStandardWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.filter((existingListener) => listener !== existingListener);
};
