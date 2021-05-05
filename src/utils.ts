import { ethers, Contract } from 'ethers';
import { Token } from 'types/shared';
import ERC20_ABI from 'constants/abi/ERC20.json';

const provider = new ethers.providers.Web3Provider(
  'https://mainnet.infura.io/v3/c3db76b9d752406094ae1501ad143f4d'
);

// account is not optional
export function getSigner(
  library: ethers.providers.Web3Provider,
  account: string
): ethers.providers.JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: ethers.providers.Web3Provider,
  account?: string
): ethers.providers.Web3Provider | ethers.providers.JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: ethers.providers.Web3Provider,
  account?: string
): Contract {
  if (
    !ethers.utils.isAddress(address) ||
    address === ethers.constants.AddressZero
  ) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}

export const getTokenData: Promise<Token> = async (
  address: string,
  imageUrl?: string
) => {
  // Instantiate web3 and return token info from enndpoint
  const contract = getContract(address, ERC20_ABI, provider, undefined);
  const decimals = await contract.functions.decimals();
  const symbol = await contract.functions.symbol();
  const name = await contract.functions.name();
  return {
    name,
    decimals,
    symbol,
    ...(!!imageUrl && { imageUrl }),
  };
};
