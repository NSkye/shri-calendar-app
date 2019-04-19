import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import moment from 'moment';
import ScheduleHeader from './index';

const stories = storiesOf('ScheduleHeader', module);

stories.addDecorator(withKnobs);

const sameMounth = [moment('01/01/2018').valueOf(), moment('01/07/2018').valueOf()];
const diffMounth = [moment('01/28/2018').valueOf(), moment('02/05/2018').valueOf()];
stories
  .add('Тот же месяц', () => <ScheduleHeader dates={sameMounth} />)
  .add('Разный месяц', () => <ScheduleHeader dates={diffMounth} />);
