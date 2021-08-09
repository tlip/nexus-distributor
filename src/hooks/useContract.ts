import { useMemo } from 'react';
import { ethers, Contract } from 'ethers';
import { ChainId } from '@uniswap/sdk';
import { getContract } from '../utils/web3';
import DISTRIBUTOR_ABI from '../constants/abi/Distributor.json';
import { useWeb3React } from '@web3-react/core';

// returns null on errors
export function useContract(
  address: string | undefined,
  ABI: ethers.ContractInterface,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useWeb3React();

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
  const { chainId } = useWeb3React();
  let address: string | undefined;
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
        address = '0xe93EC208Ac7a547e0C191623029D719391029B86';
        break;
      case ChainId.KOVAN:
        address = '0xeb693c2c61c32200a5dcda1fcb5ad5d8058d217e';
        break;
    }
  }
  return useContract(address, DISTRIBUTOR_ABI, withSignerIfPossible);
}
