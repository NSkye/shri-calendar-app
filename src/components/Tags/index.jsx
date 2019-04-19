import React from 'react';
import map from 'lodash/map';
import classNames from 'classnames';
import Icon from '@@/Icon';
import { List } from 'immutable';
import styles from './styles.styl';

const Tag = ({
  children, color, id, selected, onUnselect, onSelect,
}) => {
  const handleSelect = () => {
    if (selected) {
      onUnselect(id);
      return;
    }
    onSelect(id);
  };
  return (
    <button
      type='button'
      style={{
        color,
      }}
      onClick={handleSelect}
      className={classNames(styles.tag, {
        [styles.selected]: selected,
      })}
    >
      <span className={styles.text}>{children}</span>
      {selected
        && (
        <div
          className={styles.iconWrapper}
        >
          <Icon
            height='10px'
            width='10px'
            name='close-big'
            style={{
              backgroundColor: color,
              boxShadow: `-4px 0 5px ${color}`,
            }}
            className={styles.icon}
          />
        </div>
        )
        }
    </button>
  );
};

const Tags = ({
  data, className, selectedTags = new List(), toggleTagSelection,
}) => (
  <div className={className}>
    {map(data, item => {
      return (
        <Tag
          key={item.id}
          color={item.color}
          id={item.id}
          selected={selectedTags.indexOf(item.id) !== -1}
          onUnselect={toggleTagSelection}
          onSelect={toggleTagSelection}
        >
          {item.name}
        </Tag>
      )
    })}
  </div>
);

export default Tags;