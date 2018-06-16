import mapKeys from 'lodash/mapKeys';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

import actionTypes from '../actions/actionTypes';

/**
 * Reducer function for user favorite recipes related operations
 * @function userFavoritesReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const userFavoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_FAVORITES:
      return {
        pagination: action.payload.pagination,
        recipes: mapKeys(action.payload.recipes, 'Recipe.id'),
      };
    case actionTypes.REMOVE_FAVORITE:
      if (!isEmpty(state)) {
        return {
          ...state,
          recipes: omit(state.recipes, action.payload),
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
