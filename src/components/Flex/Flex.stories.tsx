import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Flex, FlexProps } from './Flex';

export default {
  title: 'Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<FlexProps> = (props) => <Flex {...props} />;

export const BaseFlex = Template.bind({});
BaseFlex.args = {
  children: "I'm a Flex",
};
