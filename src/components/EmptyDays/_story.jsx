import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import EmptyDays from './index';

const stories = storiesOf('EmptyDays', module);

stories
  .add('Отображение', () => (
    <DragDropContextProvider backend={HTML5Backend}>
      <EmptyDays
        days={[
          moment().subtract(1, 'd').valueOf(),
          moment().valueOf(),
        ]}
      />
    </DragDropContextProvider>
  ));