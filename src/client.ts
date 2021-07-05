import axios from 'axios';
import { request, gql } from 'graphql-request';
import { Opportunity, OpportunityShell } from './types/shared';
import { protocols } from './constants/data';
import { getYearlyCost } from './utils/calculateYearlyCost';

const GRAPH_BASE_URL = 'https://api.thegraph.com/subgraphs/name';
const YEARN_BASE_URL = 'https://api.yearn.tools';
// ASK IN CURVE DISCORD FOR REAL API ENDPOINT
const CURVE_BASE_URL = 'https://curvemarketcap.com/datatable.json';

/*
 * GRAPHQL QUERIES
 */

const aaveQuery = gql`
  {
    reserves(first: 50) {
      # id is atoken address
      id
      name
      decimals
      liquidityRate
      liquidityIndex
      symbol
      isActive
      aToken {
        # underlying token address
        id
        underlyingAssetAddress
      }
    }
  }
`;

const compoundQuery = gql`
  {
    markets(first: 50) {
      # id is ctoken address
      id
      name
      supplyRate
      symbol
      underlyingName
      underlyingDecimals
      underlyingSymbol
      underlyingAddress
    }
  }
`;

// Fetch functions need to return Opportunity Skeleton
// That will be filled in via web3
export const fetchCompoundRates = async (): Promise<OpportunityShell[]> => {
  const { markets } = await request(
    `${GRAPH_BASE_URL}/graphprotocol/compound-v2`,
    compoundQuery
  );
  const opportunites: OpportunityShell[] = markets
    .map((market: any) => {
      return {
        protocol: protocols['compound'],
        displayName: `Compound ${market?.underlyingSymbol}`,
        symbol: market?.symbol,
        fixed: false,
        opportunityAsset: {
          symbol: market?.symbol,
          address: market?.id,
          // all ctokens have 18 decimals
          decimals: 18,
        },
        underlyingAssets: [
          {
            symbol: market?.underlyingSymbol,
            address: market?.underlyingAddress,
            decimals: market?.underlyingDecimals,
          },
        ],
        nexusAddress: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
        // Approximation for how much the compound supply rate undershoots the actual # of blocks per year
        rawApr: +(market?.supplyRate * 1.15 * 100).toFixed(2),
      };
    })
    .filter((m: any) => m?.rawApr > 0);
  return opportunites;
};

export const fetchCreamRates = async (): Promise<OpportunityShell[]> => {
  const { markets } = await request(
    `${GRAPH_BASE_URL}/creamfinancedev/cream-lending`,
    compoundQuery
  );
  const opportunites: OpportunityShell[] = markets
    .map((market: any) => {
      return {
        protocol: protocols['cream'],
        displayName: `Cream ${market.underlyingSymbol}`,
        symbol: market.symbol,
        fixed: false,
        opportunityAsset: {
          symbol: market?.symbol,
          address: market?.id,
          // all crtokens have 18 decimals
          decimals: 18,
        },
        underlyingAssets: [
          {
            symbol: market?.underlyingSymbol,
            address: market?.underlyingAddress,
            decimals: market?.underlyingDecimals,
          },
        ],
        coverType: 'protocol',
        nexusAddress: '0x3d5bc3c8d13dcb8bf317092d84783c2697ae9258',
        // Approximation for how much the cream supply rate undershoots the actual # of blocks per year
        // This is the same as Compound because Cream is a fork of Compound
        rawApr: +(market.supplyRate * 1.15 * 100).toFixed(2),
      };
    })
    .filter((m: any) => m.rawApr > 0);
  return opportunites;
};

export const fetchAaveRates = async (): Promise<OpportunityShell[]> => {
  const { reserves } = await request(
    `${GRAPH_BASE_URL}/aave/protocol-v2`,
    aaveQuery
  );
  const opportunites: OpportunityShell[] = reserves
    .filter((m: any) => !m?.symbol.includes('Amm'))
    .map((market: any) => {
      return {
        protocol: protocols['aave'],
        displayName: `Aave ${market.symbol}`,
        symbol: market.symbol,
        fixed: false,
        opportunityAsset: {
          address: market?.aToken?.id,
          name: `Aave ${market?.symbol}`,
          symbol: `a${market?.symbol}`,
          decimals: market?.decimals,
        },
        coverType: 'protocol',
        nexusAddress: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        underlyingAssets: [
          {
            address: market?.aToken.underlyingAssetAddress,
            symbol: market?.symbol,
            name: market?.name,
            decimals: market?.decimals,
          },
        ],
        // liquidity rate is expressed in ray (10e27) instead of wei (10e18)
        rawApr: +(market.liquidityRate / 10 ** 25).toFixed(2),
      };
    })
    .filter((m: any) => m.rawApr > 0);
  return opportunites;
};

export const fetchYearnRates = async (): Promise<OpportunityShell[]> => {
  const { data } = await axios.get(`${YEARN_BASE_URL}/vaults`, {
    params: {
      apy: true,
    },
  });
  const opportunites: OpportunityShell[] = data
    .filter((market: any) => market.apy)
    .map((market: any) => {
      return {
        protocol: protocols['yearn'],
        displayName: `${market?.name} Vault`,
        symbol: market?.symbol,
        fixed: false,
        opportunityAsset: {
          address: market?.address,
          symbol: market?.symbolAlias,
          decimals: market?.decimals,
          imageUrl: market?.vaultIcon,
        },
        underlyingAssets: [
          {
            address: market?.tokenAddress,
            name: market?.tokenName,
            Symbol: market?.tokenSYmbol,
          },
        ],
        coverType: 'token',
        nexusAddress: '0x9d25057e62939d3408406975ad75ffe834da4cdd',
        imageUrl: market?.vaultIcon,
        rawApr: +market?.apy?.apyOneMonthSample.toFixed(2),
      };
    })
    .filter((m: Opportunity) => +m.rawApr > 0)
    .filter((m: Opportunity) => ['yUSDC', 'yDAI'].includes(m.symbol));
  return opportunites;
};

export const fetchCurveRates = async (): Promise<OpportunityShell> => {
  const { data } = await axios.get(`${CURVE_BASE_URL}`);
  return data;
};

export const fetchCapacities = async (): Promise<any> => {
  const { data } = await axios.get('https://api.nexusmutual.io/v1/capacities');
  const { data: coverables } = await axios.get(
    'https://api.nexusmutual.io/coverables/contracts.json'
  );
  const capacityWithCost = data.map((capacity: any) => {
    const associatedCoverable =
      coverables[
        Object.keys(coverables).find(
          (coverable) =>
            coverable.toLowerCase() === capacity.contractAddress.toLowerCase()
        ) || '0x0'
      ];
    return {
      ...capacity,
      associatedCoverable,
      coverCost: getYearlyCost(capacity.netStakedNXM),
    };
  });
  return capacityWithCost;
};

export const fetchSignedQuote = async (
  coverAmount: number,
  currency: string,
  period: number,
  contractAddress: string
): Promise<any> => {
  // URL to request a quote for.
  const quoteURL =
    `https://api.staging.nexusmutual.io/legacy/v1/quote?` +
    `coverAmount=${coverAmount}&currency=${currency}&period=${period}&contractAddress=${contractAddress}`;
  const { data } = await axios.get(quoteURL);
  return data;
};

export const fetchAllRates = async (): Promise<OpportunityShell[]> => {
  const [compoundRates, aaveRates, yearnRates, creamRates] = await Promise.all([
    fetchCompoundRates(),
    fetchAaveRates(),
    fetchYearnRates(),
    fetchCreamRates(),
  ]);
  return [...compoundRates, ...aaveRates, ...yearnRates, ...creamRates].sort(
    (a, b) => +b.rawApr - +a.rawApr
  );
};
