/* jshint esversion: 6 */
import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

const userRecipesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_RECIPES:
      return {
        recipes: _.mapKeys(action.payload.recipes, 'id'),
        pagination: action.payload.pagination
      };
    case actionTypes.DELETE_RECIPE_POST:
      return {
        ...state,
        recipes: _.omit(state.recipes, action.payload),
        pagination: {
          ...state.pagination,
          pageSize: state.pagination.pageSize - 1,
          totalCount: state.pagination.totalCount - 1
        }
      };
    case actionTypes.LOGOUT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userRecipesReducer;
