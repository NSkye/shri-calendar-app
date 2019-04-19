import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  setSidebarState,
  toggleSidebar,
} from './actions';

export * from './actions';
export * from './selectors';

const defaultState = Map({
  open: false,
  displayedEvent: null,
});

const reducer = handleActions(
  {
    [setSidebarState]: (state, { payload: { open, event } }) =>
      state.withMutations((mutableState) => {
        mutableState.set('open', open);
        mutableState.set('displayedEvent', event && fromJS(event));
      }),

    [toggleSidebar]: (state) => {
      const newState = state.update('open', value => !value);
      if (!newState.get('open')) { // очищаем, если закрыли
        return newState.set('displayedEvent', null);
      }
      return newState;
    },
  },
  defaultState,
);

export default reducer;