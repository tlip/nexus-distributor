import React from 'react';
import MdiIcon from '@mdi/react';
import { IconProps as MdiIconProps } from '@mdi/react/dist/IconProps';
import { Box, BoxProps } from 'components/Box/Box';
import { useThemeUI } from 'theme-ui';
import _get from 'lodash/get';

type UsedBoxProps = 'sx' | 'className' | 'as' | 'variant';

export interface IconProps extends MdiIconProps, Pick<BoxProps, UsedBoxProps> {}

export const Icon: React.FC<IconProps> = ({
  className,
  color: _color = 'text.primary',
  sx = {},
  as = 'span',
  variant,
  size = 1,
  ...props
}) => {
  const { theme } = useThemeUI();
  const color = (_get(theme.colors, _color as string) as string) ?? _color;
  return (
    <Box {...{ sx, className, as, variant }}>
      <MdiIcon {...{ size, color }} {...props} />
    </Box>
  );
};
