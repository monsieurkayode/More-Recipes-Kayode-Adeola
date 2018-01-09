/* jshint esversion: 6 */
import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_FAVORITES:
      return {
        pagination: action.payload.pagination,
        recipes: _.mapKeys(action.payload.recipes, 'Recipe.id'),
      };
    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        recipes: _.omit(state.recipes, action.payload)
      };
    case actionTypes.LOGOUT_USER:
      return action.payload;
    default:
      return state;
  }
};
