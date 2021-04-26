import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Text, TextProps } from './Text';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TextProps> = ({ variant, children }) => (
  <Text {...{ variant, children }} />
);

export const BigTitle = Template.bind({});
BigTitle.args = {
  variant: 'bigTitle',
  children: "I'm BigTitle text",
};

export const H1 = Template.bind({});
H1.args = {
  variant: 'h1',
  children: "I'm H1 text",
};

export const H2 = Template.bind({});
H2.args = {
  variant: 'h2',
  children: "I'm H2 text",
};

export const H3 = Template.bind({});
H3.args = {
  variant: 'h3',
  children: "I'm H3 text",
};

export const H4 = Template.bind({});
H4.args = {
  variant: 'h4',
  children: "I'm H4 text",
};

export const H5 = Template.bind({});
H5.args = {
  variant: 'h5',
  children: "I'm H5 text",
};

export const H6 = Template.bind({});
H6.args = {
  variant: 'h6',
  children: "I'm H6 text",
};

export const SubHead = Template.bind({});
SubHead.args = {
  variant: 'body1',
  children: "I'm SubHead text",
};

export const Body1 = Template.bind({});
Body1.args = {
  variant: 'body1',
  children: "I'm Body1 text",
};

export const Body2 = Template.bind({});
Body2.args = {
  variant: 'body2',
  children: "I'm Body2 text",
};

export const Button = Template.bind({});
Button.args = {
  variant: 'button',
  children: "I'm Button text",
};

export const Caption1 = Template.bind({});
Caption1.args = {
  variant: 'caption1',
  children: "I'm Caption1 text",
};

export const Caption2 = Template.bind({});
Caption2.args = {
  variant: 'caption2',
  children: "I'm Caption2 text",
};
