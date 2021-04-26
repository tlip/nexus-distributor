import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
