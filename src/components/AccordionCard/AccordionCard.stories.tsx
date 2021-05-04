import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { AccordionCard, AccordionCardProps } from './AccordionCard';
import { Text } from 'components/Text';

export default {
  title: 'AccordionCard',
  component: AccordionCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<AccordionCardProps> = (props) => (
  <AccordionCard {...props} />
);

export const Default = Template.bind({});
Default.args = {
  children: <Text>Sup dog</Text>,
};
