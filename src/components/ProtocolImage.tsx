/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Image, ImageProps } from 'components/Image/Image';

export interface ProtocolImageProps extends ImageProps {
  protocol: string;
}

export const ProtocolImage: React.FC<ProtocolImageProps> = ({
  protocol,
  sx,
  ...props
}) => {
  let protocolImage;

  try {
    protocolImage = require(`../assets/images/${protocol}-logo.svg`)?.default;
  } catch {
    protocolImage =
      'https://icons.getbootstrap.com/assets/icons/question-circle.svg';
  }

  return (
    <Image
      width={20}
      height={20}
      maxWidth={20}
      maxHeight={20}
      bg="white"
      src={protocolImage}
      sx={{
        borderRadius: '100%',
        backgroundSize: 'cover',
        backgroundColor: 'white',
        ...sx,
      }}
      {...props}
    />
  );
};
