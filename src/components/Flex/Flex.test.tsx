import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { Flex } from '.';

describe('Flex component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <Flex>I'm a box</Flex>
      </ThemeProvider>
    );

    expect(await screen.findByText(/I'm a box/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
