import React from 'react';
import { AccordionCard } from 'components/AccordionCard';
import { Flex } from 'components/Flex';
import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { OpportunityShell } from 'types/shared';
import { Slider } from 'components/Slider';

interface OpportunityCardProps {
  opportunity: OpportunityShell;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}) => {
  const [coverDuration, setCoverDuration] = React.useState<number>(182);
  return (
    <AccordionCard
      mb="2em"
      accordionChildren={
        <Flex width="100%" justifyContent="flex-between">
          <Box width="50%">
            <Text>Sections</Text>
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
        <Text>{opportunity.displayName}</Text>
      </Box>
    </AccordionCard>
  );
};
