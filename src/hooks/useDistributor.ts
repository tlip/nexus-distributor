import { ChainId } from '@uniswap/sdk';
import { useWeb3React } from '@web3-react/core';
import { fetchSignedQuote } from 'client';
import { ethers } from 'ethers';
import { useCallback } from 'react';
import { useAllTransactions, useTransactionError } from 'state/hooks';
import { useDistributorContract } from './useContract';

export const useDistributor = (): {
  buyCover: (
    contractAddress: string,
    coverData: any,
    currency: string,
    amount: string
  ) => Promise<ethers.Transaction | null>;
} => {
  const { chainId, account } = useWeb3React();
  // const [allowance, setAllowance] = useState('0');
  const distributorContract = useDistributorContract(true); //withSigner
  const [, setTransactionError] = useTransactionError();
  const [, addTransaction] = useAllTransactions();

  const buyCover = useCallback(
    async (
      contractAddress: string,
      coverData: any,
      currency: string,
      amount: string
    ) => {
      if (!account) {
        return null;
      }

      let networkBasedAddress;
      let signedQuote;
      let period;

      if (chainId === ChainId.KOVAN) {
        // hardcode data on kovan for testing
        networkBasedAddress = '0xC57D000000000000000000000000000000000002';
        period = 111;
        try {
          signedQuote = await fetchSignedQuote(
            parseFloat(amount),
            'ETH',
            period,
            networkBasedAddress,
            chainId
          );
        } catch (err) {
          console.log({ err });
          setTransactionError(err?.response?.data?.message);
        }
      } else {
        networkBasedAddress = contractAddress;
        try {
          signedQuote = await fetchSignedQuote(
            parseFloat(amount),
            currency === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
              ? 'ETH'
              : 'DAI',
            coverData.period,
            contractAddress,
            chainId
          );
        } catch (err) {
          console.log({ err });
          setTransactionError(err?.response?.data?.message);
        }
        period = coverData.period;
      }

      if (signedQuote && networkBasedAddress) {
        const encodedSignedQuote = ethers.utils.defaultAbiCoder.encode(
          ['uint', 'uint', 'uint', 'uint', 'uint8', 'bytes32', 'bytes32'],
          [
            signedQuote.price,
            signedQuote.priceInNXM,
            signedQuote.expiresAt,
            signedQuote.generatedAt,
            signedQuote.v,
            signedQuote.r,
            signedQuote.s,
          ]
        );

        try {
          const tx = await distributorContract?.buyCover(
            networkBasedAddress,
            currency,
            ethers.utils.parseEther(amount),
            period,
            0, // cover type
            signedQuote.price,
            encodedSignedQuote.toString(),
            {
              ...(currency === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
                ? {
                    value: signedQuote.price,
                  }
                : {}),
            }
          );
          addTransaction(tx);
          return tx;
        } catch (err) {
          console.log(err);
          setTransactionError(err?.error?.message || err?.message);
        }
      }
    },
    [distributorContract]
  );

  return {
    buyCover,
  };
};
