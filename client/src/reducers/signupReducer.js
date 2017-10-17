import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL,
  SIGNUP_VALIDATION_USER_ERROR,
  SIGNUP_VALIDATION_EMAIL_ERROR } from '../actions/signupAction';

const initialState = {
  success: false,
  message: null
}

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGNUP_SUCCESSFUL:
    return {...state, success: true,  message: action.payload };
  case SIGNUP_UNSUCCESSFUL:
    return {...state, success: false, message: action.payload };
  case SIGNUP_VALIDATION_USER_ERROR:
    return {...state, success: false, message: action.payload };
  case SIGNUP_VALIDATION_EMAIL_ERROR:
    return {...state, success: false, message: action.payload };
  default:
    return state;
  }
}

export default signupReducer;