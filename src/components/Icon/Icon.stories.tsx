import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Icon, IconProps } from './Icon';
import { mdiCheck } from '@mdi/js';

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IconProps> = ({ path }) => <Icon {...{ path }} />;

export const CheckIcon = Template.bind({});
CheckIcon.args = {
  path: mdiCheck,
};
