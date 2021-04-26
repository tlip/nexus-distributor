import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { Button } from '.';

describe('Button component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <Button>Search</Button>
      </ThemeProvider>
    );

    expect(await screen.findByText(/Search/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
