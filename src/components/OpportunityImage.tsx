/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { ethers } from 'ethers';
import { Image } from 'rebass';

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

  return (
    <>
      <Image
        width={36}
        height={36}
        sx={{
          borderRadius: 50,
        }}
        src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${
          ethers.utils.isAddress(asset || '')
            ? ethers.utils.getAddress(asset || '0x0')
            : '0x0'
        }/logo.png`}
      />
      <Image
        width={20}
        src={protocolImage}
        sx={{
          borderRadius: 50,
        }}
        style={{
          marginLeft: '-1rem',
          marginTop: '0.5rem',
          background: 'white',
        }}
      />
    </>
  );
};
