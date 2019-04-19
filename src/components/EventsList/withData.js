import { connect } from 'react-redux';
import EventsList from '.';
import {
  selectCreatingNewTag,
  selectDisplayedEvents,
  selectShownEventsPeriod,
  selectTagById,
  editPeriod,
  setViewMode,
  selectMarkedAsSelectedTags,
  toggleCreatingNewTag,
  toggleTagSelection,
  addTag,
  selectAllTags,
  selectFreeDaysMode,
  deleteTag,
  setSidebarState,
  editTag,
  addEvent,
  selectAllEvents,
} from '@/store';

const mapStateToProps = state => ({
  events: selectDisplayedEvents(state),
  allEvents: selectAllEvents(state),
  getTagById: selectTagById(state),
  period: selectShownEventsPeriod(state),
  allTags: selectAllTags(state),
  selectedTags: selectMarkedAsSelectedTags(state),
  creatingNewTag: selectCreatingNewTag(state),
  freeDaysMode: selectFreeDaysMode(state),
  todoLists: [], // selectTodoLists(state),
  todoListIdsByName: {}, // selectTodoListIdsByName(state),
});

const mapDispatchToProps = {
  editPeriod,
  setViewMode,
  toggleCreatingNewTag,
  addTag,
  editTag,
  deleteTag,
  addEvent,
  setSidebarState,
  toggleTagSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
