import actionTypes from '../actions/actionTypes';

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
