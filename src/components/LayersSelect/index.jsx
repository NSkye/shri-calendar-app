/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Select, Icon, SVGIcon } from 'lego-on-react';
import styles from './styles.styl'
import Tag from '@@/Tag'

export default class LayerSelect extends React.Component {
  static Item = Select.Item;

  render() {
    return (
      <Select {...this.props}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            ...child.props,
            icon: (
              <Icon cls={styles.icon}>
                <Tag color={child.props.color}/>
              </Icon>
            )
          })
        )}
      </Select>
    );
  }
}