import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Input, InputProps } from './Input';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<InputProps> = (props) => <Input {...props} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'placeholder!',
};

export const Select = Template.bind({});
Select.args = {
  type: 'select',
  children: (
    <>
      <option value={1}>Option 1</option>
      <option value={2}>Option 2</option>
      <option value={3}>Option 3</option>
    </>
  ),
};
