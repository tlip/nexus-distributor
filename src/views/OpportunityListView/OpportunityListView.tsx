import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled/macro';
import { Label } from '@rebass/forms';
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
import { Input } from 'components/Input';

const OpportunityListViewContainer = styled(Box)({
  width: 'clamp(100%, 100%, 100%)',
});

protocols;

export const OpportunityListView: React.FC = () => {
  const [rates, fetchRates] = useAsyncRates();
  const [capacities, fetchCapacities] = useAsyncCapacities();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [filterCriteria, setFilterCriteria] = useState<{
    protocol?: string;
    token?: string;
  }>({});

  useEffect(() => {
    fetchRates();
    fetchCapacities();
  }, []);

  const ratesWithCosts = useMemo(() => {
    const filteredRates = rates
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
      )
      .filter(
        (rate) =>
          rate.underlyingAssets?.[0]?.symbol
            ?.toLowerCase()
            .includes(searchValue?.toLowerCase() ?? '') ||
          rate?.protocol?.name
            ?.toLowerCase()
            .includes(searchValue?.toLowerCase() ?? '') ||
          rate?.displayName
            ?.toLowerCase()
            .includes(searchValue?.toLowerCase() ?? '')
      );
    return filteredRates;
  }, [rates, capacities, filterCriteria, searchValue]);

  const availableTokens = useMemo(() => {
    return [
      ...Array.from(
        new Set(rates.map((rate) => rate.underlyingAssets?.[0]?.symbol))
      ),
    ];
  }, [rates]);

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <OpportunityListViewContainer>
      <Text as="h1" variant="subhead" pb="2em">
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
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="calc(50% - 0.5em)">
            <Label
              htmlFor="filter-protocols"
              height="0"
              width="0"
              sx={{ display: 'block', overflow: 'hidden' }}
            >
              Protocol
            </Label>
            <Input
              type="select"
              id="filter-protocols"
              defaultValue="All Protocols"
              onChange={(e: any) =>
                setFilterCriteria(
                  e.target.value !== 'All Protocols'
                    ? { ...filterCriteria, protocol: e.target.value }
                    : {}
                )
              }
            >
              <option value="All Protocols" key="All protocols">
                All Protocols
              </option>
              {Object.keys(protocols).map((key, index) => (
                <option key={key} value={index}>
                  {key}
                </option>
              ))}
            </Input>
          </Box>
          <Box width="calc(50% - 0.5em)">
            <Label
              htmlFor="filter-tokens"
              height="0"
              width="0"
              sx={{ display: 'block', overflow: 'hidden' }}
            >
              Token
            </Label>
            <Input
              type="select"
              id="filter-tokens"
              defaultValue="All Tokens"
              onChange={(e: any) =>
                setFilterCriteria(
                  e.target.value !== 'All Tokens'
                    ? { ...filterCriteria, token: e.target.value }
                    : {}
                )
              }
            >
              <option value="All Tokens" key="All tokens">
                All Tokens
              </option>
              {availableTokens.map((key, index) => (
                <option key={key} value={`${key}-${index}`}>
                  {key}
                </option>
              ))}
            </Input>
          </Box>
        </Flex>
        <Flex
          as={Card}
          height={['unset', 'unset', 'unset', '4em']}
          width={['100%', '100%', '100%', 'calc(50% - 0.75em)']}
          alignItems="center"
        >
          <Input
            placeholder="Search (E.g. 'Aave' or 'USDC)"
            onChange={(e: { target: { value: string } }) =>
              handleChange(e.target.value)
            }
          />
        </Flex>
      </Flex>

      {ratesWithCosts.length ? (
        ratesWithCosts.map((opportunity: Opportunity, index) => (
          <OpportunityCard key={index} opportunity={opportunity} />
        ))
      ) : (
        <Skeleton
          width="100%"
          height="109px"
          style={{ borderRadius: '20px', margin: '20px 0' }}
          count={10}
          key="skeleton"
        />
      )}
    </OpportunityListViewContainer>
  );
};
