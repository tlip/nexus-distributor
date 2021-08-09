import React from 'react';
import styled from '@emotion/styled/macro';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { ethers } from 'ethers';
import { Link } from 'rebass';
import { AccordionCard } from 'components/AccordionCard';
import { Flex } from 'components/Flex';
import { Box } from 'components/Box';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { ProtocolOption } from 'types/shared';
import { Slider } from 'components/Slider';
import { Button } from 'components/Button';
import { BoxProps } from 'components/Box/Box';
import { ProtocolBadge } from 'components/ProtocolBadge';
import { ProtocolImage } from 'components/ProtocolImage';
import spinner from '../../../assets/images/spinner.svg';
import { useDistributor } from 'hooks/useDistributor';
import { LabeledToggle } from 'components/LabeledToggle';
import numeral from 'numeral';

const List = styled.ul`
  &&& {
    margin: 0;
    list-style: disc;
    margin-left: 1.25rem;
    font-
  }
`;

const ProtocolHeader: React.FC<{
  protocol: string;
  type: string;
  logo: string;
}> = ({ protocol, type, logo }) => (
  <Flex alignItems="center">
    <ProtocolImage variant="large" protocol={logo} mr="0.6em" useNexusImage />
    <Text variant="h3">{protocol[0].toUpperCase() + protocol.substr(1)}</Text>
    {type === 'protocol' && (
      <Box bg="blue" px="1em" py="0.8em" ml="1.2em" sx={{ borderRadius: 20 }}>
        <Text
          variant="caption1"
          color="white"
          fontSize="0.7em"
          lineHeight="0.5em"
          fontWeight="bold"
          sx={{ display: 'block' }}
        >
          PROTOCOL COVER
        </Text>
      </Box>
    )}
    {type === 'token' && (
      <Box bg="yellow" px="1em" py="0.7em" ml="1.2em" sx={{ borderRadius: 20 }}>
        <Text
          variant="caption1"
          color="white"
          fontSize="0.7em"
          lineHeight="0.5em"
          fontWeight="bold"
          sx={{ display: 'block' }}
        >
          YIELD TOKEN COVER
        </Text>
      </Box>
    )}
    {type === 'custodian' && (
      <Box bg="purple" px="1em" py="0.7em" ml="1.2em" sx={{ borderRadius: 20 }}>
        <Text
          variant="caption1"
          color="white"
          fontSize="0.7em"
          lineHeight="0.5em"
          fontWeight="bold"
          sx={{ display: 'block' }}
        >
          CUSTODY COVER
        </Text>
      </Box>
    )}
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

export const ProtocolCard: React.FC<{ protocol: ProtocolOption }> = ({
  protocol,
}) => {
  const [coverDuration, setCoverDuration] = React.useState<number>(365);
  const [coverAmount, setCoverAmount] = React.useState('1');
  const [loadingTx, setLoadingTx] = React.useState(false);
  const [coverCurrency, setCoverCurrency] = React.useState('ETH');
  const [, setPaymentCurrency] = React.useState(coverCurrency);
  const { buyCover } = useDistributor();
  const capacityEthDisplay = (+ethers.utils.formatEther(
    protocol?.capacityETH?.toString() || '0'
  )).toFixed(2);
  const capacityDaiDisplay = (+ethers.utils.formatEther(
    protocol?.capacityDAI?.toString() || '0'
  )).toFixed(2);
  const coverAvailable = +coverAmount < +capacityEthDisplay;
  const coverCost = (
    +coverAmount *
    ((protocol?.coverCost || 0) / 100) *
    (coverDuration / 365)
  ).toFixed(4);
  const coverageDetailLink =
    protocol.associatedCoverable.type === 'protocol'
      ? 'https://nexusmutual.io/pages/ProtocolCoverv1.0.pdf'
      : protocol.associatedCoverable.type === 'custodian'
      ? 'https://nexusmutual.io/pages/CustodyCoverWordingv1.0.pdf'
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
                {protocol?.associatedCoverable?.supportedChains?.map(
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
                  name={`buy-cover-${protocol?.associatedCoverable.name}`}
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
                      protocol?.contractAddress,
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
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
            width="100%"
            maxWidth={['100%', '100%', 'calc(100% - 300px)']}
            flexWrap="wrap"
          >
            <ProtocolHeader
              protocol={protocol.associatedCoverable.name}
              logo={protocol.associatedCoverable.logo}
              type={protocol.associatedCoverable.type}
            />

            <OpportunityStat title="Yearly cover cost" bold>
              {(protocol?.coverCost || 0).toFixed(2)}%
            </OpportunityStat>
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
    ></AccordionCard>
  );
};
