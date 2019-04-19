import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import sidebarReducer from './reducers/sidebar';
import dataReducer from './reducers/data';
import percistMiddleware from './percistMiddleware';

export * from './reducers/sidebar';
export * from './reducers/data';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({
    sidebar: sidebarReducer,
    data: dataReducer,
  }),
  compose(
    applyMiddleware(thunk),
    applyMiddleware(percistMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);
/* eslint-enable */

export default store;
