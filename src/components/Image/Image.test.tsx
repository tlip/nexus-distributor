import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { theme } from 'theme';
import { Image } from '.';

describe('Image component', () => {
  it('should render without crashing', async () => {
    const { container } = render(
      <ThemeProvider {...{ theme }}>
        <Image src="https://icons.getbootstrap.com/assets/icons/question-circle.svg" />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
