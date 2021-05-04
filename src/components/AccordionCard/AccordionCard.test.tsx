import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { AccordionCard } from '.';

describe('AccordionCard component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <AccordionCard>I'm an AccordionCard</AccordionCard>
      </ThemeProvider>
    );

    expect(
      await screen.findByText(/I'm an AccordionCard/i)
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
