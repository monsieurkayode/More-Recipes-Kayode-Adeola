import actionTypes from '../actions/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  success: false,
  message: null,
  isAuthenticated: false,
  user: {}
}

const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.LOGOUT_USER:
    return {
      ...state,
      success: isEmpty(action.payload),
      message: 'User logged out successfully',
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload };
  default:
    return state;
  }
}

export default logoutReducer;