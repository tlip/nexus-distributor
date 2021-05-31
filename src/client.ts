import axios from 'axios';
import { request, gql } from 'graphql-request';
import { OpportunityShell } from './types/shared';
import { protocols } from './constants/data';
import { getYearlyCost } from './utils/calculateYearlyCost';

const GRAPH_BASE_URL = 'https://api.thegraph.com/subgraphs/name';
const BANCOR_BASE_URL = 'https://api-v2.bancor.network';
const YEARN_BASE_URL = 'https://dev-api.yearn.tools';
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
        displayName: `Compound ${market.symbol}`,
        symbol: market.symbol,
        fixed: false,
        opportunityAsset: {
          name: 'test',
          symbol: market.underlyingSymbol,
          address: market.underlyingAddress,
          decimals: 18,
        },
        underlyingAssets: [market.underlyingAddress],
        nexusAddress: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
        // Approximation for how much the compound supply rate undershoots the actual # of blocks per year
        rawApr: +(market.supplyRate * 1.15 * 100).toFixed(2),
      };
    })
    .filter((m: any) => m.rawApr > 0);
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
        displayName: `Cream ${market.symbol}`,
        symbol: market.symbol,
        fixed: false,
        opportunityAsset: {
          name: 'test',
          symbol: market.underlyingSymbol,
          address: market.underlyingAddress,
          decimals: 18,
        },
        underlyingAssets: [market.underlyingAddress],
        nexusAddress: '0x3d5BC3c8d13dcB8bF317092d84783c2697AE9258',
        // Approximation for how much the compound supply rate undershoots the actual # of blocks per year
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
          address: market.aToken.id,
          name: 'Aave Dai',
          symbol: 'aDai',
          decimals: 18,
        },
        nexusAddress: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        underlyingAssets: [market.aToken.underlyingAssetAddress],
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
        opportunityAsset: {},
        imageUrl: market?.vaultIcon,
        underlyingAssets: [market?.tokenAddress],
        rawApr: +market?.apy?.apyOneMonthSample.toFixed(2),
      };
    })
    .filter((m: any) => m.rawApr > 0);
  return opportunites;
};

export const fetchBancorRates = async (): Promise<OpportunityShell> => {
  const { data } = await axios.get(`${BANCOR_BASE_URL}/pools`);
  return data;
};

export const fetchCurveRates = async (): Promise<OpportunityShell> => {
  const { data } = await axios.get(`${CURVE_BASE_URL}`);
  return data;
};

export const fetchCapacities = async (): Promise<any> => {
  const { data } = await axios.get('https://api.nexusmutual.io/v1/capacities');
  const capacityWithCost = data.map((capacity: any) => {
    return {
      ...capacity,
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
    fetchCreamRates(),
  ]);
  return [...compoundRates, ...aaveRates, ...yearnRates, ...creamRates].sort(
    (a, b) => +b.rawApr - +a.rawApr
  );
};
