import { addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#FFFFFF' },
    ],
  },
};

const ThemeDecorator = (Story) => (
  <ThemeProvider {...{ theme }}>
    <Story />
  </ThemeProvider>
);

addDecorator(ThemeDecorator);
addDecorator(StoryRouter());
