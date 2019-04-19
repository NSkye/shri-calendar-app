import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import Radio from '@@/Radio';
import Icon from '@@/Icon';
import FlipSwitch from '@@/FlipSwitch';
import styles from './styles.styl';

const radioItems = [
  {
    title: 'Неделя',
    value: 'week',
  },
  {
    title: 'Месяц',
    value: 'month',
  },
];

class ScheduleHeader extends PureComponent {
  state = {
    freeDayMode: true,
  }

  nextPeriod = () => {
    const { period, editPeriod } = this.props;
    const begin = moment(period.from).endOf(period.mode).add(1, 'days').valueOf();
    const end = moment(begin).endOf(period.mode).valueOf();
    editPeriod(begin, end);
  }

  prevPeriod = () => {
    const { period, editPeriod } = this.props;
    const end = moment(period.from).startOf(period.mode).add(-1, 'days').valueOf();
    const begin = moment(end).startOf(period.mode).valueOf();
    editPeriod(begin, end);
  }

  showDate = (from, to) => {
    let start = moment(from).format('D MMMM');
    const end = moment(to).format('D MMMM');
    if (moment(from).month() === moment(to).month()) {
      [start] = start.split(' ');
    }
    const res = `${start} - ${end}`;
    return res;
  }

  toggleViewMode = () => {
    const { period: { from, mode }, setViewMode } = this.props;
    const newMode = (mode === 'week') ? 'month' : 'week';
    const start = moment(from);

    const newFrom = ((start.isoWeekday() === 1) || (newMode === 'month'))
      ? start.startOf(newMode).valueOf()
      : start.add(7, 'days').isoWeekday(1).valueOf();
    const newTo = moment(newFrom).endOf(newMode).valueOf();

    setViewMode(newFrom, newTo, newMode);
  }

  toggleFreeDays = () => {
    const { freeDayMode } = this.state;
    const { setFreeViewMode } = this.props;

    this.setState({
      freeDayMode: !freeDayMode,
    });
    setFreeViewMode(freeDayMode);
  }

  render() {
    const {
      className = '',
      period: { from, to, mode },
      height,
      width,
      selectedTags,
      clearTagsSelection,
    } = this.props;
    const { freeDayMode } = this.state;

    return (
      <div
        className={classNames(className, styles.scheduleHeader)}
        style={{ height, width }}
      >
        {selectedTags.size === 0
          ? (
            <>
              <div className={classNames(styles.container)}>
                <div className={classNames(styles.container)}>
                  <div
                    role='button'
                    aria-label='Предыдущая неделя'
                    tabIndex='0'
                    className={styles.button}
                    onClick={this.prevPeriod}
                    onKeyDown={e => (e.keyCode === 13 ? this.prevPeriod : null)}
                  >
                    <Icon name='arrow' width='12px' />
                  </div>
                  <div
                    role='button'
                    aria-label='Следующая неделя'
                    tabIndex='0'
                    className={styles.button}
                    onClick={this.nextPeriod}
                    onKeyDown={e => (e.keyCode === 13 ? this.nextPeriod : null)}
                  >
                    <Icon name='arrow' width='12px' className={styles.iconReverse} />
                  </div>
                </div>
                <span className={styles.text}>
                  {this.showDate(from, to)}
                </span>
              </div>
              <div className={classNames(styles.container)}>
                <FlipSwitch checked={freeDayMode} onChange={this.toggleFreeDays} size='s'>Свободные дни</FlipSwitch>
                <Radio
                  className={styles.weekToggle}
                  items={radioItems}
                  selected={mode}
                  onChange={this.toggleViewMode}
                />
              </div>
            </>
          )
          : <Icon name='back' className={styles.back} onClick={clearTagsSelection} />
        }
      </div>
    );
  }
}

ScheduleHeader.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

ScheduleHeader.defaultProps = {
  width: undefined,
  height: undefined,
};

export default ScheduleHeader;
