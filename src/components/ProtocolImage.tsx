/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Image, ImageProps } from 'components/Image/Image';

export interface ProtocolImageProps extends ImageProps {
  protocol: string;
  variant?: string;
  useNexusImage?: boolean;
}

export const ProtocolImage: React.FC<ProtocolImageProps> = ({
  protocol,
  useNexusImage = false,
  variant,
  sx,
  ...props
}) => {
  let protocolImage;

  try {
    if (useNexusImage)
      protocolImage = `https://api.nexusmutual.io/coverables/images/${protocol}`;
    protocolImage = require(`../assets/images/${protocol}-logo.svg`)?.default;
  } catch {
    // protocolImage =
    //   'https://icons.getbootstrap.com/assets/icons/question-circle.svg';
  }

  return (
    <Image
      width={variant === 'large' ? 40 : 20}
      height={variant === 'large' ? 40 : 20}
      maxWidth={variant === 'large' ? 40 : 20}
      maxHeight={variant === 'large' ? 40 : 20}
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
