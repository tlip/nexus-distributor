import React from 'react';
import styled from '@emotion/styled/macro';
import { Radio, Label } from '@rebass/forms';
import { Box, BoxProps } from 'components/Box/Box';
import { Flex } from 'components/Flex';
import { Text } from 'components/Text';

type LabeledToggledOption = {
  label: string;
  value: any;
};

export interface LabeledToggleProps extends BoxProps {
  name: string;
  options: LabeledToggledOption[];
  value?: any;
  defaultValue?: any;
  onChange: (e?: any) => void;
}

const HiddenRadio = styled(Radio)`
  display: block;
  max-height: 0;
  max-width: 0;
`;

export const LabeledToggle: React.FC<LabeledToggleProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  ...props
}) => {
  const [current, setCurrent] = React.useState(
    defaultValue || value || options[0]?.value
  );

  React.useEffect(() => {
    if (value) {
      setCurrent(value);
    }
  }, [value]);

  const handleChange = (e: any) => {
    const newValue = e.target?.value;
    setCurrent(newValue);
    onChange(e);
  };

  return (
    <Box {...props} sx={{ display: 'inline-block' }}>
      <Flex bg="border" sx={{ position: 'relative', borderRadius: 30 }}>
        <Box
          width={1 / options.length}
          height={22}
          sx={{
            zIndex: 0,
            borderRadius: 30,
            bg: 'primary',
            position: 'absolute',
            top: 0,
            left: 0,
            transition: '300ms ease-in-out',
            transform: `translateX(${
              100 * options.findIndex(({ value }) => value === current)
            }%)`,
          }}
        />
        {options.map(({ label, value }) => (
          <Label
            py="0.25em"
            px="0.75em"
            sx={{
              userSelect: 'none',
              position: 'relative',
              zIndex: 2,
              cursor: value !== current ? 'pointer' : 'default',
              flex: 1,
            }}
          >
            <Box maxWidth={0} maxHeight={0} sx={{ overflow: 'hidden' }}>
              <HiddenRadio
                {...{ name, value }}
                checked={value === current}
                onChange={handleChange}
              />
            </Box>
            <Text
              variant="caption1"
              color={value === current ? 'white' : 'text'}
              sx={{ transition: '300ms ease-in-out' }}
            >
              {label}
            </Text>
          </Label>
        ))}
      </Flex>
    </Box>
  );
};
