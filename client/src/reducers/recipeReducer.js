import _ from 'lodash';
import actionTypes from '../actions/actionTypes';

const recipeReducer = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.FETCH_SAMPLE_RECIPES:
    return _.mapKeys(action.payload.recipes, 'id');
  case actionTypes.FETCH_RECIPES:
    const newState = action.payload.recipes;
    _.omitBy(state, 'sample');
  return _.orderBy(_.mapKeys([ ...newState, ...state ], 'id'), 'id', 'desc');
  case actionTypes.CREATE_POST:
    return _.orderBy({ ...state, [action.payload.id]: action.payload }, 'id', 'desc')
  default:
    return state;
  }
}

export default recipeReducer;