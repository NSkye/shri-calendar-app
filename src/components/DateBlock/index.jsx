import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import classnames from 'classnames';
import styles from './styles.styl';
import dateType from '@/helpers/propTypes/date';

const DateBlock = ({ date, small, className }) => {
  const isCurrent = moment(date).format('l') === moment().format('l');
  const [dateLeft, dateRight] = moment(date).format('D dd').split(' ');
  return (
    <div className={classnames(className, styles.wrapper)}>
      <div className={classnames(styles.dateTop, {
        [styles.current]: isCurrent,
        [styles.small]: small,
      })}
      >
        <span className={styles.day}>{dateLeft}</span>
        <span className={styles.month}>
          {' '}
          {dateRight}
        </span>
      </div>
    </div>
  );
};

DateBlock.propTypes = {
  date: dateType.isRequired,
};

export default DateBlock;