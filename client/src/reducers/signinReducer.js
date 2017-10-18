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
      success: true,
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
  default:
    return state;
  }
}

export default signinReducer;