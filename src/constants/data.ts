import { Protocol } from 'types/shared';

export const protocols: { [key: string]: Protocol } = {
  aave: {
    name: 'aave',
    executionUrl: 'https://app.aave.com',
  },
  compound: {
    name: 'compound',
    executionUrl: 'https://app.compound.finance',
  },
  yearn: {
    name: 'yearn',
    executionUrl: 'https://yearn.finance/vaults',
  },
  cream: {
    name: 'cream',
    executionUrl: 'https://app.cream.finance',
  },
};
