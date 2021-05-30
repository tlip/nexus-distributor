import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';

import { Box } from 'components/Box';
import { Flex } from 'components/Flex';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { OpportunityCard } from './scene/OpportunityCard';

import {
  useAsyncRates,
  useAsyncCapacities,
  useAsyncSignedQuote,
} from 'state/hooks';
import { Opportunity, OpportunityShell } from 'types/shared';
import { BigNumber } from '@ethersproject/bignumber';
import { fetchSignedQuote } from 'state/reducer';

const OpportunityListViewContainer = styled(Box)({
  width: 'clamp(100%, 100%, 100%)',
});

export const OpportunityListView: React.FC = () => {
  const [rates, fetchRates] = useAsyncRates();
  const [capacities, fetchCapacities] = useAsyncCapacities();
  const [siqnedQuote, fetchSignedQuote] = useAsyncSignedQuote();

  useEffect(() => {
    fetchRates();
    fetchCapacities();
    fetchSignedQuote('0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b');
  }, []);

  // console.log(siqnedQuote, 'SIGNED QUOTE');

  const ratesWithCosts = rates.map((rate) => {
    // find capacity data for contract
    const associatedCoverageData = capacities.find(
      (capacity) => capacity.contractAddress === rate.nexusAddress
    );
    return {
      ...(rate as OpportunityShell),
      // coverCost: associatedCoverageData?.coverCost,
      // capacity: {
      //   capacityETH: BigNumber.from(associatedCoverageData?.capacityETH || 0),
      //   capacityDAI: BigNumber.from(associatedCoverageData?.capacityDAI || 0),
      // },
    };
  });

  return (
    <OpportunityListViewContainer>
      <Text as="h1" variant="subhead">
        Protected Yields
      </Text>
      <Text as={Box} variant="caption1" my="1.675em">
        Lorem ipsum super fresh
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
        ></Card>
        <Card
          height={['unset', 'unset', 'unset', '4em']}
          width={['100%', '100%', '100%', 'calc(50% - 0.75em)']}
        ></Card>
      </Flex>
      {rates.length &&
        ratesWithCosts.map((opportunity: OpportunityShell) => (
          <OpportunityCard
            key={`${opportunity.displayName}-${opportunity.rawApr}`}
            {...{ opportunity }}
          />
        ))}
    </OpportunityListViewContainer>
  );
};
