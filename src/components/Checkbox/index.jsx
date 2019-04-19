import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.styl';
import checkIcon from './icons/check.svg';

const Checkbox = memo((props) => {
  const {
    checked, hovered, onChange, className,
  } = props;
  return (
    <div
      role='checkbox'
      aria-checked={checked}
      tabIndex='0'
      className={classNames(className, styles.checkbox, {
        [styles.checked]: checked,
        [styles.hovered]: hovered,
      })}
      onClick={onChange}
      onKeyDown={e => (e.keyCode === 13 ? onChange() : null)}
    >
      <div className={styles.checkboxLabel}>
        <img src={checkIcon} alt='checked' className={styles.check} />
      </div>
    </div>
  );
});

Checkbox.propTypes = {
  checked: PropTypes.bool,
  hovered: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
  hovered: false,
  onChange: () => {},
};

export default Checkbox;
