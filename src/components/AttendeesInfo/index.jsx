import React from 'react';
import map from 'lodash/map';
import styles from './styles.styl';
import 'moment/locale/ru';

const Badge = ({
  name,
  email,
  login,
  img = 'https://www.dictionary.com/e/wp-content/uploads/2018/03/Thinking_Face_Emoji-Emoji-Island.png',
}) => (
  <div className={styles.badge}>
    <img src={img} className={styles.badgeImg} alt='' />
    <span className={styles.badgeName}>{name || login || email}</span>
  </div>
);

const Badges = ({ data }) => (
  <div className={styles.badges}>
    {map(data, item => <Badge {...item} key={item.email} />)}
  </div>
);

const AttendeesInfo = ({ organizer, attendees, className }) => {
  return (
    <div className={className}>
      <div className={styles.fieldWrap}>
        <span className={styles.fieldLabel}>Организатор</span>
        <Badge {...organizer} withoutStatus />
      </div>
      <div className={styles.fieldWrap}>
        <span className={styles.fieldLabel}>Участники</span>
        <Badges data={attendees} />
      </div>
    </div>
  );
};

export default AttendeesInfo;