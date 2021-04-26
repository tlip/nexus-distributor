import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { Box } from '.';

describe('Box component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <Box>I'm a box</Box>
      </ThemeProvider>
    );

    expect(await screen.findByText(/I'm a box/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
