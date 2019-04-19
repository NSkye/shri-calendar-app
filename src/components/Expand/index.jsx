import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '@@/Icon';
import styles from './styles.styl';

class Expand extends PureComponent {
  state = {
    toggled: false,
  }

  handleToggle = () => {
    this.setState(state => ({
      toggled: !state.toggled,
    }));
  }

  render() {
    const { children, title, className } = this.props;
    const { toggled } = this.state;
    return (
      <div className={classNames(styles.wrapper, className)}>
        <div
          role='checkbox'
          aria-checked={toggled}
          aria-label='Переключить'
          tabIndex='0'
          className={styles.blockTitle}
          onClick={() => this.handleToggle}
          onKeyPress={e => (e.keyCode === 13 ? this.handleToggle : null)}
        >
          <span className={styles.title}>{title}</span>
          <Icon
            name='arrow'
            className={classNames(styles.arrow, {
              [styles.arrowReverse]: !toggled,
            })}
          />
        </div>
        {!toggled && children}
      </div>
    );
  }
}

export default Expand;