import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, date, boolean } from '@storybook/addon-knobs';
import TimeMark from './index';

const stories = storiesOf('TimeMark', module);

stories.addDecorator(withKnobs);

const defaultStartDate = new Date();
const defaultEndDate = new Date();

stories
  .add('Точное время', () => (
    <TimeMark
      start={date('Start Date', defaultStartDate)}
      isActive={boolean('isActive')}
      isCurrent={boolean('isCurrent')}
    />
  ))
  .add('Диапазон', () => (
    <TimeMark
      start={date('Start Date', defaultStartDate)}
      end={date('End Date', defaultEndDate)}
      isActive={boolean('isActive')}
      isCurrent={boolean('isCurrent')}
    />
  ));