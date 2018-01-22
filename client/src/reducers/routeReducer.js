/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

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
