import { connect } from 'react-redux';
import NewEvent from '.';
import {
  selectAllTags,
  selectTagById,
  addEvent,
  editEvent,
  deleteEvent,
  selectSidebarDisplayedEvent,
} from '@/store';

const mapStateToProps = state => ({
  tags: selectAllTags(state),
  selectedEvent: selectSidebarDisplayedEvent(state),
  getTagById: selectTagById(state),
});

const mapDispatchToProps = {
  editEvent,
  deleteEvent,
  addEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);