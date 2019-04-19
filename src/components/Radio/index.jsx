import React from 'react';
import map from 'lodash/map';
import classNames from 'classnames';
import styles from './styles.styl';

const Radio = ({
  items,
  selected,
  onChange,
  className = '',
}) => (
  <div className={classNames(className, styles.radioBox)}>
    <div className={styles.radioWrapper}>
      {map(items, ({ title, value }) => (
        <div
          key={value}
          role='button'
          aria-label=''
          tabIndex='0'
          onClick={() => onChange(value)}
          onKeyPress={e => (e.keyCode === 13 ? onChange(value) : null)}
          className={classNames(styles.radioElement, {
            [styles.active]: value === selected,
          })}
        >
          {title}
        </div>
      ))}
    </div>
  </div>
);

export default Radio;
