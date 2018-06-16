import mapKeys from 'lodash/mapKeys';

import actionTypes from '../actions/actionTypes';

/**
 * Reducer function for review operations
 * @function recipeReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REVIEWS:
      return {
        comments: mapKeys(action.payload.comments, 'id'),
        pagination: action.payload.pagination
      };
    case actionTypes.POST_REVIEW:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.review.id]: action.payload.review
        }
      };
    default:
      return state;
  }
};

export default reviewsReducer;
