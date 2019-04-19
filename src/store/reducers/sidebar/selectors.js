/**
 * Получить текущеее состояние сайдбара (открыт/закрыт)
 * @param {Immutable.Map} state
 */
export const selectSidebarState = state => {
  return state.getIn(['sidebar', 'open']);
};

/**
 * Получить внутренний id события, что сейчас в сайдбаре
 * @param {Immutable.Map} state
 */
export const selectSidebarDisplayedEvent = state => {
  const res = state.getIn(['sidebar', 'displayedEvent']);
  return res && res.toObject();
};