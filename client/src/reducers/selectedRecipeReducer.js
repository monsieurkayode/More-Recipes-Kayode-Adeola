import actionTypes from '../actions/actionTypes';

export default (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SELECT_RECIPE:
      return action.payload;
    default:
      return state;
  }
};
