import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL,
  SIGNUP_VALIDATION_ERROR } from '../actions/signupAction';

const initialState = {
  success: false,
  message: null
}
export function signupReducer(state = initialState, action) {
  switch (action.type) {
  case SIGNUP_SUCCESSFUL:
    return {...state, success: true,  message: action.payload };
  case SIGNUP_UNSUCCESSFUL:
    return {...state, success: false, message: action.payload };
  case SIGNUP_VALIDATION_ERROR:
    return {...state, success: false, message: action.payload };
  default:
    return state;
  }
}