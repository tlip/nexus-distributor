import axios from 'axios';
import { request, gql } from 'graphql-request';
import { OpportunityShell, Protocol } from './types/shared';
import { protocols } from './constants/data';
import { symbol } from 'd3-shape';

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
      symbol
      isActive
      aToken {
        # underlying token address
        id
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
  const rates: OpportunityShell[] = markets.map((market: any) => {
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
      underlyingAssets: [
        {
          name: 'test',
          symbol: market.underlyingSymbol,
          address: market.underlyingAddress,
          decimals: 18,
        },
      ],
      rawApr: market.supplyRate,
    };
  });
  return rates;
};

export const fetchAaveRates = async (): Promise<OpportunityShell[]> => {
  const { reserves } = await request(
    `${GRAPH_BASE_URL}/aave/protocol`,
    aaveQuery
  );
  const rates: OpportunityShell[] = reserves.map((market: any) => {
    return {
      protocol: protocols['aave'],
      displayName: `Aave ${market.symbol}`,
      symbol: market.symbol,
      fixed: false,
      opportunityAsset: {
        name: 'Aave Dai',
        symbol: 'aDai',
        address: market.id,
        decimals: 18,
      },
      underlyingAssets: [
        {
          name: 'test Dai',
          symbol: 'dai',
          address: market.aToken.id,
          decimals: 18,
        },
      ],
      rawApr: market.liquidityRate,
    };
  });
  return rates;
};

export const fetchYearnRates = async (): Promise<OpportunityShell> => {
  const { data } = await axios.get(`${YEARN_BASE_URL}/vaults`, {
    params: {
      apy: true,
    },
  });
  const opportunities: OpportunityShell[] = data.map((market: any) => {
    return {
      protocol: protocols['yearn'],
      displayName: market.name,
      symbol: market.symbol,
      fixed: false,
      opportunityAsset: {
        name: 'Aave Dai',
        symbol: 'aDai',
        address: market.id,
        decimals: 18,
      },
      underlyingAssets: [
        {
          name: 'test Dai',
          symbol: 'dai',
          address: market.aToken.id,
          decimals: 18,
        },
      ],
      rawApr: market.liquidityRate,
    };
  });
  return data;
};

export const fetchBancorRates = async (): Promise<OpportunityShell> => {
  const { data } = await axios.get(`${BANCOR_BASE_URL}/pools`);
  return data;
};

export const fetchCurveRates = async (): Promise<OpportunityShell> => {
  const { data } = await axios.get(`${CURVE_BASE_URL}`);
  return data;
};

export const fetchAllRates = async (): Promise<any> => {
  const allRates = await Promise.all([
    fetchCompoundRates(),
    fetchAaveRates(),
    fetchBancorRates(),
    fetchYearnRates(),
    fetchCurveRates(),
  ]);
  return allRates;
};
