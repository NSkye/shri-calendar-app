import { connect } from 'react-redux';
import ScheduleHeader from '.';
import {
  editPeriod,
  setViewMode,
  setFreeViewMode,
  selectShownEventsPeriod,
  selectMarkedAsSelectedTags,
  clearTagsSelection,
} from '@/store';

const mapStateToProps = state => ({
  period: selectShownEventsPeriod(state),
  selectedTags: selectMarkedAsSelectedTags(state),
});

const mapDispatchToProps = {
  editPeriod,
  setViewMode,
  setFreeViewMode,
  clearTagsSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleHeader);
