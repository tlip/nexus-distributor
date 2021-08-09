import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { Label } from '@rebass/forms';
import Skeleton from 'react-loading-skeleton';

import { Box } from 'components/Box';
import { Flex } from 'components/Flex';
import { Card } from 'components/Card';
import { Text } from 'components/Text';
import { useAsyncCapacities } from 'state/hooks';
import { ProtocolOption } from 'types/shared';
import { ProtocolCard } from './scene/ProtocolCard';

const CoverListViewContainer = styled(Box)({
  width: 'clamp(100%, 100%, 100%)',
});

export const CoverListView: React.FC = () => {
  const [capacities, fetchCapacities] = useAsyncCapacities();

  useEffect(() => {
    fetchCapacities();
  }, []);

  return (
    <CoverListViewContainer>
      <Text as="h1" variant="subhead" sx={{ marginBottom: '32px' }}>
        All Cover Options
      </Text>
      {capacities.length ? (
        capacities.map((protocol: ProtocolOption) => (
          <ProtocolCard protocol={protocol} key={protocol?.contractAddress} />
        ))
      ) : (
        <Skeleton
          width="100%"
          height="109px"
          style={{ borderRadius: '20px', margin: '20px 0' }}
          count={10}
        />
      )}
    </CoverListViewContainer>
  );
};
