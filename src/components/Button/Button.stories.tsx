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

export const PrimaryButton = Template.bind({});

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  variant: 'secondary',
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
  variant: 'outline',
};

export const PrimaryButtonWithIcon = Template.bind({});
PrimaryButtonWithIcon.args = {
  icon: mdiMagnify,
};

export const SecondaryButtonWithIcon = Template.bind({});
SecondaryButtonWithIcon.args = {
  ...PrimaryButtonWithIcon.args,
  ...SecondaryButton.args,
};

export const OutlineButtonWithIcon = Template.bind({});
OutlineButtonWithIcon.args = {
  ...PrimaryButtonWithIcon.args,
  ...OutlineButton.args,
};
