import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { Card } from '.';

describe('Card component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <Card>I'm a Card</Card>
      </ThemeProvider>
    );

    expect(await screen.findByText(/I'm a Card/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
