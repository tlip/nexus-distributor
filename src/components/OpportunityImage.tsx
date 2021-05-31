/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { ethers } from 'ethers';
import { Image } from 'rebass';
import axios from 'axios';

export const OppoortunityImage: React.FC<{
  protocol: string;
  asset?: string;
}> = ({ protocol, asset }) => {
  let protocolImage;
  try {
    protocolImage = require(`../assets/logos/${protocol}-logo.svg`)?.default;
  } catch {
    protocolImage = require(`../assets/logos/cream-logo.svg`)?.default;
  }
  const imageUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${
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
