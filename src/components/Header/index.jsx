import React from 'react';
import styles from './styles.styl';

const Header = () => (
  <div className={styles.wrapper}>
    <div>
      <a className={styles.link} href='https://yandex.ru'>
        <img src='https://yastatic.net/q/logoaas/v1/Яндекс.svg' alt='Яндекс' />
      </a>
      <a className={styles.service} href='/'>
        <img src='https://yastatic.net/q/logoaas/v1/Календарь.svg' alt='Календарь' />
      </a>
    </div>
  </div>
);

export default Header;