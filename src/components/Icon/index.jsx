import React from 'react';
import classNames from 'classnames';
import Svg from 'react-svg';
import PropTypes from 'prop-types';
import styles from './styles.styl';

function importAllIcons(req) {
  const icons = {};

  req.keys().forEach((src) => {
    const key = src.split('./')[1].split('.svg')[0];
    icons[key] = req(src);
  });

  return icons;
}

const icons = importAllIcons(require.context('@/assets/icons', false, /\.svg$/));

const Icon = ({
  name,
  width,
  height,
  color,
  className,
  ...props
}) => (
  <Svg
    className={classNames(styles.icon, className)}
    svgStyle={{
      width, height, color, display: 'block',
    }}
    src={icons[name]}
    {...props}
  />
);

Icon.defaultProps = {
  width: 'auto',
  height: 'auto',
  color: 'inherit',
};

Icon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.oneOf(Object.keys(icons)).isRequired,
};

export default Icon;
