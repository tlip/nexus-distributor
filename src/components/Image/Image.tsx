import styled from '@emotion/styled/macro';
import { Image as ReImage, ImageProps as ReImageProps } from 'rebass';

export interface ImageProps extends Omit<ReImageProps, BrokenRebassProps> {}

export const Image = styled(ReImage)<ImageProps>``;
