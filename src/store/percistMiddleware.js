import { Set } from 'immutable';
import {
  addTag,
  editTag,
  deleteTag,
  addEvent,
  deleteEvent,
  editEvent,
  placeEventOnDay,
  markEventAs,
} from './reducers/data';

const tagsActions = new Set([
  String(addTag),
  String(editTag),
  String(deleteTag),
]);

const eventsActions = new Set([
  String(addEvent),
  String(deleteEvent),
  String(editEvent),
  String(placeEventOnDay),
  String(markEventAs),
]);

const percistMiddleware = store => next => (action) => {
  next(action);
  if (tagsActions.has(action.type)) {
    const tags = store.getState().getIn(['data', 'tags']).toJS();
    localStorage.setItem('tags', JSON.stringify(tags));
  }
  if (eventsActions.has(action.type)) {
    const events = store.getState().getIn(['data', 'eventsByDay']).toJS();
    localStorage.setItem('events', JSON.stringify(events));
  }
};

export default percistMiddleware;