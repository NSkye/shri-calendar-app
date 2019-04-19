import React from 'react';
import map from 'lodash/map';
import { DropTarget } from 'react-dnd';
import ItemTypes from '@/draggableTypes';
import EventRow from '@@/EventRow/withData';
import DateBlock from '@@/DateBlock';
import cn from 'classnames';
import styles from './styles.styl';

const squareTarget = {
  drop(props) {
    return {
      action: 'move', // Передвинуть на определённый день
      day: props.day,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const DayEvents = ({ events, allDayEvents }) => (
  <div className={styles.eventsWrapper}>
    {map(allDayEvents, (event, index) => (
      <EventRow
        event={event}
        key={event.id}
        allDay
        hideText={index > 0}
      />
    ))}
    {map(events, event => <EventRow event={event} key={event.id} />)}
  </div>
);

const DayWithEvents = ({
  events,
  allDayEvents,
  day,
  connectDropTarget,
  isOver,
}) => connectDropTarget(
  <div className={cn(styles.dayBlock, {
    [styles.dateBlockOver]: isOver,
  })}
  >
    <DateBlock date={day} className={styles.dateBlock} />
    <DayEvents events={events} allDayEvents={allDayEvents} />
  </div>,
);

const DayWithEventsDragTarget = DropTarget(ItemTypes.EVENT, squareTarget, collect)(DayWithEvents);

export default DayWithEventsDragTarget;