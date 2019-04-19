import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'lego-on-react';
import DatePicker from 'react-datepicker';
import Radio from '@@/Radio';
import Icon from '@@/Icon';
import AttendeesInfo from '@@/AttendeesInfo';
import LayerSelect from '@@/LayersSelect';
import styles from './styles.styl';

const radioItems = [
  {
    title: 'Событие',
    value: 'event',
  },
  {
    title: 'Дело',
    value: 'todo-item',
  },
];

const createCleanState = (props) => {
  const { selectedTag } = props;
  return {
    name: '',
    type: 'todo-item',
    selectedDate: null,
    selectedTime: null,
    selectedTag: selectedTag || {},
    editingEvent: null,

    fromDate: new Date(),
    fromTime: null,

    toDate: new Date(),
    toTime: null,
  };
};

const createState = (props) => {
  const { selectedEvent } = props;
  return {
    name: selectedEvent.name || '',
    selectedDate: new Date(selectedEvent.startTs),
    selectedTime: new Date(selectedEvent.startTs),
    fromDate: new Date(selectedEvent.startTs),
    fromTime: new Date(selectedEvent.startTs),
    toDate: new Date(selectedEvent.endTs || Date.now()),
    toTime: new Date(selectedEvent.endTs || Date.now()),
    selectedTag: selectedEvent.tagId,
    editingEvent: selectedEvent,
    type: selectedEvent.type,
  };
};

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = createCleanState(props);
  }

  static getDerivedStateFromProps(props, state) {
    const { selectedEvent = null } = props;
    if (selectedEvent === state.editingEvent) { return null; }
    if (selectedEvent === null) {
      return createCleanState(props);
    }
    return createState(props);
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleClear = () => {
    this.setState({
      name: '',
    });
  }

  handleChange = name => (value) => {
    this.setState({
      [name]: value,
    });
  }

  handleCreateTodo = () => {
    const {
      selectedTag,
      name,
      selectedDate,
    } = this.state;
    const {
      addEvent,
    } = this.props;
    const tagId = Array.isArray(selectedTag) ? selectedTag[0] : selectedTag;

    addEvent({
      name,
      type: 'todo-item',
      completed: false,
      startTs: selectedDate && selectedDate.getTime(),
      endTs: selectedDate && selectedDate.getTime(),
      isAllDay: true,
      tagId,
    });
  }

  handleEditTodo = () => {
    const {
      editingEvent,
      selectedTag,
      name,
      selectedDate,
    } = this.state;
    const { editEvent } = this.props;
    const tagId = Array.isArray(selectedTag) ? selectedTag[0] : selectedTag;

    editEvent(editingEvent.internalId, {
      name,
      startTs: selectedDate.getTime(),
      endTs: selectedDate.getTime(),
      tagId,
    });
  }

  handleCreateEvent = () => {
    const {
      addEvent,
    } = this.props;
    const {
      fromDate,
      fromTime,
      toDate,
      toTime,
      selectedTag,
      name,
    } = this.state;

    const mFromDate = moment(fromDate)
      .hours(moment(fromTime).hours())
      .minutes(moment(fromTime).minutes());

    const mToDate = moment(toDate)
      .hours(moment(toTime).hours())
      .minutes(moment(toTime).minutes());

    const tagId = Array.isArray(selectedTag) ? selectedTag[0] : selectedTag;

    addEvent({
      type: 'event',
      name,
      startTs: mFromDate.valueOf(),
      endTs: mToDate.valueOf(),
      isAllDay: false,
      tagId,
    });
  }

  handleEditEvent = () => {
    const {
      editEvent,
    } = this.props;
    const {
      fromDate,
      fromTime,
      toDate,
      toTime,
      selectedTag,
      name,
      editingEvent,
    } = this.state;

    const tagId = Array.isArray(selectedTag) ? selectedTag[0] : selectedTag;

    const [
      fhour, fminute,
      thour, tminute,
    ] = [
      moment(fromTime).hours(), moment(fromTime).minutes(),
      moment(toTime).hours(), moment(toTime).minutes(),
    ];

    editEvent(editingEvent.internalId, {
      name,
      startTs: moment(fromDate).hours(fhour).minutes(fminute).valueOf(),
      endTs: moment(toDate).hours(thour).minutes(tminute).valueOf(),
      tagId,
    });
  }

  handleClose = () => {
    const { onClose } = this.props;
    this.setState(createCleanState(this.props));
    onClose();
  }

  handleSubmit = () => {
    const { editingEvent, type } = this.state;
    const creatingNew = !(editingEvent && editingEvent.id);

    if (type === 'todo-item') {
      if (creatingNew) {
        this.handleCreateTodo();
      } else {
        this.handleEditTodo();
      }
    }
    if (type === 'event') {
      if (creatingNew) {
        this.handleCreateEvent();
      } else {
        this.handleEditEvent();
      }
    }
    this.handleClose();
  }

  handleDelete = () => {
    const { editingEvent } = this.state;
    const { internalId } = editingEvent;
    const { deleteEvent } = this.props;

    deleteEvent(internalId);
    this.handleClose();
  }

  renderTodoDates = () => {
    const { selectedDate, selectedTime } = this.state;
    const isAllDay = true;

    return (
      <div className={styles.datesGroup}>
        <div className={styles.dateWrapper}>
          <DatePicker
            placeholderText='Без даты'
            className={styles.dateInput}
            selected={selectedDate}
            dateFormat='d/MM/YY'
            onChange={this.handleChange('selectedDate')}
          />
          <Icon name='calend' className={styles.calendIcon} />
        </div>
        <div className={styles.dateWrapper}>
          <DatePicker
            className={styles.timeInput}
            selected={selectedTime}
            onChange={this.handleChange('selectedTime')}
            showTimeSelect
            showTimeSelectOnly
            disabled={isAllDay}
            timeIntervals={15}
            dateFormat='HH:mm'
            timeCaption='Время'
          />
          <Icon name='time' className={styles.timeIcon} />
        </div>
      </div>
    );
  }

  renderEventDates = () => {
    const {
      fromDate,
      fromTime,
      toDate,
      toTime,
    } = this.state;
    const { selectedEvent } = this.props;
    const isAllDay = selectedEvent && selectedEvent.isAllDay;
    return (
      <div className={styles.eventDates}>
        <div className={styles.datesGroup}>
          <div className={styles.dateWrapper}>
            <DatePicker
              className={styles.dateInput}
              selected={fromDate}
              dateFormat='d/MM/YY'
              placeholderText='Без даты'
              onChange={this.handleChange('fromDate')}
            />
            <Icon name='calend' className={styles.calendIcon} />
          </div>
          <div className={styles.dateWrapper}>
            <DatePicker
              className={styles.timeInput}
              selected={fromTime}
              onChange={this.handleChange('fromTime')}
              showTimeSelect
              disabled={isAllDay}
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat='HH:mm'
              timeCaption='Время'
            />
            <Icon name='time' className={styles.timeIcon} />
          </div>
        </div>
        <span className={styles.datesLine}>一</span>
        <div className={styles.datesGroup}>
          <div className={styles.dateWrapper}>
            <DatePicker
              className={styles.dateInput}
              selected={toDate}
              dateFormat='d/MM/YY'
              placeholderText='Без даты'
              onChange={this.handleChange('toDate')}
            />
            <Icon name='calend' className={styles.calendIcon} />
          </div>
          <div className={styles.dateWrapper}>
            <DatePicker
              className={styles.timeInput}
              selected={toTime}
              onChange={this.handleChange('toTime')}
              showTimeSelect
              showTimeSelectOnly
              disabled={isAllDay}
              timeIntervals={15}
              dateFormat='HH:mm'
              timeCaption='Время'
            />
            <Icon name='time' className={styles.timeIcon} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { tags, selectedEvent } = this.props;
    const {
      type, name, selectedTag,
    } = this.state;

    const isNew = !selectedEvent || !selectedEvent.id;
    const typeName = type === 'todo-item' ? 'дело' : 'событие';
    const submitButtonText = `${isNew ? 'Создать' : 'Сохранить'} ${typeName}`;

    const availableItems = radioItems.filter(i => isNew || i.value === type);

    return (
      <div>
        <Radio items={availableItems} selected={type} onChange={this.handleChange('type')} />
        <div className={styles.inputWrapper}>
          <input
            value={name}
            type='text'
            className={styles.nameInput}
            onChange={this.handleChangeName}
            placeholder={type === 'todo-item' ? 'Новое дело' : 'Новое событие'}
          />
          {
            name && (
              <span
                role='button'
                aria-label='очистить поле'
                tabIndex='0'
                className={styles.inputClose}
                onClick={this.handleClear}
                onKeyDown={e => (e.keyCode === 13 ? this.handleClear() : null)}
              />
            )
          }
        </div>
        <h3 className={styles.title}>Дата и время</h3>
        {type === 'todo-item' ? this.renderTodoDates() : this.renderEventDates()}
        <span className={styles.settingsItem}>
          <Icon name='norepeat' className={styles.settingsItemIcon} />
          Без повторений
        </span>
        <span className={styles.settingsItem}>
          <Icon name='notification' className={styles.settingsItemIcon} />
          Без напоминаний
        </span>
        {selectedEvent && selectedEvent.organizer && (
          <AttendeesInfo
            className={styles.attendeesInfo}
            organizer={selectedEvent.organizer.toJS()}
            attendees={selectedEvent.attendees.toJS()}
          />
        )
        }
        <h3 className={styles.title}>метка</h3>
        <LayerSelect
          theme='normal'
          size='s'
          width='max'
          type='radio'
          val={selectedTag}
          onChange={this.handleChange('selectedTag')}
        >
          {tags.map(tag => (
            <LayerSelect.Item
              key={tag.id}
              val={tag.id}
              color={tag.color}
            >
              {tag.name}
            </LayerSelect.Item>
          ))
          }
        </LayerSelect>
        <div className={styles.buttons}>
          <Button
            theme='action'
            size='s'
            view='default'
            tone='default'
            text={submitButtonText}
            className={styles.button}
            onClick={this.handleSubmit}
          />
          <Button
            theme='normal'
            size='s'
            view='default'
            tone='default'
            text='Отменить'
            onClick={this.handleClose}
          />
          <button
            type='button'
            className={styles.trashButton}
            onClick={this.handleDelete}
          >
            <Icon
              name='trash'
              className={styles.tagIcon}
              height='16px'
              width='16px'
            />
          </button>
        </div>
      </div>
    );
  }
}

export default NewEvent;
