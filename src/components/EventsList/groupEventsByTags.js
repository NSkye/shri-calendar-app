import moment from 'moment';

function groupEventsByTags(events, selectedTags, to) {
  const tags = {};

  selectedTags.forEach((tag) => {
    tags[tag] = {};
  });

  events.map((event) => {
    if (!selectedTags.includes(event.tagId)) return; // Отсеиваем ивенты для другой метки
    const currentDayTs = moment(event.startTs).startOf('day').valueOf();
    const days = tags[event.tagId]; // группировка по метке
    if (event.isAllDay) { // если событие на весь день
      for (let dayTs = currentDayTs; dayTs <= event.endTs; dayTs = moment(dayTs).add(1, 'day').valueOf()) {
        if (dayTs >= to) break; // TODO - а мы не будем терять это событие на следующей неделе?
        if (days && days[dayTs] && days[dayTs].allDayEvents) { // если уже есть события на весь день
          days[dayTs].allDayEvents.push(event);
        } else { // если еще нет
          days[dayTs] = {
            allDayEvents: [event],
          };
        }
        if (event.type === 'todo-item') break;
      }
    } else if (days && days[currentDayTs] && days[currentDayTs].events) { // группировка по дням
      days[currentDayTs].events.push(event);
    } else {
      days[currentDayTs] = {
        ...days[currentDayTs],
        events: [event],
      };
    }
  });

  return tags;
}

export default groupEventsByTags;
