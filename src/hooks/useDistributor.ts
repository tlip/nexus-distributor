import { ChainId } from '@uniswap/sdk';
import { fetchSignedQuote } from 'client';
import { ethers } from 'ethers';
import { useCallback } from 'react';
import { useDistributorContract } from './useContract';
import { useActiveWeb3React } from './web3';

export const useDistributor = (): {
  buyCover: (
    contractAddress: string,
    coverData: any,
    currency: string,
    amount: string
  ) => Promise<ethers.Transaction>;
} => {
  const { chainId } = useActiveWeb3React();
  // const [allowance, setAllowance] = useState('0');
  const distributorContract = useDistributorContract(true); //withSigner

  const buyCover = useCallback(
    async (
      contractAddress: string,
      coverData: any,
      currency: string,
      amount: string
    ) => {
      let networkBasedAddress;
      let signedQuote;
      let period;
      if (chainId === ChainId.KOVAN) {
        // hardcode data on kovan for testing
        console.log('calling kovan');
        networkBasedAddress = '0xc57d000000000000000000000000000000000002';
        period = 111;
        signedQuote = await fetchSignedQuote(
          parseFloat(amount),
          'ETH',
          period,
          networkBasedAddress
        );
      } else {
        console.log('calling mainnet');
        signedQuote = await fetchSignedQuote(
          parseFloat(amount),
          currency === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
            ? 'ETH'
            : 'DAI',
          coverData.period,
          contractAddress
        );
        period = coverData.period;
      }

      console.log(signedQuote);

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
          '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
          ethers.utils.parseEther(amount),
          111,
          0, // cover type
          signedQuote.price,
          encodedSignedQuote.toString(),
          {
            value: signedQuote.price,
          }
        );
        return tx;
      }
    },
    [distributorContract]
  );

  return {
    buyCover,
  };
};
