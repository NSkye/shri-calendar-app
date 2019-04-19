import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text, number, color,
} from '@storybook/addon-knobs';
import Icon from './index';

const stories = storiesOf('Icons', module);

stories.addDecorator(withKnobs);

function getImagesNames(req) {
  const imagesNames = [];
  req.keys().forEach((src) => {
    const name = src.split('./')[1].split('.svg')[0];
    imagesNames.push(name);
  });
  return imagesNames;
}

const iconsNames = getImagesNames(require.context('@/assets/icons', false, /\.svg$/));

const Icons = iconsNames.map(icon => (
  <div
    key={icon}
    style={{
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 20,
    }}
  >
    <span style={{
      display: 'inline-block',
      width: 150,
    }}
    >
      {icon}
    </span>
    <Icon name={icon} width='50px' />
  </div>
));

const defaultIcon = 'user';
const defaultColor = 'purple';

stories
  .add('Все иконки', () => (
    <div>
      {Icons}
    </div>
  ))
  .add('Одна иконка', () => (
    <Icon
      name={text('Name', defaultIcon)}
      width={number('Width')}
      height={number('Height')}
      color={color('Color', defaultColor)}
    />
  ));