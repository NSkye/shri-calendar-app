import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import EventName from './index';

const stories = storiesOf('Event Name', module);

stories.addDecorator(withKnobs);

const defaultText = 'Создать массу клёвых компонентов';

stories
  .add('Обычное событие', () => <EventName isChecked={boolean('isChecked')}>{text('Text', defaultText)}</EventName>);
