import { connect } from 'react-redux';
import RightSidebar from '.';
import {
  setSidebarState, toggleSidebar, selectSidebarState,
} from '@/store';

const mapStateToProps = state => ({
  opened: selectSidebarState(state),
});

const mapDispatchToProps = {
  setSidebarState,
  toggleSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);