import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { Text } from './';

describe('Text component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <Text variant="body1">I'm sample text</Text>
      </ThemeProvider>
    );

    expect(await screen.findByText(/I'm sample text/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
