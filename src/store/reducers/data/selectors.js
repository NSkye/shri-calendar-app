import moment from 'moment';
import { Range } from 'immutable';
import { createSelector } from 'reselect';

/**
 * Создать селектор ивента по Id
 * @param {Immutable.Map} state состояние
 * @returns селектор
 */
export const selectEventById = state => createSelector(
  (id) => {
    const [day, eId] = id.split(':');
    return state.getIn([
      'data',
      'eventsByDay',
      Number(day),
      eId,
    ]);
  },
  event => event && event.toObject(),
);

const DAY_DURATION = 24 * 60 * 60 * 1000;
/**
 * Создать селектор ивентов по времени
 * @param {Immutable.Map} state состояние
 * @returns селектор
 */
export const selectEventsByTime = state => createSelector(
  (from, to) => Range(
    moment(from).startOf('day').valueOf(),
    moment(to).startOf('day').valueOf() + DAY_DURATION,
    DAY_DURATION,
  ),
  range => range.reduce((ac, day) => {
    const eventSet = state.getIn(['data', 'eventsByDay', day]);
    eventSet && eventSet.map(e => ac.push(e.toObject()));
    return ac;
  }, []),
);

export const selectAllEvents = state => {
  return state.getIn(['data', 'eventsByDay'])
    .reduce((acc, day) => {
      day.valueSeq().forEach(event => {
        acc.push(event.toObject());
      });
      return acc;
    }, []);
};

export const selectEventsCountWithoutDate = createSelector(
  state => state.getIn(['data', 'eventsByDay', -1]),
  events => {
    if (!events) return 0;
    return events.size;
  },
);

export const selectEventsWithoutTime = createSelector(
  state => state.getIn(['data', 'eventsByDay', -1]),
  events => {
    if (!events) return [];
    return events.reduce((ac, cv) => {
      ac.push(cv.toObject());
      return ac;
    }, []);
  },
);

/**
 * Получить текущий режим отображения
 * @param {Immutable.Map} state состояние
 * @returns информация о периоде и режиме отображения
 */
export const selectShownEventsPeriod = state => state.getIn(['data', 'period']).toObject();

/**
 * Выбрать события, которые сейчас должны отображаться
 * @param {Immutable.Map} state состояние
 * @returns массив событий
 */
export const selectDisplayedEvents = createSelector(
  selectShownEventsPeriod,
  state => selectEventsByTime(state),
  (period, selector) => selector(period.from, period.to),
);

export const selectTodoLists = createSelector(
  state => state.getIn(['data', 'todoLists']),
  todoListsSet => todoListsSet.reduce((ac, todo) => {
    ac.push(todo.toObject());
    return ac;
  }, []),
);

/**
 * Создать селектор тега по id
 * @param {Immutable.Map} state состояние
 * @returns селектор
 */
export const selectTagById = state => createSelector(
  id => state.getIn(['data', 'tags', id]),
  tag => { return tag && tag.toObject(); },
);

/**
 * Получить все метки
 * @param {Immutable.Map} state состояние
 */
export const selectAllTags = createSelector(
  state => state.getIn(['data', 'tags']),
  tags => tags.reduce((ac, tag) => {
    ac.push(tag.toObject());
    return ac;
  }, []),
);

/**
 * Получить id всех меток (соответствуют layerId)
 * @param {Immutable.Map} state состояние
 */
export const selectAllTagIds = createSelector(
  state => state.getIn(['data', 'tags']),
  tags => tags.reduce((ac, _, key) => {
    ac.push(key);
    return ac;
  }, []),
);

/**
 * Получить сет выбранных меток
 * @param {Immutable.Map} state состояние
 */
export const selectMarkedAsSelectedTags = state => state.getIn(['data', 'selectedTags']);

/**
 * Получить значение флага creatingNewTag
 * @param {Immutable.Map} state состояние
 */
export const selectCreatingNewTag = state => state.getIn(['data', 'creatingNewTag']);


export const selectTodoListIdsByName = state => state.getIn(['data', 'todoListIdsByName']).toObject();

/**
 * Получить текущий режим отображения свободных дней
 * @param {Immutable.Map} state состояние
 * @returns флаг режима отображения свободных дней
 */
export const selectFreeDaysMode = state => state.getIn(['data', 'free']);
