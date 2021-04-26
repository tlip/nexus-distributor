import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box, BoxProps } from './Box';

export default {
  title: 'Box',
  component: Box,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<BoxProps> = (props) => <Box {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: "I'm a Box",
};
