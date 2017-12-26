import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
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
      };
    default:
      return state;
  }
};
