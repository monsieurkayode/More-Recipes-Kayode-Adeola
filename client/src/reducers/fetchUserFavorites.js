import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_FAVORITES:
      return {
        pagination: action.payload.pagination,
        recipes: _.mapKeys(action.payload.recipes, 'id'),
      };
    default:
      return state;
  }
};
