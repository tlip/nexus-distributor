import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { NavBar } from '.';

describe('NavBar component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
