import React from 'react';
import classNames from 'classnames';
import Checkbox from '@@/Checkbox';
import Dot from '@@/Tag';
import TimeMark from '@@/TimeMark';
import EventName from '@@/EventName';
import styles from './styles.styl';

class EventRow extends React.PureComponent {
  state = {
    hover: false,
    checked: false,
  }

  static defaultProps = {
    event: {},
  }

  constructor(props) {
    super(props);
    const { event } = this.props;
    this.state.checked = event.checked;
  }

  toggleHover = () => {
    this.setState(state => ({
      hover: !state.hover,
    }));
  }

  toggleChecked = (e) => {
    e && e.stopPropagation();
    const { markEventAs, event } = this.props;
    const { internalId, completed } = event;
    markEventAs(internalId, !completed);
  }

  render() {
    const { hover } = this.state;
    const {
      event,
      className,
      setSidebarState,
      getTagById,
      allDay,
      hideText,
    } = this.props;
    const {
      startTs,
      endTs,
      tagId,
      name,
      type,
      id,
      completed,
    } = event;
    const sidebarType = type === 'todo-item' ? 'new' : 'preview';
    const tag = getTagById(tagId);
    const color = tag ? tag.color : 'rgba(0,0,0,0)';

    return (
      <div
        role='button'
        aria-label='Редактировать событие'
        tabIndex='0'
        className={classNames(className, styles.wrapper, {
          [styles.allDay]: allDay,
        })}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={() => setSidebarState(true, event)}
        onKeyPress={e => (e.keyCode === 13 ? setSidebarState(true, event) : null)}
      >
        <div className={styles.timeWrapper}>
          {allDay ? <span className={styles.allDayTitle}>{hideText ? null : 'На весь день'}</span>
            : <TimeMark start={startTs} end={endTs} />}
        </div>
        <div className={styles.dotWrapper}>
          <Dot color={color} tooltipText={tag ? tag.name : null} />
        </div>
        <div className={styles.titleWrapper}>
          <EventName isChecked={completed}>{name}</EventName>
        </div>
        {type === 'todo-item'
          && (
          <div className={styles.checkboxWrapper}>
            <Checkbox checked={completed} hovered={hover} onChange={this.toggleChecked} />
          </div>
          )}
      </div>
    );
  }
}

export default EventRow;
