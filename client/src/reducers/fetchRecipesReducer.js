import actionTypes from '../actions/actionTypes';

const fetchRecipesReducer = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.FETCH_RECIPES:
    return action.payload;
  default:
    return state;
  }
}

export default fetchRecipesReducer;