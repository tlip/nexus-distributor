import React from 'react';
import styled from '@emotion/styled/macro';
import {
  Input as ReInput,
  InputProps as ReInputProps,
  Select,
  SelectProps as ReSelectProps,
} from '@rebass/forms';
import { Text } from 'components/Text';

export interface InputProps extends Omit<ReInputProps, BrokenRebassProps> {}
export interface SelectProps extends Omit<ReSelectProps, BrokenRebassProps> {
  type?: string;
}

const StyledInput = styled(Text)`
  display: inline-block;
  padding: 0.5em 0.75em;
  background: #fdfdfd;
  border-radius: 0.5em;
  border: 1px solid ${(props: any) => props.theme.colors.border};
  font-size: 0.75em;
  & + svg * {
    fill: ${(props: any) => props.theme.colors.primary};
  }
  color: ${(props: any) => props.theme.colors.text};
  &::placeholder {
    color: ${(props: any) => props.theme.colors.border};
    font-style: italic;
  }
`;

export const Input: React.FC<InputProps | SelectProps> = ({
  type,
  ...props
}) => {
  const as = type === 'select' ? Select : ReInput;
  // @ts-ignore
  return <StyledInput as={as} type={type || 'text'} {...props} />;
};
