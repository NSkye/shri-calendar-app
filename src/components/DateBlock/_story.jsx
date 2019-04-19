import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import moment from 'moment';
import DateBlock from './index';

const stories = storiesOf('DateBlock', module);

stories.addDecorator(withKnobs);

const currentDay = moment().valueOf();
const dayBefore = moment().subtract(1, 'days').valueOf();

stories
  .add('Текущий день', () => <DateBlock date={number('Today', currentDay)} full={boolean('Full')} />)
  .add('Предыдущий день', () => <DateBlock date={number('Day', dayBefore)} full={boolean('Full')} />);
