import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, date } from '@storybook/addon-knobs';
import CurrentTime from './index';

const stories = storiesOf('CurrentTime', module);

stories.addDecorator(withKnobs);

const defaultTime = new Date();

stories.add('Отображение', () => <CurrentTime time={date('Time', defaultTime)} />);