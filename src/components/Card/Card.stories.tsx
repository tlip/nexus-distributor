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

export const PrimaryCard = Template.bind({});
PrimaryCard.args = {
  variant: 'primary',
  children: "I'm a Primary Card",
};

export const OutlineCard = Template.bind({});
OutlineCard.args = {
  variant: 'outline',
  children: "I'm an Outline Card",
};
