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
var _ChargerWalletSolanaWalletAccount_address, _ChargerWalletSolanaWalletAccount_publicKey, _ChargerWalletSolanaWalletAccount_chains, _ChargerWalletSolanaWalletAccount_features, _ChargerWalletSolanaWalletAccount_label, _ChargerWalletSolanaWalletAccount_icon;
import { SolanaSignAndSendTransaction, SolanaSignMessage, SolanaSignTransaction, } from '@solana/wallet-standard-features';
import { SOLANA_CHAINS } from './solana';
const chains = SOLANA_CHAINS;
const features = [SolanaSignAndSendTransaction, SolanaSignTransaction, SolanaSignMessage];
export class ChargerWalletSolanaWalletAccount {
    get address() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaWalletAccount_address, "f");
    }
    get publicKey() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaWalletAccount_publicKey, "f").slice();
    }
    get chains() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaWalletAccount_chains, "f").slice();
    }
    get features() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaWalletAccount_features, "f").slice();
    }
    get label() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaWalletAccount_label, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _ChargerWalletSolanaWalletAccount_icon, "f");
    }
    constructor({ address, publicKey, label, icon }) {
        _ChargerWalletSolanaWalletAccount_address.set(this, void 0);
        _ChargerWalletSolanaWalletAccount_publicKey.set(this, void 0);
        _ChargerWalletSolanaWalletAccount_chains.set(this, void 0);
        _ChargerWalletSolanaWalletAccount_features.set(this, void 0);
        _ChargerWalletSolanaWalletAccount_label.set(this, void 0);
        _ChargerWalletSolanaWalletAccount_icon.set(this, void 0);
        if (new.target === ChargerWalletSolanaWalletAccount) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _ChargerWalletSolanaWalletAccount_address, address, "f");
        __classPrivateFieldSet(this, _ChargerWalletSolanaWalletAccount_publicKey, publicKey, "f");
        __classPrivateFieldSet(this, _ChargerWalletSolanaWalletAccount_chains, chains, "f");
        __classPrivateFieldSet(this, _ChargerWalletSolanaWalletAccount_features, features, "f");
        __classPrivateFieldSet(this, _ChargerWalletSolanaWalletAccount_label, label, "f");
        __classPrivateFieldSet(this, _ChargerWalletSolanaWalletAccount_icon, icon, "f");
    }
}
_ChargerWalletSolanaWalletAccount_address = new WeakMap(), _ChargerWalletSolanaWalletAccount_publicKey = new WeakMap(), _ChargerWalletSolanaWalletAccount_chains = new WeakMap(), _ChargerWalletSolanaWalletAccount_features = new WeakMap(), _ChargerWalletSolanaWalletAccount_label = new WeakMap(), _ChargerWalletSolanaWalletAccount_icon = new WeakMap();
