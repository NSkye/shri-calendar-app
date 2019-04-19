import React from 'react';
import './App.css';
import './assets/fonts/stylesheet.css';
import EventsList from '@@/EventsList/withData';
import Doings from '@@/Doings/withData';
import ScheduleHeader from '@@/ScheduleHeader/withData';
import LeftSide from '@@/LeftSide/withData';
import RightSide from '@@/RightSide/withData';
import styles from './layout.styl';
import { connect } from 'react-redux';
import { selectEventsCountWithoutDate } from '@/store';

const mapStateToProps = state => ({
  eventsWithoutDateCount: selectEventsCountWithoutDate(state),
});

const App = () => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <LeftSide />
      <main className={styles.main}>
        <div className={styles.todo}>
          <ScheduleHeader className={styles.scheduleHeader} />
          <EventsList className={styles.eventList} />
        </div>
        <div className={styles.right}>
          <RightSide />
          <div className={styles.doingsBlock}>
            <h3 className={styles.doingsText}>Дела без срока</h3>
            <Doings />
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default connect(mapStateToProps)(App);
