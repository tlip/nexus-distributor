import Decimal from 'decimal.js-light';
import { ethers, BigNumber } from 'ethers';
// import { parseUnits, BigNumber } from '@ethersproject/units';

const max = (a: Decimal, b: Decimal) => (a.gt(b) ? a : b);

const DAYS_PER_YEAR = new Decimal('365.25');
const SURPLUS = 0.3; // 30%
const COVER_PRICE_SURPLUS_MARGIN = new Decimal(SURPLUS);

export const calculateRisk = (netStakedNxm: Decimal): Decimal => {
  const STAKED_HIGH_RISK_COST = new Decimal(100);
  const LOW_RISK_COST_LIMIT_NXM = new Decimal(50000).mul('1e18');
  const PRICING_EXPONENT = new Decimal(7);
  const STAKED_LOW_RISK_COST = new Decimal(2);
  // uncappedRiskCost = stakedHighRiskCost * [1 - netStakedNXM/lowRiskCostLimit ^ (1/pricingExponent) ];
  const exponent = new Decimal(1).div(PRICING_EXPONENT);
  const uncappedRiskCost = STAKED_HIGH_RISK_COST.mul(
    new Decimal(1).sub(netStakedNxm.div(LOW_RISK_COST_LIMIT_NXM).pow(exponent))
  );

  return max(STAKED_LOW_RISK_COST, uncappedRiskCost);
};

export const calculatePrice = (
  coverAmount: string,
  netStakedNxm: string,
  coverPeriod: number
): BigNumber => {
  const coverAmountDecimal = new Decimal(coverAmount || '0');
  const netStakedNxmDecimal = new Decimal(netStakedNxm);
  const coverPeriodDecimal = new Decimal(coverPeriod || '0');
  const surplusMultiplier = COVER_PRICE_SURPLUS_MARGIN.add(1);
  const risk = calculateRisk(netStakedNxmDecimal);
  const pricePerDay = coverAmountDecimal
    .mul(risk)
    .div(new Decimal('100'))
    .mul(surplusMultiplier)
    .div(DAYS_PER_YEAR);

  return ethers.utils.parseUnits(
    pricePerDay.mul(coverPeriodDecimal).toFixed(18),
    18
  );
};

export const getYearlyCost = (netStaked: string): number => {
  return (
    calculateRisk(
      // If netStaked starts with - it's a quote-api calcualtion error.
      // Prevent crashes by assuming that netStaked is 0 in this case.
      netStaked.startsWith('-') ? new Decimal('0') : new Decimal(netStaked)
    ).toNumber() *
    (1 + SURPLUS)
  );
};
