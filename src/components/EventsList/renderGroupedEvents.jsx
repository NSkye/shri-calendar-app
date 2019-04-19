/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import map from 'lodash/map';
import TagTitle from '@@/TagTitle';
import Icon from '@@/Icon';
import DayWithEvents from './DayWithEvents';
import groupEventsByTags from './groupEventsByTags';
import styles from './styles.styl';

export default function renderGroupedEvents() {
  const {
    allEvents,
    getTagById,
    deleteTag,
    selectedTags,
    period,
    setSidebarState,
  } = this.props;

  let groupedEvents = groupEventsByTags(allEvents, selectedTags, period.to);

  groupedEvents = map(
    Object.entries(groupedEvents),
    ([tag, items]) => ([getTagById(tag), items]),
  );

  const handleDeleteTag = (id) => deleteTag(id);

  const handleAdd = (tagId) => {
    setSidebarState(true, { tagId, type: 'todo-item', startTs: Date.now() }, { selectedTag: tagId });
  };

  return (
    <div>
      {map(groupedEvents, ([tag, days]) => (
        <div key={tag.id}>
          <div className={styles.tagHeader}>
            <TagTitle
              tag={tag}
              placeholder=''
              minified
              onEdit={this.handleEditTag}
            />
            <div className={styles.tagIcons}>
              <Icon name='share' className={styles.tagIcon} height='16px' width='16px' />
              <Icon name='print' className={styles.tagIcon} height='16px' width='16px' />
              <Icon
                name='trash'
                className={styles.tagIcon}
                height='16px'
                width='16px'
                onClick={() => handleDeleteTag(tag.id)}
              />
            </div>
          </div>
          {
            map(
              Object.entries(days),
              ([timestamp, { events, allDayEvents }]) => (
                <DayWithEvents
                  events={events}
                  allDayEvents={allDayEvents}
                  day={Number(timestamp)}
                  key={timestamp}
                />
              ),
            )
          }
          <span className={styles.newItem}>
            <Icon name='plus' />
            <span
              className={styles.newItemTitle}
              onClick={() => handleAdd(tag.id)}
            >
              Новое дело с меткой «
              {tag.name}
              »
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
