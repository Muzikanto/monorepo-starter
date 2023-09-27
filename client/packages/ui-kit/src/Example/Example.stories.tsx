import Example from './Example';
import {ComponentMeta, ComponentStory} from '@storybook/react';

const DefaultExample: ComponentMeta<typeof Example> = {
  title: 'Example',
  component: Example,
  parameters: {},
  argTypes: {},
};

const Template: ComponentStory<typeof Example> = (props) => <Example {...props}/>

export const Basic = Template.bind({});
Basic.args = {};

export default DefaultExample;
