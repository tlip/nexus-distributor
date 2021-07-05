import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const POLLING_INTERVAL = 12000;
const REACT_APP_DEFAULT_CHAIN = 1;

const RPC_URLS = {
  1: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  // 42: process.env.REACT_APP_RPC_URL_42,
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 42],
});

const rpc = RPC_URLS;

export const walletconnect = new WalletConnectConnector({
  rpc,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
