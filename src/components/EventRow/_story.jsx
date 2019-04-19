import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import EventRow from './index';

const events = [
  {
    name: 'Захватить мир',
    start: moment().add(2, 'hours').valueOf(),
    checked: false,
    color: 'green',
    type: 'todo-item',
  },
  {
    name: 'Разговор про иконку',
    start: moment().add(3, 'hours').valueOf(),
    end: moment().add(5, 'hours').valueOf(),
    color: 'blue',
    type: 'event',
  },
  {
    name: 'Выгулять бобика',
    start: moment().add(6, 'hours').valueOf(),
    checked: true,
    type: 'todo-item',
  },
  {
    name: 'Весёлые картинки (планирование)',
    start: moment().add(8, 'hours').valueOf(),
    color: 'blue',
    type: 'event',
  },
];
const List = () => events.map(event => <EventRow event={event} key={event.name} />);

storiesOf('EventRow', module)
  .add('Список', () => <List />);