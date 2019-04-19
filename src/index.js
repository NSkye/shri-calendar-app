import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import App from './App';
import store from './store';

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <App />
    </DragDropContextProvider>
  </Provider>,
  document.querySelector('#app'),
);
/* eslint-enable react/jsx-filename-extension */