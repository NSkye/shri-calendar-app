import React from 'react';
import groupBy from 'lodash/groupBy';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '@/draggableTypes';
import cn from 'classnames';
import Icon from '@@/Icon';
import styles from './styles.styl';

const dragHandler = {
  beginDrag({ data }) {
    return data;
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    props.handleEndDrag(item, dropResult);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const CARD_WIDTH = 170;
const CARD_HEIGHT = 100;

const Card = ({
  data,
  connectDragSource,
  isDragging,
  handleEndDrag,
  ...props
}) => connectDragSource(
  <div className={cn(styles.card, { [styles.cardDragging]: isDragging })} {...props}>
    {data.color
      ? <span className={styles.colorDot} style={{ background: `${data.color}` }} />
      : null
    }
    <span className={styles.cardTitle}>{data.name}</span>
    <Icon name='six-dots' width='14px' height='20px' className={styles.dragIcon} />
  </div>,
);

const DraggableCard = DragSource(ItemTypes.EVENT, dragHandler, collect)(Card);

function positionInSameColorArray(cardIndex, cards, color) {
  const current = cards[cardIndex];
  const groupedByColor = groupBy(cards, 'color');
  const elementsWithPickedColor = groupedByColor[color];

  if (!Array.isArray(elementsWithPickedColor)) {
    return false;
  }
  const index = elementsWithPickedColor.indexOf(current);

  return {
    index,
    column: index % 2 === 0 ? 0 : 1,
    row: Math.floor(index / 2) + (elementsWithPickedColor.length === cards.length ? 0 : 1),
  };
}

function needGroupByColor(cards) {
  const colors = {};
  let result = false;

  Object.values(cards).find((item) => {
    if (item.color in colors) {
      colors[item.color] += 1;
      if (colors[item.color] >= 2) {
        result = true;
        return true;
      }
    } else {
      colors[item.color] = 1;
    }
    return false;
  });

  return result;
}

const DeleteZone = ({
  connectDropTarget,
  isOver,
  isDragging,
  ...props
}) => connectDropTarget(
  <div
    className={cn(styles.deleteZone, {
      [styles['deleteZone--active']]: isDragging,
      [styles['deleteZone--over']]: isOver,
    })}
    {...props}
  >
    <Icon
      name='trash'
      className={styles.deleteIcon}
      height='18px'
      width='18px'
    />
  </div>,
);

const dragZoneSpec = {
  drop() {
    return {
      action: 'delete', // Удаляем карточку
    };
  },
};

function collectDeleteZone(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isDragging: !!monitor.getItem(),
  };
}

const DeleteZoneDragTarget = DropTarget(ItemTypes.EVENT, dragZoneSpec, collectDeleteZone)(DeleteZone);
class Doings extends React.Component {
  state = {
    expanded: false,
    pickedColor: null,
  };

  handleExpand = (color) => {
    this.setState(state => ({
      pickedColor: color,
      expanded: !state.expanded,
    }));
  };

  handleEndDrag = (item, dropResult) => {
    const { deleteEvent, placeEventOnDay } = this.props;

    switch (dropResult.action) {
      case 'delete':
        deleteEvent(item.internalId);
        break;
      case 'move':
        placeEventOnDay(item, dropResult.day);
        break;
      default:
        throw new Error(`unknown action: ${dropResult.action}`);
    }
  }

  calcTransform(index, color) {
    const { expanded, pickedColor } = this.state;
    const { data: cards } = this.props;
    let nextIndex = index;
    if (expanded) { // для расхлопнутого вида
      if (!needGroupByColor(cards)) { // менее двух одинаковых меток
        const row = Math.floor(index / 2);
        const column = index % 2 === 0 ? 0 : 1;
        return `translateX(${column * (CARD_WIDTH + 15)}px) translateY(${row * (CARD_HEIGHT + 15)}px)`;
      }
      const position = positionInSameColorArray(nextIndex, cards, pickedColor);
      if (!position) { // если нет меток с выбранным цветом
        this.setState({
          expanded: false,
        });
        return '';
      }
      const { column, row } = position;
      if (color !== pickedColor) { // отступ для оставшихся в стопке
        const ungrouped = cards.filter(i => i.color !== pickedColor);
        nextIndex = ungrouped.indexOf(cards[nextIndex]);
        return `translateX(${nextIndex * 15}px)`;
      }
      return `translateX(${column * (CARD_WIDTH + 15)}px) translateY(${row * (CARD_HEIGHT + 15)}px)`;
    } // для схлопнутого вида
    return `translateX(${nextIndex * 20}px)`;
  }

  render() {
    const { data: cardsData } = this.props;
    const { expanded } = this.state;

    return (
      <div className={cn(styles.doingsWrapper, { expanded })}>
        {cardsData.length === 0 && (
          <div className={styles.noTodos}>
            <div className={styles.noTodosImgWrapper}>
              <div className={styles.noTodosImg} />
            </div>
            <span className={styles.noTodosText}>
              Все отлично cпланировано, так держать!
            </span>
          </div>
        )}
        {cardsData.map((card, index) => {
          const zIndex = cardsData.length - index;
          return (
            <DraggableCard
              handleEndDrag={this.handleEndDrag}
              onClick={() => this.handleExpand(card.color)}
              key={card.id}
              data={card}
              style={{
                transform: this.calcTransform(index, card.color),
                zIndex,
              }}
            />
          );
        })}
        <DeleteZoneDragTarget />
      </div>
    );
  }
}

export default Doings;
