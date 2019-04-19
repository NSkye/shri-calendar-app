import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import styles from './styles.styl';

class EventName extends PureComponent {
  render() {
    const { children, isChecked, className } = this.props;

    return (
      <div className={classNames(
        className,
        styles.eventName,
        { [styles.checked]: isChecked },
      )}
      >
        {children}
      </div>
    );
  }
}

EventName.propTypes = {
  isChecked: PropTypes.bool,
};

EventName.defaultProps = {
  isChecked: false,
};

export default EventName;
