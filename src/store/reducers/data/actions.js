import { createActions } from 'redux-actions';

const {
  setViewMode,
  setFreeViewMode,
  editPeriod,
  toggleCreatingNewTag,
  clearTagsSelection,
  toggleTagSelection,
  addTag,
  editTag,
  deleteTag,
  addEvent,
  editEvent,
  deleteEvent,
  placeEventOnDay,
  markEventAs,
} = createActions({
  SET_VIEW_MODE: (from, to, mode = 'week') => ({ from, to, mode }),
  SET_FREE_VIEW_MODE: (value) => value,
  EDIT_PERIOD: (from, to) => ({ from, to }),

  TOGGLE_TAG_SELECTION: (id, value) => ({ id, value }),
  CLEAR_TAGS_SELECTION: () => {},
  TOGGLE_CREATING_NEW_TAG: () => {},
  ADD_TAG: (tag) => tag,
  EDIT_TAG: (id, diff) => ({ id, diff }),
  DELETE_TAG: (id) => id,

  ADD_EVENT: (event) => ({ event }),
  EDIT_EVENT: (id, diff) => ({ id, diff }),
  DELETE_EVENT: (id) => ({ id }),
  PLACE_EVENT_ON_DAY: (event, day) => ({ event, day }),
  MARK_EVENT_AS: (id, value) => ({ id, value }),
});

export {
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
  editEvent,
  deleteEvent,
  placeEventOnDay,
  markEventAs,
};
