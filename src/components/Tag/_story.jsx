import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Tag from './index';

const stories = storiesOf('Tag', module);

stories.addDecorator(withKnobs);

const options = {
  Red: 'red',
  Blue: 'blue',
  Green: 'green',
  Yellow: 'yellow',
  Purple: 'purple',
  Orange: 'orange',
};

const defaultColor = 'purple';

stories.add('Горошек', () => <Tag color={select('Color', options, defaultColor)} />);
