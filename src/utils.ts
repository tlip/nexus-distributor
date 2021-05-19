import { ethers, Contract } from 'ethers';
import { Token } from 'types/shared';
import ERC20_ABI from 'constants/abi/ERC20.json';

const provider = new ethers.providers.JsonRpcProvider(
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
  ABI: ethers.ContractInterface,
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

// @ts-ignore
export const getTokenData: Promise<Token> = async (
  address: string,
  imageUrl?: string
) => {
  // Instantiate web3 and return token info from enndpoint
  const contract = getContract(
    address,
    ERC20_ABI,
    provider as ethers.providers.Web3Provider,
    undefined
  );

  const [decimals, symbol, name] = await Promise.all([
    contract.functions.decimals(),
    contract.functions.symbol(),
    contract.functions.name(),
  ]);

  return {
    name,
    decimals,
    symbol,
    ...(!!imageUrl && { imageUrl }),
  };
};
