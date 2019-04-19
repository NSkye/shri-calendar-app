import { createActions } from 'redux-actions';

const { setSidebarState, toggleSidebar } = createActions({
  SET_SIDEBAR_STATE: (open = true, event = null) => ({ open, event }),
  TOGGLE_SIDEBAR: () => {},
});

export {
  setSidebarState,
  toggleSidebar,
};