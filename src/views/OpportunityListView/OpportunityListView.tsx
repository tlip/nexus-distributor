import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';

import { Box } from 'components/Box';
import { Flex } from 'components/Flex';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { OpportunityCard } from './scene/OpportunityCard';

import { useAsyncRates } from 'state/hooks';

const OpportunityListViewContainer = styled(Box)({
  width: 'clamp(100%, 100%, 100%)',
});

export const OpportunityListView: React.FC = () => {
  const [rates, fetchRates] = useAsyncRates();

  useEffect(() => {
    fetchRates();
  }, []);

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
        rates.map((opportunity) => <OpportunityCard {...{ opportunity }} />)}
    </OpportunityListViewContainer>
  );
};
