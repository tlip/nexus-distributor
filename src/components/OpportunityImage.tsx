/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { ethers } from 'ethers';
import { Image } from 'rebass';
import { useThemeUI } from 'theme-ui';

export const OppoortunityImage: React.FC<{
  asset?: string;
  staticImageUrl?: string;
}> = ({ asset, staticImageUrl }) => {
  const { theme } = useThemeUI();
  const imageUrl = staticImageUrl
    ? staticImageUrl
    : `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${
        ethers.utils.isAddress(asset || '')
          ? ethers.utils.getAddress(asset || '0x0')
          : '0x0'
      }/logo.png`;

  return (
    <Image
      width={40}
      height={40}
      sx={{
        boxShadow: `0.1em 0.1em 0.4em 0.1em ${theme.colors?.border}`,
        borderRadius: 50,
      }}
      onError={(e) => {
        // Uses a fallback image when token image unavailable
        // TO DO: Move this to a local image
        //@ts-ignore
        e.target.src =
          'https://icons.getbootstrap.com/assets/icons/question-circle.svg';
      }}
      src={imageUrl}
    />
  );
};
