import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { LabeledToggle, LabeledToggleProps } from './LabeledToggle';

export default {
  title: 'LabeledToggle',
  component: LabeledToggle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<LabeledToggleProps> = (props) => (
  <LabeledToggle {...props} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'storybook-labeled-toggle',
  defaultValue: 'ETH',
  onChange: (e: any) => console.log(e.target.value),
  options: [
    { value: 'ETH', label: 'ETH' },
    { value: 'NXM', label: 'NXM' },
  ],
};
