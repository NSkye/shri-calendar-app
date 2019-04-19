import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Checkbox from './index';

const stories = storiesOf('Checkbox', module);

stories.addDecorator(withKnobs);

class TestCheckboxOnChange extends React.Component {
  state = {
    checked: false,
    hovered: false,
  };

  toggleChecked = () => {
    this.setState(state => ({
      checked: !state.checked,
    }));
  };

  toggleHovered = () => {
    this.setState(state => ({
      hovered: !state.hovered,
    }));
  };

  render() {
    const { toggleHovered, toggleChecked } = this;
    const { checked, hovered } = this.state;

    return (
      <div
        onMouseEnter={toggleHovered}
        onMouseLeave={toggleHovered}
      >
        <Checkbox
          checked={checked}
          hovered={hovered}
          onChange={toggleChecked}
        />
      </div>
    );
  }
}

stories
  .add('with props', () => <Checkbox checked={boolean('Checked', true)} hovered={boolean('Hovered')} />)
  .add('checked', () => <Checkbox checked />)
  .add('checked + hovered', () => <Checkbox checked hovered />)
  .add('onChange', () => <TestCheckboxOnChange checked={false} />);
