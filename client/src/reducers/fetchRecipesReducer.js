import _ from 'lodash';
import actionTypes from '../actions/actionTypes';

const fetchRecipesReducer = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.FETCH_RECIPES:
    return _.mapKeys(action.payload, 'id');
  default:
    return state;
  }
}

export default fetchRecipesReducer;