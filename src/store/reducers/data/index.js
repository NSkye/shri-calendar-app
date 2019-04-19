import {
  OrderedMap,
  Map,
  List,
  fromJS,
} from 'immutable';
import { handleActions } from 'redux-actions';
import shortId from 'shortid';
import moment from 'moment';

import {
  setViewMode,
  setFreeViewMode,
  editPeriod,
  addTag,
  toggleCreatingNewTag,
  toggleTagSelection,
  clearTagsSelection,
  editTag,
  deleteTag,
  addEvent,
  deleteEvent,
  editEvent,
  placeEventOnDay,
  markEventAs,
} from './actions';

export * from './actions';
export * from './selectors';

const tagsFromLocalStorage = JSON.parse(localStorage.getItem('tags'));

let eventsFromLocalStorage = JSON.parse(localStorage.getItem('events'));
eventsFromLocalStorage = eventsFromLocalStorage && Object.entries(eventsFromLocalStorage)
  .reduce((acc, [key, value]) => {
    return acc.set(Number(key), fromJS(value));
  }, Map());

const defaultState = Map({
  tags: OrderedMap(fromJS(tagsFromLocalStorage)),
  selectedTags: List(),
  creatingNewTag: false,
  todoLists: Map(),
  eventsByDay: eventsFromLocalStorage || Map(),
  tagIdsByName: Map(),
  todoListIdsByName: Map(),
  period: Map({
    from: moment().startOf('isoWeek').valueOf(),
    to: moment().endOf('isoWeek').valueOf(),
    mode: 'week',
  }),
  free: false,
});

const reducer = handleActions(
  {
    [setViewMode]: (state, { payload: { from, to, mode } }) =>
      state.update('period', period =>
        period
          .set('from', from)
          .set('to', to)
          .set('mode', mode)),

    [setFreeViewMode]: (state, { payload }) =>
      state.set('free', payload),

    [editPeriod]: (state, { payload: { from, to } }) =>
      state.update('period', period =>
        period
          .set('from', from)
          .set('to', to)),

    [addTag]: (state, { payload }) => {
      const id = shortId.generate();
      const newTag = Map({
        ...payload,
        id,
      });
      return state
        .update('tags', tags => tags.set(id, newTag))
        .update('selectedTags', selectedTags => selectedTags.unshift(id));
    },

    [editTag]: (state, { payload: { id, diff } }) =>
      state.update('tags', tags => {
        return tags.update(id, tag => tag.mergeWith(
          (_, newVal) => newVal,
          Map(diff),
        ));
      }),

    [toggleCreatingNewTag]: (state) =>
      state.update('creatingNewTag', val => !val),

    [toggleTagSelection]: (state, { payload: { id } }) =>
      state.update('selectedTags', selectedTags => {
        if (!selectedTags.includes(id)) {
          return selectedTags.unshift(id);
        } else {
          return selectedTags.delete(selectedTags.indexOf(id));
        }
      }),

    [clearTagsSelection]: (state) =>
      state.update('selectedTags', () => List()),

    [deleteTag]: (state, { payload }) => {
      return state
        .deleteIn(['tags', payload])
        .update('selectedTags', selectedTags => {
          return selectedTags.filter(i => i !== payload);
        });
    },

    [addEvent]: (state, { payload: { event } }) => {
      const id = shortId.generate();
      const day = event.startTs ? moment(event.startTs).startOf('day').valueOf() : -1;
      const internalId = `${day}:${id}`;
      const newEvent = Map({
        ...event,
        internalId,
        id,
      });

      return state.updateIn(['eventsByDay', day], (eventMap = Map()) => (
        eventMap
          .set(id, newEvent)
          .sort((a, b) => a.get('startTs') - b.get('startTs'))
      ));
    },

    [deleteEvent]: (state, { payload: { id } }) => {
      const [day, eventId] = id.split(':');
      return state.deleteIn(['eventsByDay', Number(day), eventId]);
    },

    [editEvent]: (state, { payload: { id, diff } }) => {
      const [day, eventId] = id.split(':');
      return state.updateIn(['eventsByDay', Number(day), eventId], (eventMap) => {
        return eventMap.merge(Map(diff));
      });
    },

    [placeEventOnDay]: (state, { payload: { event, day } }) =>
      state.withMutations(mutableState => {
        const internalId = `${day}:${event.id}`;
        const startTs = day;
        const endTs = moment(startTs).endOf('day').valueOf();
        const immutableEvent = Map({
          ...event,
          internalId,
          startTs,
          endTs,
          isAllDay: true,
        });

        mutableState.updateIn(['eventsByDay', Number(day)], (dayMap = Map()) => {
          return dayMap
            .update(event.id, () => immutableEvent)
            .sort((a, b) => a.get('startTs') - b.get('startTs'));
        });
        mutableState.deleteIn(['eventsByDay', -1, event.id]);
      }),

    [markEventAs]: (state, { payload: { id, value } }) => {
      const [day, eventId] = id.split(':');
      return state.setIn(['eventsByDay', Number(day), eventId, 'completed'], value);
    },
  },
  defaultState,
);

export default reducer;