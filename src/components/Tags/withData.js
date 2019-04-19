import { connect } from 'react-redux';
import Tags from '.';
import {
  selectAllTags, selectMarkedAsSelectedTags, toggleTagSelection,
} from '@/store';

const mapStateToProps = state => ({
  data: selectAllTags(state),
  selectedTags: selectMarkedAsSelectedTags(state),
});

const mapDispatchToProps = {
  toggleTagSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);