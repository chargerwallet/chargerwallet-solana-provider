import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderBase } from '@chargerwallet/cross-inpage-provider-core';
class ProviderSolanaBase extends ProviderBase {
    constructor(props) {
        super(props);
        this.providerName = IInjectedProviderNames.solana;
    }
    request(data) {
        return this.bridgeRequest(data);
    }
}
export { ProviderSolanaBase };
