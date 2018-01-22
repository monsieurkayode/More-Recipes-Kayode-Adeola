/* jshint esversion: 6 */
import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

const userFavoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_FAVORITES:
      return {
        pagination: action.payload.pagination,
        recipes: _.mapKeys(action.payload.recipes, 'Recipe.id'),
      };
    case actionTypes.REMOVE_FAVORITE:
      if (!_.isEmpty(state)) {
        return {
          ...state,
          recipes: _.omit(state.recipes, action.payload),
          pagination: {
            ...state.pagination,
            pageSize: state.pagination.pageSize - 1,
            totalCount: state.pagination.totalCount - 1
          }
        };
      }
      return state;
    case actionTypes.LOGOUT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userFavoritesReducer;
