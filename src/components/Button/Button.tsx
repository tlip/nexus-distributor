import React from 'react';
import styled from '@emotion/styled/macro';
import { Button as ReButton, ButtonProps as ReButtonProps } from 'rebass';
import { Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { useThemeUI } from 'theme-ui';

export interface ButtonProps extends Omit<ReButtonProps, BrokenRebassProps> {
  variant?: string;
  icon?: string;
}

const ButtonIcon = styled(Icon)`
  position: absolute;
  height: 18px;
  left: -31px;
  transition: 200ms linear;
`;

const ButtonText = styled(Text)`
  position: relative;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  white-space: nowrap;
`;

export const Button: React.FC<ButtonProps> = ({
  as = 'button',
  variant = 'primary',
  sx = {},
  icon,
  children,
  ...props
}) => {
  const { theme } = useThemeUI();
  const variantTheme: any = theme.buttons?.[variant];
  const color: string = variantTheme?.color ?? 'white';

  return (
    <ReButton
      {...{ as, variant, ...props }}
      sx={{ ...sx, ...(icon ? { pl: '45px', pr: '40px' } : {}) }}
    >
      {typeof children !== 'string' ? (
        children
      ) : (
        <ButtonText>
          {!!icon && <ButtonIcon path={icon} size={0.75} {...{ color }} />}
          {children}
        </ButtonText>
      )}
    </ReButton>
  );
};
