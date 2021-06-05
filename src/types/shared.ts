import { BigNumber } from 'ethers';

//  github.com/NexusMutual/static-data/blob/master/contracts-metadata/contracts.json

type CoverageType = 'protocol' | 'token';

interface Coverable {
  dateAdded: Date;
  name: string;
  type: CoverageType;
  supportedChains: string[];
}
export interface Protocol {
  name: string;
  executionUrl: string;
}

export interface Token {
  name?: string;
  symbol: string;
  decimals?: number;
  address: string;
  imageUrl?: string;
}

export interface ProtocolOption {
  associatedCoverable: Coverable;
  capacityDAI: BigNumber;
  capacityETH: BigNumber;
  contractAddress: string;
  coverCost: number;
  netStakedNxm: BigNumber;
}

export interface Opportunity {
  displayName: string;
  symbol: string;
  protocol: Protocol;
  opportunityAsset: Token;
  underlyingAssets?: Token[];
  rawApr: BigNumber;
  active: boolean;
  capacity?: {
    capacityETH: BigNumber;
    capacityDAI: BigNumber;
  };
  associatedCoverable: Coverable;
  nexusAddress: string;
  coverCost?: number;
  imageUrl?: string;
  fixed: boolean;
}

export type OpportunityShell = Omit<Opportunity, 'capacity' | 'coverCost'>;
