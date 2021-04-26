import styled from '@emotion/styled/macro';
import { Box as ReBox, BoxProps as ReBoxProps } from 'rebass';

export interface BoxProps extends Omit<ReBoxProps, BrokenRebassProps> {}

export const Box = styled(ReBox)<BoxProps>`
  box-sizing: border-box;
`;
