import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { PageContentWrapper } from '.';

describe('PageContentWrapper component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <PageContentWrapper>I'm a test.</PageContentWrapper>
      </ThemeProvider>
    );

    expect(await screen.findByText(/I'm a test\./i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
