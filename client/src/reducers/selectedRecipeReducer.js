import actionTypes from '../actions/actionTypes';

/**
 * Reducer function for switching tabs on dashboard page
 * @function routeReducer
 *
 * @param {number} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const selectedRecipeReducer = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SELECT_RECIPE:
      return action.payload;
    default:
      return state;
  }
};

export default selectedRecipeReducer;
