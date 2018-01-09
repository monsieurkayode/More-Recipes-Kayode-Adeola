/* jshint esversion: 6 */
/* eslint-disable */
import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REVIEWS:
      const { pagination } = action.payload;
      const comments = _.mapKeys(action.payload.comments, 'id');
      return { comments, pagination };
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
