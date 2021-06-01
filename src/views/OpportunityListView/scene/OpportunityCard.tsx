/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { AccordionCard } from 'components/AccordionCard';
import { Flex } from 'components/Flex';
import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Opportunity } from 'types/shared';
import { Slider } from 'components/Slider';
import { Button } from 'components/Button';
import spinner from '../../../assets/images/spinner.svg';
import { useDistributor } from 'hooks/useDistributor';
import { OppoortunityImage } from 'components/OpportunityImage';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}) => {
  const [coverDuration, setCoverDuration] = React.useState<number>(365);
  const [coverAmount, setCoverAmount] = React.useState('1');
  const [loadingTx, setLoadingTx] = React.useState(false);
  const { buyCover } = useDistributor();
  const coverAvailable =
    +coverAmount < +(opportunity?.capacity?.capacityETH?.toString() || '0');

  return (
    <AccordionCard
      mb="2em"
      accordionChildren={
        <Flex width="100%" justifyContent="flex-between">
          <Box width="50%">
            <Box width="100%">
              <Text>What's covered:</Text>
              <ul>
                <li>Contract bugs</li>
                <li>Economic attacks, including oracle failures</li>
                <li>Governance attacks</li>
              </ul>
            </Box>
            <Box width="50%">
              <Text>Supported chains:</Text>
              <ul>
                {opportunity?.associtatedCoverable?.supportedChains?.map(
                  (chain) => (
                    <li key={chain}>{chain}</li>
                  )
                )}
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
            <input
              onChange={(e) => setCoverAmount(e.target.value)}
              value={coverAmount}
            />
            <Slider
              min={30}
              max={365}
              value={coverDuration}
              valueSuffix="DAYS"
              step={1}
              onChange={setCoverDuration}
            />
            <Button
              disabled={!coverAvailable}
              width="120px"
              onClick={async () => {
                setLoadingTx(true);
                try {
                  await buyCover(
                    opportunity.nexusAddress,
                    { period: coverDuration },
                    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                    coverAmount
                  );
                } finally {
                  setLoadingTx(false);
                }
              }}
            >
              {coverAvailable && !loadingTx ? (
                'Buy Cover'
              ) : loadingTx ? (
                <img src={spinner} width="20" height="20" />
              ) : (
                'Cover Unavailable'
              )}
            </Button>
          </Box>
        </Flex>
      }
    >
      <Box width="50%">
        <OppoortunityImage
          asset={opportunity?.underlyingAssets?.[0].address}
          protocol={opportunity.protocol.name}
          staticImageUrl={opportunity.opportunityAsset.imageUrl}
        />
        <Text>{opportunity.displayName}</Text>
        <Text>{opportunity.rawApr}</Text>
        <Text>{opportunity.coverCost}</Text>
        <br />
        {opportunity?.coverCost && (
          <Text>{+opportunity.rawApr - +opportunity?.coverCost}</Text>
        )}
      </Box>
    </AccordionCard>
  );
};
