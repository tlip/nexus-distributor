import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

// const REACT_APP_DEFAULT_CHAIN = 1;

const RPC_URLS = {
  1: 'https://eth-mainnet.alchemyapi.io/v2/2k4V8mnXAjKoms8KyvhCxHNNtJvp6qM-',
  42: 'https://eth-kovan.alchemyapi.io/v2/2k4V8mnXAjKoms8KyvhCxHNNtJvp6qM-',
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 42],
});

const rpc = RPC_URLS;

export const walletconnect = new WalletConnectConnector({
  rpc,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});
