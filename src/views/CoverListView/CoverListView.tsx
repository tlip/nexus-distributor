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
            <Label>Cover Type</Label>
            {/* <Select
              defaultValue="All Tokens"
              // onChange={(e) =>
              //   setFilterCriteria(
              //     e.target.value !== 'All Tokens'
              //       ? { ...filterCriteria, token: e.target.value }
              //       : {}
              //   )
              // }
            >
              <option>All Tokens</option>
              {availableTokens.map((key) => (
                <option key={key}>{key}</option>
              ))}
            </Select> */}
          </Box>
        </Card>
        <Card
          height={['unset', 'unset', 'unset', '4em']}
          width={['100%', '100%', '100%', 'calc(50% - 0.75em)']}
        ></Card>
      </Flex>
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
