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
  supportedAddresses?: string[];
}

export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
}

export interface Opportunity {
  displayName: string;
  symbol?: string;
  protocol: Protocol;
  opportunityAsset: Token;
  underlyingAssets: Token[];
  rawApr: BigNumber;
  active: boolean;
  capactity?: BigNumber;
  coverCost?: BigNumber;
  fixed: boolean;
}

type OpportunitySkeleton = Pick<
  Opportunity,
  'displayName' | 'fixed' | 'protocol' | 'active'
>;
