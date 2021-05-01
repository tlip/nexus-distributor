import axios from 'axios';
import { request, gql } from 'graphql-request';

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
export const fetchCompoundRates = async (): Promise<any[]> => {
  const { markets } = await request(
    `${GRAPH_BASE_URL}/graphprotocol/compound-v2`,
    compoundQuery
  );
  const rates = markets.map((market: any) => ({
    protocol: 'compound',
    token: market.underlyingSymbol,
    // rate: new BN(market.supplyRate).times(100),
  }));
  return rates;
};

export const fetchAaveRates = async (): Promise<any[]> => {
  const { reserves } = await request(
    `${GRAPH_BASE_URL}/aave/protocol`,
    aaveQuery
  );
  const rates = reserves.map((market: any) => ({
    protocol: 'aave',
    token: market.symbol,
    // rate: new BN(market.liquidityRate).times(100),
  }));
  return rates;
};

export const fetchYearnRates = async (): Promise<any> => {
  const response = await axios.get(`${YEARN_BASE_URL}/vaults`, {
    params: {
      apy: true,
    },
  });
  return response;
};

export const fetchBancorRates = async (): Promise<any[]> => {
  const { data } = await axios.get(`${BANCOR_BASE_URL}/pools`);
  return data;
};

export const fetchCurveRates = async (): Promise<any> => {
  const response = await axios.get(`${CURVE_BASE_URL}`);
  return response;
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
