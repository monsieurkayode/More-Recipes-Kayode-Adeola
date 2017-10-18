import actionTypes from '../actions/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  success: false,
  message: null,
  isAuthenticated: false,
  user: {}
}

const signinReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SIGNIN_SUCCESSFUL:
    return {
      ...state,
      success: !isEmpty(action.payload),
      message: null,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload };
  case actionTypes.SIGNIN_UNSUCCESSFUL:
    return {
      ...state,
      success: false,
      message: action.payload,
      isAuthenticated: !isEmpty(action.payload),
      user: {} };
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

export default signinReducer;