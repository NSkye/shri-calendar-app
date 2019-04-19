import React from 'react';
import Doings from '.';
import { connect } from 'react-redux';
import {
  selectEventsWithoutTime,
  selectTagById,
  placeEventOnDay,
  deleteEvent,
} from '@/store';

const mapStateToProps = state => ({
  data: selectEventsWithoutTime(state)
    .map(i => {
      const tag = selectTagById(state)(i.tagId);
      return {
        ...i,
        color: tag && tag.color,
      };
    }),
});

const mapDispatchToProps = {
  placeEventOnDay,
  deleteEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Doings);