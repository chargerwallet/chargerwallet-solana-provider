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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderSolana = void 0;
const web3_js_1 = require("@solana/web3.js");
const extension_bridge_injected_1 = require("@chargerwallet/extension-bridge-injected");
const bs58_1 = __importDefault(require("bs58"));
const ProviderSolanaBase_1 = require("./ProviderSolanaBase");
const utils_1 = require("./utils");
const PROVIDER_EVENTS = {
    'connect': 'connect',
    'disconnect': 'disconnect',
    'accountChanged': 'accountChanged',
    'message_low_level': 'message_low_level',
};
class ProviderSolana extends ProviderSolanaBase_1.ProviderSolanaBase {
    get publicKey() {
        return this._publicKey;
    }
    get isConnected() {
        return this._publicKey !== null;
    }
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { bridge: props.bridge || (0, extension_bridge_injected_1.getOrCreateExtInjectedJsBridge)({ timeout: props.timeout }) }));
        this.isPhantom = true;
        this.isSolflare = true;
        this.isGlow = true;
        this._publicKey = null;
        this._registerEvents();
    }
    _registerEvents() {
        window.addEventListener('chargerwallet_bridge_disconnect', () => {
            this._handleDisconnected();
        });
        this.on(PROVIDER_EVENTS.message_low_level, (payload) => {
            const { method, params } = payload;
            if ((0, utils_1.isWalletEventMethodMatch)(method, PROVIDER_EVENTS.accountChanged)) {
                this._handleAccountChange(params);
            }
        });
    }
    _callBridge(params) {
        return this.bridgeRequest(params);
    }
    postMessage(param) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return this._callBridge(param);
    }
    connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.publicKey) {
                return { publicKey: this.publicKey };
            }
            // TODO: pass options to connect
            const result = yield this._callBridge({
                method: 'connect',
                params: options,
            });
            const publicKey = new web3_js_1.PublicKey(result.publicKey);
            this._handleConnected(publicKey, { emit: true });
            return { publicKey };
        });
    }
    _handleConnected(publicKey, options = { emit: true }) {
        this._publicKey = publicKey;
        if (options.emit && this.isConnectionStatusChanged('connected')) {
            this.connectionStatus = 'connected';
            this.emit('connect', publicKey);
            this.emit('accountChanged', publicKey);
        }
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._callBridge({
                method: 'disconnect',
                params: void 0,
            });
            this._handleDisconnected();
        });
    }
    _handleDisconnected(options = { emit: true }) {
        this._publicKey = null;
        if (options.emit && this.isConnectionStatusChanged('disconnected')) {
            this.connectionStatus = 'disconnected';
            this.emit('disconnect');
            this.emit('accountChanged', null);
        }
    }
    isAccountsChanged(account) {
        var _a;
        return (account === null || account === void 0 ? void 0 : account.publicKey) !== ((_a = this._publicKey) === null || _a === void 0 ? void 0 : _a.toBase58());
    }
    // trigger by bridge account change event
    _handleAccountChange(payload) {
        const account = payload.accounts[0];
        let publicKey;
        try {
            publicKey = new web3_js_1.PublicKey(account.publicKey);
        }
        catch (error) {
            // noop
        }
        if (this.isAccountsChanged(account)) {
            this.emit('accountChanged', publicKey || null);
        }
        if (!account) {
            this._handleDisconnected();
            return;
        }
        if (publicKey) {
            this._handleConnected(publicKey, { emit: false });
        }
    }
    signAndSendTransaction(transaction, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._handleSignAndSendTransaction({
                message: (0, utils_1.encodeTransaction)(transaction),
                options,
            });
        });
    }
    _handleSignAndSendTransaction(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({
                method: 'signAndSendTransaction',
                params,
            });
            return result;
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._handleSignTransaction({
                message: (0, utils_1.encodeTransaction)(transaction),
            });
        });
    }
    _handleSignTransaction(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({
                method: 'signTransaction',
                params,
            });
            return (0, utils_1.decodeSignedTransaction)(result);
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._handleSignAllTransactions({
                message: transactions.map(utils_1.encodeTransaction),
            });
        });
    }
    _handleSignAllTransactions(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._callBridge({
                method: 'signAllTransactions',
                params,
            });
            return result.map(utils_1.decodeSignedTransaction);
        });
    }
    signMessage(message, display) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._handleSignMessage({ message, display });
        });
    }
    _handleSignMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message, display } = params;
            const result = yield this._callBridge({
                method: 'signMessage',
                params: {
                    message: typeof message === 'string' ? message : bs58_1.default.encode(message),
                    display,
                },
            });
            return {
                signature: bs58_1.default.decode(result.signature),
                publicKey: new web3_js_1.PublicKey(result.publicKey),
            };
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request(...args) {
        let method;
        let params;
        if (typeof args[0] === 'string') {
            method = args[0];
            params = args[1];
        }
        else {
            const payload = args[0];
            method = payload.method;
            params = payload.params;
        }
        switch (method) {
            case 'connect':
                return this.connect(params);
            case 'disconnect':
                return this.disconnect();
            case 'signTransaction':
                return this._handleSignTransaction(params);
            case 'signAllTransactions':
                return this._handleSignAllTransactions(params);
            case 'signMessage':
                return this._handleSignMessage(params);
            case 'signAndSendTransaction':
                return this._handleSignAndSendTransaction(params);
        }
        return this._callBridge({ method, params });
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
}
exports.ProviderSolana = ProviderSolana;
