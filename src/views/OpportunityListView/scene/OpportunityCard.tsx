/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import styled from '@emotion/styled/macro';
import { Link, Image } from 'rebass';
import { useThemeUI } from 'theme-ui';
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
import { ethers } from 'ethers';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const ProtocolBadgeContainer = styled(Box)`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  text-transform: capitalize;
  border-radius: 4px;
`;

const List = styled.ul`
  margin: 0;
`;

const ProtocolBadge: React.FC<{ name: string }> = ({ name }) => {
  let protocolImage;

  try {
    protocolImage = require(`../../../assets/images/${name}.png`)?.default;
  } catch {
    protocolImage =
      'https://icons.getbootstrap.com/assets/icons/question-circle.svg';
  }

  return (
    <ProtocolBadgeContainer
      width="160px"
      backgroundColor="#dbdbdb"
      margin="10px"
      padding="10px"
    >
      <Image
        height={24}
        onError={(e) => {
          // Uses a fallback image when token image unavailable
          // TO DO: Move this to a local image
          //@ts-ignore
          e.target.src =
            'https://icons.getbootstrap.com/assets/icons/question-circle.svg';
        }}
        src={protocolImage}
      />
      <Text>{name}</Text>
    </ProtocolBadgeContainer>
  );
};

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}) => {
  const [coverDuration, setCoverDuration] = React.useState<number>(365);
  const [coverAmount, setCoverAmount] = React.useState('1');
  const [loadingTx, setLoadingTx] = React.useState(false);
  const { buyCover } = useDistributor();
  const capacityEthDisplay = (+ethers.utils.formatEther(
    opportunity?.capacity?.capacityETH?.toString() || '0'
  )).toFixed(2);
  const capacityDaiDisplay = (+ethers.utils.formatEther(
    opportunity?.capacity?.capacityDAI?.toString() || '0'
  )).toFixed(2);
  const coverAvailable = +coverAmount < +capacityEthDisplay;

  return (
    <AccordionCard
      mb="2em"
      accordionChildren={
        <Flex width="100%" justifyContent="flex-between">
          <Box width="50%">
            <Box width="90%">
              <Text fontSize="14px">What's covered:</Text>
              <List>
                <li>
                  <Text fontSize="14px">Contract bug</Text>
                </li>
                <li>
                  <Text fontSize="14px">
                    Economic attacks, including oracle failures
                  </Text>
                </li>
                <li>
                  <Text fontSize="14px">Governance attacks</Text>
                </li>
              </List>
              <br />
              <Text fontSize="14px" sx={{ display: 'block' }}>
                Supported chains:
              </Text>
              <div>
                {opportunity?.associtatedCoverable?.supportedChains?.map(
                  (chain) => (
                    <ProtocolBadge key={chain} name={chain} />
                  )
                )}
              </div>
              <br />
              <Text fontSize="14px">Claiming:</Text>
              <List>
                <li>
                  <Text fontSize="14px">
                    You must provide proof of the incurred loss at claim time.
                  </Text>
                </li>
                <li>
                  <Text fontSize="14px">
                    You should wait 72 hours after the event, so assessors have
                    all details to make a decision.
                  </Text>
                </li>
                <li>
                  <Text fontSize="14px">
                    You can claim up to 35 days after the cover period expires,
                    given your cover was active when the incident happened.
                  </Text>
                </li>
              </List>
              <Link
                href="https://nexusmutual.io/pages/ProtocolCoverv1.0.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read full details here
              </Link>
            </Box>
          </Box>
          <Box
            width="50%"
            bg="tertiary"
            py="1.5em"
            px="1.75em"
            sx={{ borderRadius: 'large' }}
          >
            <Text>
              Capacity{' '}
              <strong>
                {capacityEthDisplay} ETH / DAI {capacityDaiDisplay}
              </strong>
            </Text>
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
              width="180px"
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
