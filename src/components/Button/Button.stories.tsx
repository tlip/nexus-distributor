import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from './Button';
import { mdiMagnify } from '@mdi/js';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    variant: 'primary',
    children: 'Search',
    css: 'Unused',
    length: 'Unused',
    filter: 'Unused',
  },
} as Meta;

const Template: Story<ButtonProps> = ({ variant, icon, children }) => (
  <Button {...{ variant, icon, children }} />
);

export const Default = Template.bind({});

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: mdiMagnify,
};
