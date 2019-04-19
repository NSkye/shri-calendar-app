import React, { PureComponent } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';
import classNames from 'classnames';
import moment from 'moment';

registerLocale('ru', ru);
setDefaultLocale('ru');
class Calendar extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleClick = (date) => {
    const { period, editPeriod } = this.props;
    const from = moment(date).startOf(period.mode).valueOf();
    const to = moment(date).endOf(period.mode).valueOf();
    editPeriod(from, to);
    this.setState({
      selectedDate: date,
    });
  };

  render() {
    const { className } = this.props;
    const { selectedDate } = this.state;

    return (
      <div className={classNames(className)}>
        <DatePicker
          locale='ru'
          inline
          selected={selectedDate}
          onChange={this.handleClick}
        />
      </div>
    );
  }
}

export default Calendar;
