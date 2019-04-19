import { connect } from 'react-redux';
import {
  setSidebarState,
  selectTagById,
  markEventAs,
} from '@/store';
import EventRow from '.';

const mapStateToProps = state => ({
  getTagById: selectTagById(state),
});

const mapDispatchToProps = {
  setSidebarState,
  markEventAs,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventRow);