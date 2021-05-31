/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { ethers } from 'ethers';
import { Image } from 'rebass';

export const OppoortunityImage: React.FC<{
  protocol: string;
  asset?: string;
  staticImageUrl?: string;
}> = ({ protocol, asset, staticImageUrl }) => {
  let protocolImage;

  try {
    protocolImage = require(`../assets/logos/${protocol}-logo.svg`)?.default;
  } catch {
    protocolImage =
      'https://icons.getbootstrap.com/assets/icons/question-circle.svg';
  }
  const imageUrl = staticImageUrl
    ? staticImageUrl
    : `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${
        ethers.utils.isAddress(asset || '')
          ? ethers.utils.getAddress(asset || '0x0')
          : '0x0'
      }/logo.png`;

  return (
    <>
      <Image
        width={36}
        height={36}
        sx={{
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
      <Image
        width={20}
        src={protocolImage}
        sx={{
          borderRadius: 50,
        }}
        style={{
          marginLeft: '-0.5rem',
          marginTop: '0.5rem',
          background: 'white',
        }}
      />
    </>
  );
};
