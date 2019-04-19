import React from 'react';
import Icon from '@@/Icon';
import classNames from 'classnames';
import NewEvent from '@@/NewEvent/withData';
import styles from './styles.styl';

const RightSide = (props) => {
  const { opened, toggleSidebar } = props;
  return (
    <div className={classNames(styles.right, {
      [styles.closed]: !opened,
    })}
    >
      <Icon name='close-big' className={styles.closeBtn} onClick={() => toggleSidebar()} />
      <NewEvent onClose={toggleSidebar} />
    </div>
  );
};

export default RightSide;