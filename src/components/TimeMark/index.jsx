import React from 'react';
import styles from './styles.styl';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import dateType from '@/helpers/propTypes/date';

const TimeMark = (props) => {
  const {
    start, end, isActive, isCurrent, className,
  } = props;
  const startTime = moment(start).format('H:mm');
  const endTime = end && `${moment(end).format('H:mm')}`;
  const hyphen = end && <React.Fragment>&#8208;</React.Fragment>;

  return (
    <time className={classNames(styles.timeMark, {
      [styles.inactive]: !isActive,
      [styles.current]: isCurrent,
    }, className)}
    >
      { startTime }
      { hyphen }
      { endTime }
    </time>
  );
};

TimeMark.defaultProps = { isActive: true, isCurrent: false, end: null };

TimeMark.propTypes = {
  start: dateType.isRequired,
  end: dateType,
  isActive: PropTypes.bool,
  isCurrent: PropTypes.bool,
};

export default TimeMark;