import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('should render without crashing', async () => {
    const { findAllByAltText } = render(<App />);
    expect(await findAllByAltText('Nexus Mutual')).toBeTruthy();
  });
});
