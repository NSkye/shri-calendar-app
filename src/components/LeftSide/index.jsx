import React from 'react';
import Button from '@@/EventButton';
import Expand from '@@/Expand';
import Tags from '@@/Tags/withData';
import Icon from '@@/Icon';
import Calendar from '@@/Calendar/withData';
import styles from './styles.styl';

const NewItem = ({ children, ...props }) => (
  <div className={styles.newItem} {...props}>
    <Icon height='16px' name='plus' />
    <span className={styles.newItemText}>{children}</span>
  </div>
);

const LeftSide = ({
  setSidebarState,
  toggleCreatingNewTag,
  creatingNewTag,
}) => {
  const handleClick = () => {
    setSidebarState(true);
  };

  return (
    <aside className={styles.aside}>
      <Button onClick={handleClick}>Создать</Button>
      <Calendar className={styles.calendar} />
      <Expand title='Метки' className={styles.expand}>
        <Tags />
      </Expand>
      {!creatingNewTag && <NewItem onClick={toggleCreatingNewTag}>Новая метка</NewItem>}
    </aside>
  );
};


export default LeftSide;