/* eslint-disable */
import moment from 'moment';

function fillDaysWithEvents(events, from, to, freeDaysMode) {
  if ((events.length !== 0) && (!from || !to)) {
    from = moment(events[0].startTs).startOf('week').valueOf();
    to = moment(events[0].startTs).endOf('week').valueOf();
  }

  const days = {};

  events.forEach((event) => {
    const currentDayTs = moment(event.startTs).startOf('day').valueOf();
    if (event.isAllDay) { // если событие на весь день
      for (let dayTs = currentDayTs; dayTs <= event.endTs; dayTs = moment(dayTs).add(1, 'day').valueOf()) {
        if (dayTs >= to) break; // TODO - а мы не будем терять это событие на следующей неделе?
        if (days[dayTs] && days[dayTs].allDaysItems) { // если уже есть события на весь день
          days[dayTs].allDaysItems.push(event);
        } else { // если еще нет
          days[dayTs] = {
            ...days[dayTs],
            type: 'day',
            timestamp: dayTs,
            allDaysItems: [event],
          };
        }
        if (event.type === 'todo-item') break
      }
    } else if (days[currentDayTs] && (days[currentDayTs].items)) { // если уже есть событие
      days[currentDayTs].items.push(event);
    } else { // если события в этот день нет
      days[currentDayTs] = {
        ...days[currentDayTs], // чтобы прокинуть allDaysItems
        type: 'day',
        timestamp: currentDayTs,
        items: [event],
      };
    }
  });

  // заполнение пустых дней
  if (!freeDaysMode) {
    const start = moment(from).startOf('day').valueOf()
    for (let dayTs = start, prevDayTs = null; dayTs < to; dayTs = moment(dayTs).add(1, 'day').valueOf()) {
      if (!days[dayTs]) {
        const prevDay = days[prevDayTs];
        if (prevDay && prevDay.type === 'empty') {
          prevDay.items.push(dayTs);
        } else {
          days[dayTs] = {
            type: 'empty',
            timestamp: dayTs,
            items: [dayTs],
          };
          prevDayTs = dayTs;
        }
      } else {
        prevDayTs = dayTs;
      }
    }
  }

  return Object.values(days).sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
}

export default fillDaysWithEvents;
