import { ChainId } from '@uniswap/sdk';
import { BigNumber, Contract, ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useAsyncSignedQuote } from 'state/hooks';
import { useDistributorContract } from './useContract';
import useActiveWeb3React from './web3';

export const useDistributor = () => {
  const { account, chainId } = useActiveWeb3React();
  const [allowance, setAllowance] = useState('0');
  const distributorContract = useDistributorContract(true); //withSigner
  const [signedQuote, fetchSignedQuote] = useAsyncSignedQuote();

  const buyCover = useCallback(async () =>
    //   contractAddress: string,
    //   coverData: any,
    //   currency: string,
    //   maxPriceWithFee,
    //   amount: string
    {
      let networkBasedAddress;
      if (chainId === ChainId.KOVAN) {
        networkBasedAddress = '0xc57d000000000000000000000000000000000002';
        fetchSignedQuote(networkBasedAddress);
      }
      //   } else {
      //     networkBasedAddress = contractAddress;
      //     fetchSignedQuote(networkBasedAddress);
      //   }
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

        const tx = distributorContract?.buyCover(
          networkBasedAddress,
          '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          ethers.utils.parseEther('1.0'),
          100,
          0, // cover type
          7118412046543463,
          encodedSignedQuote.toString(),
          {
            value: 7118412046543463,
          }
        );
      }
    }, [distributorContract, signedQuote]);

  return {
    allowance,
    buyCover,
  };
};