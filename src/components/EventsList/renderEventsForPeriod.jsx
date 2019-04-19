import React from 'react';
import map from 'lodash/map';
import EmptyDays from '@@/EmptyDays/withData';
import DayWithEvents from './DayWithEvents';
import fillDaysWithEvents from './fillDaysWithEvents';
import styles from './styles.styl';

export default function renderEventsForPeriod() {
  const {
    events,
    period,
    freeDaysMode,
  } = this.props;

  const days = fillDaysWithEvents(events, period.from, period.to, freeDaysMode);

  return (
    <div className={styles.events}>
      {map(days, day => (day.type === 'empty'
        ? <EmptyDays days={day.items} key={day.items.join(':')} />
        : (
          <DayWithEvents
            events={day.items}
            allDayEvents={day.allDaysItems}
            day={day.timestamp}
            key={day.timestamp}
          />
        )
      ))}
    </div>
  );
}