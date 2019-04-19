import PropTypes from 'prop-types';
import moment from 'moment';

const dateType = PropTypes.oneOfType([
  PropTypes.number,
  (props, propName, componentName) => {
    if (typeof props[propName] !== 'string' || !moment(props[propName]).isValid()) {
      return new Error(
        `Invalid prop ${
          propName
        } supplied to ${
          componentName
        }. Validation failed.`,
      );
    }

    return true;
  },
]);

export default dateType;