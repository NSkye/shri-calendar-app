import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import DoingList from './index';

const data = [
  {
    id: 1,
    name: 'Захватить мир',
    start: moment().add(2, 'hours').valueOf(),
    checked: false,
    color: 'green',
    type: 'todo-item',
  },
  {
    id: 2,
    name: 'Разговор про иконку',
    start: moment().add(3, 'hours').valueOf(),
    end: moment().add(5, 'hours').valueOf(),
    color: 'blue',
    type: 'event',
  },
  {
    id: 3,
    name: 'Выгулять бобика',
    start: moment().add(6, 'hours').valueOf(),
    checked: true,
    type: 'todo-item',
  },
  {
    id: 4,
    name: 'Весёлые картинки (планирование)',
    start: moment().add(8, 'hours').valueOf(),
    color: 'blue',
    type: 'event',
  },
  {
    id: 5,
    name: 'Захватить мир',
    start: moment().add(15, 'hours').valueOf(),
    checked: false,
    color: 'green',
    type: 'todo-item',
  },
  {
    id: 6,
    name: 'Разговор про иконку',
    start: moment().add(20, 'hours').valueOf(),
    end: moment().add(5, 'hours').valueOf(),
    color: 'blue',
    type: 'event',
  },
  {
    id: 7,
    name: 'Выгулять бобика',
    start: moment().add(24, 'hours').valueOf(),
    checked: true,
    type: 'todo-item',
  },
  {
    id: 8,
    name: 'Весёлые картинки (планирование)',
    start: moment().add(60, 'hours').valueOf(),
    color: 'blue',
    type: 'event',
  },
  {
    id: 8,
    name: 'Покушать',
    start: moment().add(60, 'hours').valueOf(),
    color: 'green',
    type: 'todo-item',
  },
  {
    id: 8,
    name: 'Погладить котика',
    start: moment().add(200, 'hours').valueOf(),
    color: 'red',
    type: 'event',
  },
];

storiesOf('EventsList', module)
  .add('Список', () => <DoingList data={data} />);
