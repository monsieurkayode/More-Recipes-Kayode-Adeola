import _ from 'lodash';
import actionTypes from '../actions/actionTypes';

const recipeReducer = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.FETCH_SAMPLE_RECIPES:
    return _.mapKeys(action.payload, 'id');
  case actionTypes.FETCH_RECIPES:
    const newState = action.payload[1];
    return _.mapKeys({ ...state, ...newState }, 'id');
  case actionTypes.CREATE_POST:
    return { ...state, [action.payload.id]: action.payload }
  default:
    return state;
  }
}

export default recipeReducer;