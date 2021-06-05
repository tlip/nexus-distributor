/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import styled from '@emotion/styled/macro';
import { Image } from 'rebass';
import { Box } from 'components/Box';
import { Text } from 'components/Text';

const ProtocolBadgeContainer = styled(Box)`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  text-transform: capitalize;
  border-radius: 4px;
`;

export const ProtocolBadge: React.FC<{ name: string }> = ({ name }) => {
  let protocolImage;

  try {
    protocolImage = require(`../../assets/images/${name}.png`)?.default;
  } catch {
    protocolImage =
      'https://icons.getbootstrap.com/assets/icons/question-circle.svg';
  }

  return (
    <ProtocolBadgeContainer
      backgroundColor="#dbdbdb"
      margin="10px"
      padding="10px"
    >
      <Image
        height={24}
        onError={() => {
          // Uses a fallback image when token image unavailable
          // TO DO: Move this to a local image
          //@ts-ignore
          e.target.src =
            'https://icons.getbootstrap.com/assets/icons/question-circle.svg';
        }}
        src={protocolImage}
      />
      <Text fontSize="12px" px="5px">
        {name}
      </Text>
    </ProtocolBadgeContainer>
  );
};
