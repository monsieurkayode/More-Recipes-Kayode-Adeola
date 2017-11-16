import actionTypes from '../actions/actionTypes';

const singleRecipeReducer = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.FETCH_SINGLE_RECIPE:
    return action.payload
  default:
    return state;
  }
}

export default singleRecipeReducer;