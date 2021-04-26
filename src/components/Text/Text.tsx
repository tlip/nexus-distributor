import React from 'react';
import { Text as RebassText, TextProps as RebassTextProps } from 'rebass';

export interface TextProps extends Omit<RebassTextProps, BrokenRebassProps> {}

const variantTagName = (
  variant: any,
  as: React.ElementType<any>
): React.ElementType<any> => {
  if (/h\d/i.test(variant)) return variant.toLowerCase();
  return as || 'span';
};

export const Text: React.FC<TextProps> = ({
  as = 'span',
  variant = 'body1',
  ...props
}) => (
  <RebassText as={variantTagName(variant, as)} {...{ variant, ...props }} />
);
