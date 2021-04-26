import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { mdiCheck } from '@mdi/js';
import { theme } from 'theme';
import { Icon } from '.';

describe('Icon component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <Icon path={mdiCheck} />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
