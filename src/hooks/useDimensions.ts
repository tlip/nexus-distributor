import React from 'react';
import {
  DimensionsContext,
  DimensionsContextValues,
} from 'contexts/DimensionsContext';

// Context hook
export const useDimensions = (name: string): DimensionsContextValues => {
  const context = React.useContext(DimensionsContext);
  const dimensionRef = React.useRef<any>(null);

  // Subscribe parent component to resize chart based off
  // parent's dimensions
  React.useEffect(() => {
    dimensionRef.current &&
      context.subscribe(name, dimensionRef.current.parentNode as HTMLElement);
    return () => context.unsubscribe(name);
  }, [dimensionRef.current]);

  return { ref: dimensionRef, ...context };
};
