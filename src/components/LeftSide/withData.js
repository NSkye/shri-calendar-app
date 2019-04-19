import { connect } from 'react-redux';
import LeftSidebar from '.';
import {
  selectCreatingNewTag,
  setSidebarState,
  toggleSidebar,
  toggleCreatingNewTag,
} from '@/store';

const mapStateToProps = state => ({
  creatingNewTag: selectCreatingNewTag(state),
});

const mapDispatchToProps = {
  setSidebarState,
  toggleSidebar,
  toggleCreatingNewTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);