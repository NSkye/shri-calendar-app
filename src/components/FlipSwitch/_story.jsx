import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, boolean, select, text,
} from '@storybook/addon-knobs';
import FlipSwitch from './index';

const stories = storiesOf('FlipSwitch', module);

stories.addDecorator(withKnobs);

const options = {
  Small: 's',
  Medium: 'm',
  Large: 'l',
};

const defaultSize = 'm';
const defaultFontSize = '13px';

stories.add('with props', () => (
  <FlipSwitch
    checked={boolean('Checked', true)}
    size={select('Size', options, defaultSize)}
    fontSize={text('Font Size', defaultFontSize)}
  >
    {text('Label', '')}
  </FlipSwitch>
));
