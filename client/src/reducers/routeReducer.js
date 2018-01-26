/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

/**
 * Reducer function for switching tabs on dashboard page
 * @function routeReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const routeReducer = (state = { selected: 'profile' }, action) => {
  switch (action.type) {
    case actionTypes.SELECTED_ROUTE:
      return {
        ...state,
        selected: action.payload
      };
    default:
      return state;
  }
};

export default routeReducer;
