import { connect } from 'react-redux';
import EventsList from '.';
import { editPeriod, selectShownEventsPeriod } from '@/store';

const mapStateToProps = state => ({
  period: selectShownEventsPeriod(state),
});

const mapDispatchToProps = {
  editPeriod,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
