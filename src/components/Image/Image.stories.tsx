import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Image, ImageProps } from './Image';

export default {
  title: 'Image',
  component: Image,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ImageProps> = (props) => <Image {...props} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://icons.getbootstrap.com/assets/icons/question-circle.svg',
};
