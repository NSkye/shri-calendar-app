import React from 'react';
import styles from './styles.styl';
import TimeMark from '@@/TimeMark';
import dateType from '@/helpers/propTypes/date';

const CurrentTime = (props) => {
  const { time } = props;
  return (
    <div className={styles.currentTime}>
      <TimeMark start={time} isCurrent />
    </div>
  );
};

CurrentTime.propTypes = {
  time: dateType.isRequired,
};

export default CurrentTime;