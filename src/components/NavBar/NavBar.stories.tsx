import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { NavBar, NavBarProps } from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<NavBarProps> = (props) => <NavBar {...props} />;

export const Default = Template.bind({});
