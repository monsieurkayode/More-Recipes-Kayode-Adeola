/* jshint esversion: 6 */
import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

/**
 * Reducer function for most upvoted recipe posts operation
 * @function topRecipesReducer
 *
 * @param {array} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const topRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_RECIPES:
      return _.orderBy(action.payload, 'upvote', 'desc');
    default:
      return state;
  }
};

export default topRecipesReducer;
