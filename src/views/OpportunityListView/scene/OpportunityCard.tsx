/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { ethers } from 'ethers';
import { AccordionCard } from 'components/AccordionCard';
import { Flex } from 'components/Flex';
import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Opportunity } from 'types/shared';
import { Slider } from 'components/Slider';
import { theme } from 'theme';
import { Button } from 'components/Button';
import { useDistributor } from 'hooks/useDistributor';
import { OppoortunityImage } from 'components/OpportunityImage';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}) => {
  const [coverDuration, setCoverDuration] = React.useState<number>(365);
  const { buyCover } = useDistributor();

  return (
    <AccordionCard
      mb="2em"
      accordionChildren={
        <Flex width="100%" justifyContent="flex-between">
          <Box width="50%">
            <Box width="50%">
              <Text>What's covered:</Text>
              <ul>
                <li>Contract bugs</li>
                <li>Economic attacks, including oracle failures</li>
                <li>Governance attacks</li>
              </ul>
            </Box>
          </Box>
          <Box
            width="50%"
            bg="tertiary"
            py="1.5em"
            px="1.75em"
            sx={{ borderRadius: 'large' }}
          >
            <Slider
              min={30}
              max={365}
              value={coverDuration}
              valueSuffix="DAYS"
              step={1}
              onChange={setCoverDuration}
            />
          </Box>
        </Flex>
      }
    >
      <Box width="50%">
        <OppoortunityImage
          asset={opportunity?.underlyingAssets?.[0]}
          protocol={opportunity.protocol.name}
        />
        <Text>{opportunity.displayName}</Text>
        <Text>{opportunity.rawApr}</Text>
        <Text>{opportunity.coverCost}</Text>
        <br />
        {opportunity?.coverCost && (
          <Text>{+opportunity.rawApr - +opportunity?.coverCost}</Text>
        )}
        <Button
          onClick={() =>
            buyCover(
              opportunity.nexusAddress,
              { period: 111 },
              '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
              '1'
            )
          }
        >
          Buy Cover
        </Button>
      </Box>
    </AccordionCard>
  );
};
