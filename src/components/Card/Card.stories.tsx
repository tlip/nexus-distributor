import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Card, CardProps } from './Card';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CardProps> = (props) => <Card {...props} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  children: "I'm a Primary Card",
};
