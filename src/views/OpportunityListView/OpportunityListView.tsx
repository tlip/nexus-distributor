import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled/macro';
import { Label, Select } from '@rebass/forms';
import { BigNumber } from '@ethersproject/bignumber';
import Skeleton from 'react-loading-skeleton';

import { Box } from 'components/Box';
import { Flex } from 'components/Flex';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { OpportunityCard } from './scene/OpportunityCard';
import { useAsyncRates, useAsyncCapacities } from 'state/hooks';
import { Opportunity, OpportunityShell } from 'types/shared';
import { protocols } from 'constants/data';

const OpportunityListViewContainer = styled(Box)({
  width: 'clamp(100%, 100%, 100%)',
});

protocols;

export const OpportunityListView: React.FC = () => {
  const [rates, fetchRates] = useAsyncRates();
  const [capacities, fetchCapacities] = useAsyncCapacities();
  const [filterCriteria, setFilterCriteria] = useState<{
    protocol?: string;
    token?: string;
  }>({});

  useEffect(() => {
    fetchRates();
    fetchCapacities();
  }, []);

  const ratesWithCosts = useMemo(() => {
    return rates
      .map((rate) => {
        // find capacity data for contract
        const associatedCoverageData = capacities.find(
          (capacity) => capacity.contractAddress === rate.nexusAddress
        );
        return {
          ...(rate as OpportunityShell),
          coverCost: associatedCoverageData?.coverCost,
          capacity: {
            capacityETH: BigNumber.from(
              associatedCoverageData?.capacityETH || 0
            ),
            capacityDAI: BigNumber.from(
              associatedCoverageData?.capacityDAI || 0
            ),
          },
          associatedCoverable: associatedCoverageData?.associatedCoverable,
        };
      })
      .filter((rate) =>
        filterCriteria?.protocol
          ? filterCriteria?.protocol === rate.protocol.name
          : true
      )
      .filter((rate) =>
        filterCriteria?.token
          ? filterCriteria?.token === rate.underlyingAssets?.[0]?.symbol
          : true
      );
  }, [rates, capacities, filterCriteria]);

  const availableTokens = useMemo(() => {
    return [
      ...Array.from(
        new Set(rates.map((rate) => rate.underlyingAssets?.[0]?.symbol))
      ),
    ];
  }, [rates]);

  return (
    <OpportunityListViewContainer>
      <Text as="h1" variant="subhead">
        Protected Yields
      </Text>
      <Flex
        width="100%"
        mb="1.675em"
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent={[
          'flex-start',
          'flex-start',
          'flex-start',
          'space-between',
        ]}
      >
        <Flex
          as={Card}
          height={['unset', 'unset', 'unset', '4em']}
          width={['100%', '100%', '100%', 'calc(50% - 0.75em)']}
          mb={['1.675em', '1.675em', '1.675em', 0]}
        >
          <Box width="150px">
            <Label
              htmlFor="filter-protocols"
              height="0"
              width="0"
              sx={{ display: 'block', overflow: 'hidden' }}
            >
              Protocol
            </Label>
            <Select
              id="filter-protocols"
              defaultValue="All Protocols"
              onChange={(e) =>
                setFilterCriteria(
                  e.target.value !== 'All Protocols'
                    ? { ...filterCriteria, protocol: e.target.value }
                    : {}
                )
              }
            >
              <option value="All Protocols">All Protocols</option>
              {Object.keys(protocols).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </Box>
          <Box width="150px">
            <Label
              htmlFor="filter-tokens"
              height="0"
              width="0"
              sx={{ display: 'block', overflow: 'hidden' }}
            >
              Token
            </Label>
            <Select
              id="filter-tokens"
              defaultValue="All Tokens"
              onChange={(e) =>
                setFilterCriteria(
                  e.target.value !== 'All Tokens'
                    ? { ...filterCriteria, token: e.target.value }
                    : {}
                )
              }
            >
              <option value="All Tokens">All Tokens</option>
              {availableTokens.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
        <Card
          height={['unset', 'unset', 'unset', '4em']}
          width={['100%', '100%', '100%', 'calc(50% - 0.75em)']}
        ></Card>
      </Flex>
      {ratesWithCosts.length ? (
        ratesWithCosts.map((opportunity: Opportunity) => (
          <OpportunityCard
            key={`${opportunity.displayName}-${opportunity.rawApr}-${opportunity.opportunityAsset}`}
            opportunity={opportunity}
          />
        ))
      ) : (
        <Skeleton
          width="100%"
          height="109px"
          style={{ borderRadius: '20px', margin: '20px 0' }}
          count={10}
        />
      )}
    </OpportunityListViewContainer>
  );
};
