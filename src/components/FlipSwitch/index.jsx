import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import styles from './styles.styl';

class FlipSwitch extends PureComponent {
  render() {
    const {
      children, size, fontSize, checked, onChange, className,
    } = this.props;

    return (
      <div className={styles.container}>
        <div
          role='checkbox'
          aria-checked={checked}
          tabIndex='0'
          className={classNames(
            className,
            styles.flipswitch,
            styles[`size-${size}`],
            { [styles.checked]: checked },
          )}
          onClick={onChange}
          onKeyPress={e => e.keyCode === 13 && onChange()}
        >
          <input className={classNames(styles.checkbox)} type='checkbox' checked={checked} readOnly />
          <div className={classNames(styles.label)}>
            <div className={classNames(styles.inner)} />
            <div className={classNames(styles.switch)} />
          </div>
        </div>
        <span className={classNames(styles.title)} style={{ fontSize }}>{children}</span>
      </div>
    );
  }
}

FlipSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  fontSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  size: PropTypes.oneOf(
    Object.keys(styles)
      .filter(cn => /^size-/i.test(cn))
      .map(cn => cn.slice(5)),
  ),
};

FlipSwitch.defaultProps = {
  size: 's',
  fontSize: '13px',
  onChange: () => { },
  className: null,
};

export default FlipSwitch;
