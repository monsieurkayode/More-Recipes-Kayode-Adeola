/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

export default (state = { selected: 'profile' }, action) => {
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
