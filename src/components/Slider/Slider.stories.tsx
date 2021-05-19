import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Slider, SliderProps } from './Slider';

export default {
  title: 'Slider',
  component: Slider,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SliderProps> = (props) => <Slider {...props} />;

export const Default = Template.bind({});
Default.args = {
  min: 1,
  max: 100,
  defaultValue: 50,
  step: 1,
  onChange: console.log,
};
