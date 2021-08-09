/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import styled from '@emotion/styled/macro';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Link, Image } from 'rebass';
import { AccordionCard } from 'components/AccordionCard';
import { Flex } from 'components/Flex';
import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Opportunity } from 'types/shared';
import { Slider } from 'components/Slider';
import { Button } from 'components/Button';
import spinner from '../../../assets/images/spinner.svg';
import ShareSVG from 'assets/icons/share-icon.svg';
import { useDistributor } from 'hooks/useDistributor';
import { OppoortunityImage } from 'components/OpportunityImage';
import { ethers } from 'ethers';
import { ProtocolImage } from 'components/ProtocolImage';
import { BoxProps } from 'components/Box/Box';
import { Input } from 'components/Input';
import { LabeledToggle } from 'components/LabeledToggle';
import { ProtocolBadge } from 'components/ProtocolBadge';
import numeral from 'numeral';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const List = styled.ul`
  margin: 0;
  margin-left: 1.25rem;
`;

const ProtocolHeader: React.FC<{
  protocol: string;
  type: Opportunity['coverType'];
}> = ({ protocol, type }) => (
  <Flex alignItems="center">
    <ProtocolImage protocol={protocol} mr="0.6em" />
    <Text variant="caption1">
      {protocol[0].toUpperCase() + protocol.substr(1)}
    </Text>
    {type === 'protocol' && (
      <Box bg="blue" px="0.6em" py="0.4em" ml="0.6em" sx={{ borderRadius: 20 }}>
        <Text
          variant="caption1"
          color="white"
          fontSize="0.5em"
          lineHeight="0.5em"
          fontWeight="bold"
          sx={{ display: 'block' }}
        >
          PROTOCOL COVER
        </Text>
      </Box>
    )}
    {type === 'token' && (
      <Box
        bg="yellow"
        px="0.6em"
        py="0.4em"
        ml="0.6em"
        sx={{ borderRadius: 20 }}
      >
        <Text
          variant="caption1"
          color="white"
          fontSize="0.5em"
          lineHeight="0.5em"
          fontWeight="bold"
          sx={{ display: 'block' }}
        >
          YIELD TOKEN COVER
        </Text>
      </Box>
    )}

    <Box bg="border" px="0.6em" py="0.4em" ml="0.6em" sx={{ borderRadius: 20 }}>
      <Text
        variant="caption1"
        color="text"
        fontSize="0.5em"
        lineHeight="0.5em"
        fontWeight="bold"
        sx={{ display: 'block' }}
      >
        VARIABLE YIELD RATE
      </Text>
    </Box>
  </Flex>
);

const OpportunityStat: React.FC<
  BoxProps & {
    title: string;
    bold?: boolean;
  }
> = ({ title, bold, color, children, ...props }) => (
  <Flex
    flexDirection="column"
    justifyContent="space-around"
    alignItems="flex-start"
    {...props}
  >
    <Text variant="caption1" color="textLight" fontWeight="semibold">
      {title}
    </Text>
    <Text
      variant="h3"
      fontWeight={bold ? 'bold' : 'semibold'}
      color={color || 'text'}
    >
      {children}
    </Text>
  </Flex>
);

const OpportunityTitle: React.FC<{ opportunity: Opportunity }> = ({
  opportunity,
}) => (
  <Flex alignItems="center" mt="1em">
    <OppoortunityImage
      asset={opportunity?.underlyingAssets?.[0].address}
      staticImageUrl={opportunity.opportunityAsset.imageUrl}
    />
    <OpportunityStat title={opportunity.displayName} ml="1em">
      {opportunity.opportunityAsset.symbol}
    </OpportunityStat>
  </Flex>
);

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}) => {
  const [coverDuration, setCoverDuration] = React.useState<number>(365);
  const [coverAmount, setCoverAmount] = React.useState('1');
  const [coverCurrency, setCoverCurrency] = React.useState('ETH');
  const [, setPaymentCurrency] = React.useState(coverCurrency);
  const [loadingTx, setLoadingTx] = React.useState(false);
  const { buyCover } = useDistributor();
  const capacityEthDisplay = (+ethers.utils.formatEther(
    opportunity?.capacity?.capacityETH?.toString() || '0'
  )).toFixed(0);
  const capacityDaiDisplay = (+ethers.utils.formatEther(
    opportunity?.capacity?.capacityDAI?.toString() || '0'
  )).toFixed(0);
  const coverAvailable = +coverAmount < +capacityEthDisplay;
  const coverCost = (
    +coverAmount *
    ((opportunity?.coverCost || 0) / 100) *
    (coverDuration / 365)
  ).toFixed(4);
  const coverageDetailLink =
    opportunity.coverType === 'protocol'
      ? 'https://nexusmutual.io/pages/ProtocolCoverv1.0.pdf'
      : 'https://nexusmutual.io/pages/YieldTokenCoverv1.0.pdf';

  return (
    <AccordionCard
      mb="2em"
      accordionChildren={
        <Flex
          width="100%"
          justifyContent={['flex-start', 'flex-start', 'flex-between']}
          flexDirection={['column-reverse', 'column-reverse', 'row']}
          alignItems="center"
        >
          <Box width={['100%', '100%', '50%']}>
            <Box width="90%">
              <Text variant="h6" color="textGray">
                What's covered:
              </Text>
              {opportunity.coverType === 'protocol' ? (
                <List className="list-disc">
                  <li>
                    <Text variant="caption" fontSize="14px">
                      Contract bugs
                    </Text>
                  </li>
                  <li>
                    <Text variant="caption" fontSize="14px">
                      Economic attacks, including oracle failures
                    </Text>
                  </li>
                  <li>
                    <Text variant="caption" fontSize="14px">
                      Governance attacks
                    </Text>
                  </li>
                </List>
              ) : (
                <List className="list-disc">
                  <li>
                    <Text variant="caption" fontSize="14px">
                      Token de-pegging of more than 10% for any reason
                    </Text>
                  </li>
                </List>
              )}
              <br />
              <Text
                variant="h6"
                color="textGray"
                fontSize="14px"
                sx={{ display: 'block' }}
              >
                Supported chains:
              </Text>
              <div>
                {opportunity?.associatedCoverable?.supportedChains?.map(
                  (chain) => (
                    <ProtocolBadge key={chain} name={chain} />
                  )
                )}
              </div>
              <br />
              <Text fontSize="14px" variant="h6" color="textGray">
                Claiming:
              </Text>
              <List className="list-disc">
                <li>
                  <Text fontSize="14px" variant="caption">
                    You must provide proof of the incurred loss at claim time.
                  </Text>
                </li>
                <li>
                  <Text fontSize="14px" variant="caption">
                    You should wait 72 hours after the event, so assessors have
                    all details to make a decision.
                  </Text>
                </li>
                <li>
                  <Text fontSize="14px" variant="caption">
                    You can claim up to 35 days after the cover period expires,
                    given your cover was active when the incident happened.
                  </Text>
                </li>
              </List>
              <Link
                href={coverageDetailLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  paddingLeft: '20px',
                  fontSize: '14px',
                  marginTop: '12px',
                  display: 'block',
                  fontWeight: 'bold',
                }}
              >
                Read full details here{' '}
                <ExternalLinkIcon
                  className="h-4 w-4 inline"
                  aria-hidden="true"
                />
              </Link>
            </Box>
          </Box>
          <Box
            width={['100%', '100%', '50%']}
            bg="tertiary"
            py="1.5em"
            px="1.75em"
            mb={['1.25em', '1.25em', 0]}
            sx={{
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 'large',
            }}
          >
            <Text variant="h5" color="textGray" pb="1.25em">
              Coverage Quote{' '}
            </Text>
            <Text
              variant="caption1"
              fontWeight="semibold"
              sx={{ letterSpacing: '0%' }}
            >
              Capacity{' '}
              <strong>
                {numeral(capacityEthDisplay).format('0,0.00')} ETH /{' '}
                {numeral(capacityDaiDisplay).format('0,0.00')} DAI
              </strong>
            </Text>
            <Flex
              mt="1.25em"
              mb="0.5em"
              width="100%"
              justifyContent={['flex-start', 'flex-start', 'space-between']}
              alignItems={['flex-start', 'flex-start', 'center']}
              flexDirection={['column', 'column', 'row']}
            >
              <Flex
                alignItems="center"
                width={['100%', '100%', 'calc(70% - 0.75em)']}
                mb={['1.25em', '1.25em', 0]}
              >
                <Box>
                  <Text
                    variant="caption1"
                    fontWeight="semibold"
                    mr="1em"
                    sx={{ letterSpacing: '0%', whiteSpace: 'nowrap' }}
                  >
                    Amount covered
                  </Text>
                </Box>
                <Flex>
                  <Input
                    onChange={(e: any) => setCoverAmount(e.target.value)}
                    value={coverAmount}
                    width="calc(100% - 60px)"
                    maxWidth="68px"
                    style={{
                      borderRadius: '0.5em 0 0 0.5em',
                      transform: 'translateX(1px)',
                    }}
                  />
                  <Input
                    type="select"
                    defaultValue="ETH"
                    width="60px"
                    style={{
                      borderRadius: '0 0.5em 0.5em 0',
                    }}
                    onChange={(e: any) => setCoverCurrency(e.target?.value)}
                  >
                    <option value="ETH" key="ETH">
                      ETH
                    </option>
                    <option value="DAI" key="DAI">
                      DAI
                    </option>
                  </Input>
                </Flex>
              </Flex>
              <Flex mb={['0.5em', '0.5em', 0]}>
                <Box>
                  <Text
                    variant="caption1"
                    fontWeight="semibold"
                    mr="1em"
                    sx={{ letterSpacing: '0%', whiteSpace: 'nowrap' }}
                  >
                    Buy with
                  </Text>
                </Box>
                <LabeledToggle
                  name={`buy-cover-${opportunity?.displayName}`}
                  options={[
                    { value: coverCurrency, label: coverCurrency },
                    { value: 'NXM', label: 'NXM' },
                  ]}
                  defaultValue={coverCurrency}
                  value={coverCurrency}
                  onChange={(e: any) => setPaymentCurrency(e.target?.value)}
                />
              </Flex>
            </Flex>
            <Slider
              min={30}
              max={365}
              value={coverDuration}
              valueSuffix="DAYS"
              step={1}
              onChange={setCoverDuration}
              mt="1.25em"
            />
            <Flex
              width="100%"
              mt="1.25em"
              justifyContent={['flex-start', 'flex-start', 'space-between']}
              alignItems={['flex-start', 'flex-start', 'center']}
              flexDirection={['column', 'column', 'row']}
            >
              <Text
                variant="caption1"
                fontWeight="semibold"
                sx={{ letterSpacing: '0%' }}
              >
                Cost to cover{' '}
                <strong>
                  {coverAmount} {coverCurrency}
                </strong>{' '}
                for <strong>{coverDuration} days</strong>
              </Text>
              <Text sx={{ color: 'primary', fontSize: 7, fontWeight: 'bold' }}>
                {coverCost} {coverCurrency}
              </Text>
            </Flex>
            <Flex width="100%" justifyContent="center">
              <Button
                disabled={!coverAvailable}
                width="180px"
                mt="1.25em"
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
            </Flex>
          </Box>
        </Flex>
      }
      //@ts-ignore
      render={({
        expanded,
        setExpanded,
      }: {
        setExpanded?: (expanded: boolean) => void;
        expanded?: boolean;
      }) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          flexWrap="wrap"
        >
          <Flex
            flexDirection="column"
            justifyContent="space-around"
            alignItems="flex-start"
            width="100%"
            maxWidth={['100%', '100%', 'calc(100% - 300px)']}
            flexWrap="wrap"
          >
            <ProtocolHeader
              protocol={opportunity.protocol.name}
              type={opportunity.coverType}
            />
            <Flex flexWrap="wrap" justifyContent="space-between" width="100%">
              <OpportunityTitle {...{ opportunity }} />
              <Flex
                mt="1em"
                minWidth="375px"
                maxWidth={['100%', '100%', 'calc(100% - 300px)']}
              >
                <OpportunityStat title="Base yield" bold>
                  {(+opportunity?.rawApr || 0)?.toFixed(2)}%
                </OpportunityStat>
                <OpportunityStat
                  mx={['1.5em', '1.5em', '3em']}
                  title="Yearly cover cost"
                  bold
                >
                  {(opportunity?.coverCost || 0).toFixed(2)}%
                </OpportunityStat>
                <OpportunityStat title="Protected yield" bold color="primary">
                  {(
                    (+opportunity?.rawApr || 0) - (opportunity?.coverCost || 0)
                  ).toFixed(2)}
                  %
                </OpportunityStat>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="space-around"
            alignItems="flex-start"
            height="5.125em"
            mt={['1em', '1em', 0]}
            width={['100%', '100%', '200px']}
            sx={{ transform: 'translateY(0.5em)' }}
          >
            <Button variant="outline" mb="0.4em" width="100%">
              <Image src={ShareSVG} mr="0.4em" />
              View Opportunity
            </Button>
            <Button
              onClick={() => setExpanded?.(!expanded)}
              mb="0.4em"
              width="100%"
            >
              {expanded ? 'Hide' : 'Show'} Cover Details
            </Button>
          </Flex>
        </Flex>
      )}
    />
  );
};
