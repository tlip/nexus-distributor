import { useState, useEffect } from 'react';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from '@uniswap/sdk';

import { NetworkContextName } from '../constants';
import { injected } from '../connectors';

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId;
} {
  const context = useWeb3ReactCore<Web3Provider>();
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName);
  return context.active ? context : contextNetwork;
}

export function useEagerConnect(): boolean {
  const { activate, active } = useActiveWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
