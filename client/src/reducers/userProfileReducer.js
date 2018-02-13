import actionTypes from '../actions/actionTypes';

const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PROFILE:
      return action.payload;
    case actionTypes.UPDATE_USER_PROFILE:
      return action.payload;
    default:
      return state;
  }
};

export default userProfileReducer;
