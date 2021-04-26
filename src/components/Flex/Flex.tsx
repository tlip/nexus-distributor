import styled from '@emotion/styled/macro';
import { Flex as ReFlex, FlexProps as ReFlexProps } from 'rebass';

export interface FlexProps extends Omit<ReFlexProps, BrokenRebassProps> {}

export const Flex = styled(ReFlex)<FlexProps>`
  box-sizing: border-box;
`;
