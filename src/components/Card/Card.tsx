import React from 'react';
import { Box, BoxProps } from 'components/Box/Box';

export interface CardProps extends BoxProps {}

export const Card: React.FC<BoxProps> = ({ variant = 'primary', ...props }) => (
  <Box variant={`cards.${variant}`} {...props} />
);
