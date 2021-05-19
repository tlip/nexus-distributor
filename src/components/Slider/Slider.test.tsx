import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { Slider } from '.';

describe('Slider component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <Slider
          min={25}
          max={156}
          value={5}
          step="5"
          onChange={() => undefined}
        />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
