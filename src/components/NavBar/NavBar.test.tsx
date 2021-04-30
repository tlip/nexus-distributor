import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { NavBar } from '.';

describe('NavBar component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <NavBar />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
