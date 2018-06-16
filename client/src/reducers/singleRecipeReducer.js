import actionTypes from '../actions/actionTypes';

/**
 * Reducer function for a recipe post related operations
 * @function singleRecipeReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const singleRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SINGLE_RECIPE:
      return action.payload.recipe;
    case actionTypes.UPVOTE_POST:
      return {
        ...state,
        upvote: action.payload.upvote,
        downvote: action.payload.downvote
      };
    case actionTypes.DOWNVOTE_POST:
      return {
        ...state,
        upvote: action.payload.upvote,
        downvote: action.payload.downvote
      };
    default:
      return state;
  }
};

export default singleRecipeReducer;
