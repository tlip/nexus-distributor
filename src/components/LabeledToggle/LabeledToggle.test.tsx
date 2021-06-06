import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { LabeledToggle } from '.';

describe('LabeledToggle component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <BrowserRouter>
          <LabeledToggle
            name="test-toggle"
            options={[
              { value: 'ETH', label: 'ETH' },
              { value: 'NXM', label: 'NXM' },
            ]}
            onChange={() => undefined}
          />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
