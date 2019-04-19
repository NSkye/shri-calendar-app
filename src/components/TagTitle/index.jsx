/* eslint-disable */

import React from 'react';
import classNames from 'classnames';
import Icon from '@@/Icon';
import styles from './styles.styl';
import defaultColors from './tagsColors';

const ColorDot = ({
  color,
  onSelect,
  selected,
  ...props
}) => (
  <div
    className={classNames(styles.colorDotWrapper, {
      [styles.colorDotWrapperSelected]: selected,
    })}
    onClick={() => onSelect(color)}
    {...props}
  >
    <div
      style={{ background: color }}
      className={classNames(styles.colorDot, {
        [styles.colorDotSelected]: selected,
      })}
    />
  </div>
);

class TagTitle extends React.PureComponent {
  static defaultProps = {
    placeholder: 'Новая метка для дел',
    colors: defaultColors,
    tag: {},
  }

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    const {
      tag, colors, placeholder, minified,
    } = props;
    const { color, name='' } = tag

    this.state = {
      name,
      currentColor: color || colors[0],
      placeholder,
      minified: Boolean(minified),
    };
  }

  handleEditTitle = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  pickColor = (color) => {
    this.setState({
      currentColor: color,
    });
  }

  switchToEditMode = () => {
    const { minified } = this.state;
    if (!minified) return;

    this.setState({
      minified: false,
    }, () => {
      this.inputRef.current.select();
    });
  }

  toggleSize = () => {
    this.setState(state => ({
      minified: !state.minified,
    }));
  }

  handleCancel = () => {
    const {
      tag: {name, color},
      colors,
      onCancel,
    } = this.props;

    if (onCancel) {
      onCancel();
    }

    this.setState({
      name,
      currentColor: color || colors[0],
      minified: true,
    });
  }

  handleSubmit = () => {
    const { name, currentColor } = this.state;
    const { onCreate, onEdit, tag: { id } } = this.props;
    if (!name) return;
    if (id && onEdit) {
      onEdit({
        id,
        name: name,
        color: currentColor,
      })
    } if (onCreate) {
      onCreate({
        name: name,
        color: currentColor,
      });
    }
    this.toggleSize();
  }
  
  handleNavigation = (e) => {
    const { colors } = this.props;
    const { currentColor } = this.state;
    const pressedNext = e.keyCode === 39;
    const pressedPrev = e.keyCode === 37;

    if (pressedNext) {
      const currentColorIndex = colors.indexOf(currentColor);
      const newColorInex = currentColorIndex + 1 === colors.length ? 0 : currentColorIndex + 1;
      this.setState({
        currentColor: colors[newColorInex],
      });
    }

    if (pressedPrev) {
      const currentColorIndex = colors.indexOf(currentColor);
      const newColorInex = currentColorIndex - 1 < 0 ? colors.length - 1 : currentColorIndex - 1;
      this.setState({
        currentColor: colors[newColorInex],
      });
    }
  }

  render() {
    const {
      name, currentColor, placeholder, minified,
    } = this.state;
    const { colors } = this.props;

    return (
      <div
        className={classNames(styles.wrapper, {
          [styles.minified]: minified,
        })}
        role='button'
        aria-label='Создать новую метку'
        onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
        tabIndex='0'
      >
        <div
          role='button'
          aria-label='Переключиться в режим редактирования'
          tabIndex='0'
          className={styles.inputWrapper}
          onClick={this.switchToEditMode}
          onKeyPress={e => e.keyCode === 13 && this.switchToEditMode()}
          style={{
            borderColor: currentColor,
            background: minified && currentColor,
          }}
        >
          <span className={styles.titleSpan}>{name}</span>
          <input
            ref={this.inputRef}
            placeholder={placeholder}
            value={name}
            tabIndex='0'
            onChange={this.handleEditTitle}
            className={styles.input}
          />
          <Icon name='edit' className={styles.editIcon} />
        </div>
        <div className={styles.colorBar}>
          <div className={styles.colorsWrapper} tabIndex='0' onKeyDown={this.handleNavigation}>
            {colors.map(color => (
              <ColorDot
                key={color}
                color={color}
                selected={currentColor === color}
                onSelect={this.pickColor}
              />
            ))}
          </div>
          <div className={styles.icons}>
            <Icon
              name='check'
              height='15px'
              role='button'
              aria-label='Сохранить'
              tabIndex='0'
              className={classNames(styles.iconSubmit, {
                [styles.disabled]: !name,
              })}
              onClick={this.handleSubmit}
              onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
            />
            <Icon
              name='close-big'
              height='15px'
              className={styles.iconClose}
              onClick={this.handleCancel}
              onKeyPress={e => e.key === 'Enter' && this.handleCancel()}
              role='button'
              aria-label='Отменить'
              tabIndex='0'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TagTitle;