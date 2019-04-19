import React from 'react';
import { storiesOf } from '@storybook/react';
import DoingTitle from './index';

const tags = [
  {
    id: 1,
    color: '#E73255',
    name: 'Важное письмо',
  },
  {
    id: 2,
    color: '#50E3C2',
    name: 'Дизайн',
  },
  {
    id: 3,
    color: '#bd10e0',
    name: 'Виза',
  },
  {
    id: 4,
    color: '#00cd41',
    name: 'Деньги',
  },
  {
    id: 5,
    color: '#ffcc00',
    name: 'Выпить',
  },
  {
    id: 6,
    color: '#f5a623',
    name: 'Покодить',
  },
];

storiesOf('Doing title', module)
  .add('По умолчанию', () => <DoingTitle tags={tags} />)
  .add('С переданными параметрами', () => <DoingTitle tags={tags} color='#f5a623' title='Погладить кошку' />);
