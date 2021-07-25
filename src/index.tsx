import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

import { App } from './app';
import { store } from './state/store';
import reportWebVitals from './reportWebVitals';
import './index.css';

function getLibrary(
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
