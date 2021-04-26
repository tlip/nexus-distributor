import { colors } from './colors';
import { typography } from './typography';
import { radii } from './radii';
import { space } from './space';
import { buttons } from './variants/buttons';
import { cards } from './variants/cards';

export const theme: any = {
  space,
  breakpoints: ['0', '40em', '52em', '87.5em', '103.125em', '108.125em'],
  radii,
  colors,
  buttons,
  variants: {
    cards,
  },
  ...typography,
};
