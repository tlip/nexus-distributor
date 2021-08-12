/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Image } from './Image';
import { injected, walletconnect } from '../connectors';
import metamask from '../assets/images/metamask.png';
import walletConnect from '../assets/images/walletConnect.svg';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { abbreviateAddress } from 'utils/abbreviateAddress';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const baseClassNames = `flex items-center rounded shadow-sm border-transparent 
   focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium border`;

const sizeToPadding = (size: string) => {
  if (size === 'xs') return 'px-2.5 py-1.5';
  if (size === 'sm') return 'px-3 py-2';
  if (size === 'md') return 'px-4 py-2';
  if (size === 'lg') return 'px-4 py-2';
  else return 'px-6 py-3';
};

// @ts-ignore
export const Button = ({
  // @ts-ignore
  className,
  // @ts-ignore
  size,
  // @ts-ignore
  variant,
  // @ts-ignore
  onClick,
  // @ts-ignore
  type = undefined,
  disabled = false,
  ...props
}) => {
  const isPrimaryEnabled = !disabled && variant === 'primary';
  const isSecondaryEnabled = !disabled && variant === 'secondary';
  const isPrimaryDisabled = disabled && variant === 'primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        `${sizeToPadding(size)} text-${size} ${baseClassNames} ${className}`,
        {
          'cursor-not-allowed': disabled,
          'border-transparent': variant === 'primary',
          'bg-gray-600': isPrimaryDisabled,
          'text-gray-400': isPrimaryDisabled,
          'hover:bg-gray-500': isPrimaryEnabled,
          'bg-gray-400': isPrimaryEnabled,
          'text-white': isPrimaryEnabled,
          'text-gray-200': isSecondaryEnabled,
          'bg-gray-800': isSecondaryEnabled,
          'hover:border-blue-500': isSecondaryEnabled,
        }
      )}
    >
      {props.children}
    </button>
  );
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  fn: { (): any; (): void }
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export const Web3Modal: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setOpen(false));
  const { activate, active, account, connector, deactivate } = useWeb3React();

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block max-w bg-white align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          ref={wrapperRef}
        >
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {active ? 'Wallet Connected' : 'Connect a Wallet'}
              </h3>
              <div className="mt-2">
                {!active && (
                  <p className="text-sm text-gray-500">
                    You need a Web3 wallet to interact with this site. Please
                    choose a wallet you have installed.
                  </p>
                )}
              </div>
            </div>
          </div>
          {active ? (
            <div className="mt-5 sm:mt-6">
              <div className="border-2 px-4 py-4 border-green-100 rounded-lg flex items-center justify-between flex-col">
                <p className="inline-block text-sm text-gray-500">
                  Connected with{' '}
                  {connector instanceof InjectedConnector
                    ? 'Metamask'
                    : 'WalletConnect'}
                </p>
                <p className="inline-block text-lg font-bold text-white bg-gray-300 rounded-2xl py-2 px-6 w-min">
                  {abbreviateAddress(account)}
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
                  if (
                    connector instanceof WalletConnectConnector &&
                    connector.walletConnectProvider?.wc?.uri
                  ) {
                    connector.walletConnectProvider = undefined;
                  } else {
                    deactivate();
                    if (connector instanceof WalletConnectConnector) {
                      connector.close();
                    }
                  }
                }}
                className="w-min mt-5 text-left py-3 px-6 mx-auto flex justify-between"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-5 sm:mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    activate(injected);
                    setOpen(false);
                  }}
                  className="w-full text-left py-3 px-3 flex justify-between"
                >
                  MetaMask
                  <Image src={metamask} className="ml-auto mx-2 h-10 w-10" />
                </Button>
              </div>
              <div className="mt-5 sm:mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    activate(walletconnect);
                    setOpen(false);
                  }}
                  className="w-full text-left py-3 px-3 flex justify-between"
                >
                  WalletConnect
                  <Image
                    src={walletConnect}
                    className="ml-auto mx-2 h-10 w-10"
                  />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
