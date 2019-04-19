/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import cn from 'classnames';
import DateBlock from '@@/DateBlock';
import { DropTarget } from 'react-dnd';
import ItemTypes from '@/draggableTypes';
import styles from './styles.styl';

const squareTarget = {
  drop(props) {
    return {
      day: props.day,
      action: 'move',
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const Day = ({
  day,
  connectDropTarget,
  isOver,
  onClickDay,
}) => connectDropTarget(
  <li
    className={cn(styles.dayItem, {
      [styles.dayItemOver]: isOver,
    })}
    tabIndex='0'
    aria-label='Создать событие'
    onClick={() => onClickDay(day)}
    onKeyPress={e => e.keyCode === 13 && onClickDay(day)}
    key={day}
  >
    <DateBlock date={day} />
  </li>,
);


const DayDragTarget = DropTarget(ItemTypes.EVENT, squareTarget, collect)(Day);

const EmptyDays = ({ days, className, setSidebarState }) => {
  const handleClickOnDay = (day) => {
    setSidebarState(true, { startTs: day, type: 'todo-item' });
  };
  const dayItems = days && days
    .map(day => <DayDragTarget day={day} key={day} onClickDay={handleClickOnDay} />);

  return (
    <div className={cn(styles.emptyDays, className)}>
      <span className={styles.label}>Свободные дни</span>
      <ul className={styles.dayList}>
        {dayItems}
      </ul>
    </div>
  );
};

EmptyDays.propTypes = {
  days: (props, propName, componentName) => {
    const { [propName]: prop } = props;
    if (!Array.isArray(prop) || !prop.length) {
      return new Error(`Days should be non-empty array at ${componentName}`);
    }
    return null;
  },
};

EmptyDays.defaultProps = {
  days: [],
};

export default EmptyDays;