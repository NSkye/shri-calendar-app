import React from 'react';
import { Button } from 'lego-on-react';

const EventButton = ({ children, ...props }) => (
  <Button
    theme='raised'
    tone='grey'
    size='n'
    style={{ marginTop: 1 }}
    view='default'
    {...props}
  >
    {children}
  </Button>
);

export default EventButton;