import { BigNumber } from 'ethers';

//  github.com/NexusMutual/static-data/blob/master/contracts-metadata/contracts.json

// ~Asset~
// id: string (address)
// symbol: string
//

// ~Opportunity~
// Protocol: string
// Name: string
// Underlying assets: [Assets]
// Yield Data
// Cover Data

// ~Yield Data~
// apr
// fixed/variable

// Cover Data
// Cost of Coverage
// Cover Capacity

export interface Protocol {
  name: string;
  executionUrl: string;
}

export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  imageUrl?: string;
}

export interface Opportunity {
  displayName: string;
  symbol: string;
  protocol: Protocol;
  opportunityAsset: Token;
  underlyingAssets?: string[];
  rawApr: BigNumber;
  active: boolean;
  capactity?: {
    capcityETH: BigNumber;
    capacityDAI: BigNumber;
  };
  associtatedCoverable: {
    dateAdded: Date;
    name: string;
    supportedChains: string[];
  };
  nexusAddress: string;
  coverCost?: number;
  imageUrl?: string;
  fixed: boolean;
}

export type OpportunityShell = Omit<Opportunity, 'capactity' | 'coverCost'>;
