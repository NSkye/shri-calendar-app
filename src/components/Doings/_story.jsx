import React from 'react';
import { storiesOf } from '@storybook/react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Doings from './index';

const cardsData1 = [
  {
    id: 1,
    name: 'Захватить мир',
    color: '#bd10e0',
  },
  {
    id: 2,
    name: 'Написать тесты',
    color: '#50e3c2',
  },
  {
    id: 3,
    name: 'Бросить курить',
    color: '#ff463f',
  },
];

const cardsData2 = [
  {
    id: 1,
    name: 'Не ковырять в носу',
    color: '#bd10e0',
  },
  {
    id: 2,
    name: 'Жить с собой в гармонии',
    color: '#50e3c2',
  },
  {
    id: 3,
    name: 'Открыть Скетч (хотя бы)',
    color: '#bd10e0',
  },
  {
    id: 4,
    name: 'Искать решение',
    color: '#bd10e0',
  },
  {
    id: 5,
    name: 'Покормить котю',
    color: '#50e3c2',
  },
  {
    id: 6,
    name: 'Прочитать трактат',
    color: '#bd10e0',
  },
];

storiesOf('Doings', module)
  .add('Разные метки', () => (
    <DragDropContextProvider backend={HTML5Backend}>
      <Doings data={cardsData1} />
    </DragDropContextProvider>
  ))
  .add('> 2 одинковых меток', () => (
    <DragDropContextProvider backend={HTML5Backend}>
      <Doings data={cardsData2} />
    </DragDropContextProvider>
  ));