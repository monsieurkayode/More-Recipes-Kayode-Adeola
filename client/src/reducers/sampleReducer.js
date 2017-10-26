import actionTypes from '../actions/actionTypes';

const sampleReducer = (state = {}, action) => {
  switch (action.type) {
  case actionTypes.FETCH_SAMPLE_RECIPES:
    return action.payload
  default:
    return state;
  }
}

export default sampleReducer;