import { colors } from '../colors';
import { typography } from '../typography';

const common = {
  ...typography.text.body2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  height: '30px',
  minHeight: '30px',
  fontWeight: 'semibold',
  borderRadius: 'large',
  userSelect: 'none',
  cursor: 'pointer',
  px: '1.5em',
  py: '0.5em',
  transition: '200ms linear',
};

export const buttons = {
  primary: {
    ...common,
    bg: 'primary',
    color: 'white',
    '&:focus': {
      outline: 'none',
      bg: 'primaryDark',
    },
  },
  outline: {
    ...common,
    bg: 'transparent',
    boxShadow: `0 0 0 2px inset ${colors.primary}`,
    color: 'primary',
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px inset ${colors.primaryDark}`,
      color: 'primaryDark',
    },
  },
};
