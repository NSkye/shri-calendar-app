import moment from 'moment';

const mockedTags = {
  1: {},
  2: {},
  3: {},
};

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function randomTitle() {
  const titles = [
    'Покормить кота',
    'Завоевать мир',
    'Сварить кашу с топором',
    'Покушать булочек',
    'Написать тесты',
    'Завалить дедлайн',
    'Прочитать Кнута',
    'Помыть раму',
    'Научиться летать',
    'Изобрести вечный двигатель',
    'Стать котом',
    'Выпить',
    'Изобрести новый способ умереть',
    'Вернуть стену',
    'Попинать Олега',
    'Заварить дошик',
    'Поесть бесплатной пиццы',
    'Написать неподдерживаемый код',
    'Напиться',
    'Придумать новый гендер',
    'Очнуться',
  ];
  return titles[randomInteger(0, titles.length - 1)];
}

function randonType() {
  const types = ['todo-item', 'event'];
  return types[randomInteger(0, 1)];
}

function randomTagId() {
  const ids = Object.keys(mockedTags);
  return ids[randomInteger(0, ids.length - 1)];
}

let id = 1;

function createRandomEvent(ts) {
  const maxTs = moment(ts).endOf('day').valueOf();
  const startTs = moment(ts)
    .add(randomInteger(0, 24), 'hour')
    .subtract(randomInteger(0, 60), 'minute')
    .valueOf();
  let endTs = randomInteger(startTs, maxTs);
  const name = randomTitle();
  const type = randonType();
  let isAllDay = false;
  if (type === 'event') {
    isAllDay = randomInteger(0, 1) > 0;
    if (isAllDay) {
      endTs = moment(maxTs).add(randomInteger(1, 3), 'days').valueOf();
    }
  }
  const tagId = randomTagId();

  const event = {
    name,
    startTs,
    endTs,
    type,
    tagId,
    isAllDay,
    id: id += 1,
  };

  if (type === 'todo-item') {
    event.isCompleted = randomInteger(0, 1) > 0;
    delete event.endTs;
  }
  return event;
}

const standartFrom = moment().startOf('month').valueOf();
const standertTo = moment().endOf('month').valueOf();

function createRandomEvents(from = standartFrom, to = standertTo, minCount = 6, maxCount = 50) {
  const randomEventsCount = randomInteger(minCount, maxCount);
  const events = [];

  for (let i = 0; i < randomEventsCount; i += 1) {
    const randomTs = randomInteger(from, to);
    events.push(createRandomEvent(randomTs));
  }

  return events.sort((a, b) => a.startTs - b.startTs);
}

export {
  mockedTags as tags,
  createRandomEvents,
  createRandomEvent,
};
