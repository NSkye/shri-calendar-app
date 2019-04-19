import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.styl';

const Tag = (props) => {
  const { color, tooltipText } = props;
  return (
    <div className={styles.tag} style={{ background: color }} data-text={tooltipText || 'Нет метки'} />
  );
};

Tag.propTypes = {
  color: PropTypes.string,
};

Tag.defaultProps = {
  color: '#FFF',
};

export default Tag;
