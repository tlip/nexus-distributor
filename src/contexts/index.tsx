import React from 'react';

import { DimensionsContextProvider } from './DimensionsContext';

export const Contexts: React.FC = ({ children }) => (
  <DimensionsContextProvider>{children}</DimensionsContextProvider>
);
