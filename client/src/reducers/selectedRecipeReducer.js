/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

const selectedRecipeReducer = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SELECT_RECIPE:
      return action.payload;
    default:
      return state;
  }
};

export default selectedRecipeReducer;
