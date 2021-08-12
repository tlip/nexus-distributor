import { useCallback, useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import ERC20_ABI from '../constants/abi/ERC20.json';
import { useContract } from './useContract';
import { ChainId } from '@uniswap/sdk';
import { useAllTransactions, useTransactionError } from 'state/hooks';
interface Erc20Hook {
  balanceOf: (account: string) => Promise<BigNumber>;
  approve: () => Promise<ethers.ContractTransaction> | null;
  allowance: BigNumber;
}

export const useErc20Contract = (tokenAddress: string): Erc20Hook => {
  const { account, chainId } = useWeb3React();
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const erc20Contract = useContract(tokenAddress, ERC20_ABI);
  const [, setTransactionError] = useTransactionError();
  const [, addTransaction] = useAllTransactions();

  let distributorAddress: string | undefined;
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
        distributorAddress = '0x9bb03a770b9aee405499d4228d10c91318029760';
        break;
      case ChainId.KOVAN:
        distributorAddress = '0xeb693c2c61c32200a5dcda1fcb5ad5d8058d217e';
        break;
    }
  }

  useEffect(() => {
    const id = setInterval(
      () => fetchAllowance().then((a) => setAllowance(a)),
      3000
    );

    return () => clearInterval(id);
  }, []);

  const approve = useCallback(async () => {
    if (!account) return null;

    let tx;
    try {
      tx = await erc20Contract?.approve(
        distributorAddress,
        ethers.constants.MaxUint256.toString()
      );
      addTransaction(tx);
      return tx;
    } catch (err) {
      console.log(err);
      setTransactionError(err?.error?.message || err?.message);
    }
  }, [erc20Contract]);

  const fetchAllowance = useCallback(async () => {
    const approvedBalance = await erc20Contract?.allowance(
      account as string,
      distributorAddress
    );
    return approvedBalance;
  }, [account, erc20Contract]);

  const balanceOf = useCallback(
    async (account) => {
      if (!account) {
        return 0;
      }
      const balance = await erc20Contract?.balanceOf(account);
      return balance;
    },
    [account, erc20Contract]
  );

  return { approve, allowance, balanceOf };
};
