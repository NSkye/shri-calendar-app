import { connect } from 'react-redux';
import {
  setSidebarState,
} from '@/store';
import EventRow from '.';

const mapDispatchToProps = {
  setSidebarState,
};

export default connect(null, mapDispatchToProps)(EventRow);