import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled/macro';
import { Label, Select } from '@rebass/forms';

import { Box } from 'components/Box';
import { Flex } from 'components/Flex';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { OpportunityCard } from './scene/OpportunityCard';

import { useAsyncRates, useAsyncCapacities } from 'state/hooks';
import { Opportunity, OpportunityShell } from 'types/shared';
import { protocols } from 'constants/data';
import { BigNumber } from '@ethersproject/bignumber';

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
          associtatedCoverable: associatedCoverageData?.associatedCoverable,
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

  console.log(ratesWithCosts);

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
        <Card
          height={['unset', 'unset', 'unset', '4em']}
          width={['100%', '100%', '100%', 'calc(50% - 0.75em)']}
          mb={['1.675em', '1.675em', '1.675em', 0]}
        >
          <Box width="150px">
            <Label>Protocol</Label>
            <Select
              defaultValue="All Protocols"
              onChange={(e) =>
                setFilterCriteria(
                  e.target.value !== 'All Protocols'
                    ? { ...filterCriteria, protocol: e.target.value }
                    : {}
                )
              }
            >
              <option>All Protocols</option>
              {Object.keys(protocols).map((key) => (
                <option key={key}>{key}</option>
              ))}
            </Select>
          </Box>
          <Box width="150px">
            <Label>Token</Label>
            <Select
              defaultValue="All Tokens"
              onChange={(e) =>
                setFilterCriteria(
                  e.target.value !== 'All Tokens'
                    ? { ...filterCriteria, token: e.target.value }
                    : {}
                )
              }
            >
              <option>All Tokens</option>
              {availableTokens.map((key) => (
                <option key={key}>{key}</option>
              ))}
            </Select>
          </Box>
        </Card>
        <Card
          height={['unset', 'unset', 'unset', '4em']}
          width={['100%', '100%', '100%', 'calc(50% - 0.75em)']}
        ></Card>
      </Flex>
      {rates.length &&
        ratesWithCosts.map((opportunity: Opportunity) => (
          <OpportunityCard
            key={`${opportunity.displayName}-${opportunity.rawApr}`}
            opportunity={opportunity}
          />
        ))}
    </OpportunityListViewContainer>
  );
};
