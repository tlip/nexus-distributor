import { useMemo } from 'react';
import { ethers, Contract } from 'ethers';
import { ChainId } from '@uniswap/sdk';
import { useActiveWeb3React } from './web3';
import { getContract } from '../utils/web3';
import DISTRIBUTOR_ABI from '../constants/abi/Distributor.json';

// returns null on errors
export function useContract(
  address: string | undefined,
  ABI: ethers.ContractInterface,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useDistributorContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  let address: string | undefined;
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
        address = '';
        break;
      case ChainId.KOVAN:
        address = '0x501cc38ae11ba264e04480c202e9c17f8947441a';
        break;
    }
  }
  return useContract(address, DISTRIBUTOR_ABI, withSignerIfPossible);
}
