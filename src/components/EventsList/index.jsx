import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TagTitle from '@@/TagTitle';
import styles from './styles.styl';
import renderGroupedEvents from './renderGroupedEvents';
import renderEventsForPeriod from './renderEventsForPeriod';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.renderEventsForPeriod = renderEventsForPeriod.bind(this);
    this.renderGroupedEvents = renderGroupedEvents.bind(this);
  }

  handleCreateNewTag = (tag) => {
    const {
      addTag,
      toggleCreatingNewTag,
    } = this.props;
    addTag(tag);
    toggleCreatingNewTag();
  }

  handleEditTag = (tag) => {
    const {
      editTag,
    } = this.props;

    editTag(tag.id, tag);
  }

  renderNewTag = () => {
    const {
      toggleCreatingNewTag,
    } = this.props;

    return (
      <div className={styles.newTagWrapper}>
        <TagTitle
          placeholder='Новая метка для дел'
          onCreate={this.handleCreateNewTag}
          onEdit={this.handleEditTag}
          onCancel={() => toggleCreatingNewTag()}
        />
      </div>
    );
  }

  render() {
    const {
      selectedTags,
      creatingNewTag,
      className,
    } = this.props;

    const isSelectedTags = selectedTags.size > 0;

    if (isSelectedTags || creatingNewTag) {
      return (
        <div className={className}>
          {creatingNewTag && this.renderNewTag()}
          {this.renderGroupedEvents()}
        </div>
      );
    }
    return (
      <div className={className}>
        {this.renderEventsForPeriod()}
      </div>
    );
  }
}

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startTs: PropTypes.number,
    endTs: PropTypes.number,
    checked: PropTypes.bool,
    tagId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
  })),
};

EventsList.defaultProps = {
  events: [],
};

export default EventsList;
