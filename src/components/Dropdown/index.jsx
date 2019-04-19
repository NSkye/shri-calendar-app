import React, { PureComponent } from 'react';
import { Dropdown as LegoDropdown } from 'lego-on-react';

class Dropdown extends PureComponent {
  render() {
    const {
      switcher, theme, size, children,
    } = this.props;

    return (
      <LegoDropdown switcher={switcher} theme={theme} size={size}>
        <LegoDropdown.Popup>
          {children}
        </LegoDropdown.Popup>
      </LegoDropdown>
    );
  }
}

Dropdown.propTypes = {

};

export default Dropdown;
