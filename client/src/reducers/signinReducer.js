import {
  SIGNIN_SUCCESSFUL,
  SIGNIN_UNSUCCESSFUL } from '../actions/signinAction';

const initialState = {
  success: false,
}

const signinReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGNIN_SUCCESSFUL:
    return {...state, success: true, message: action.payload };
  case SIGNIN_UNSUCCESSFUL:
    return {...state, success: false, message: action.payload };
  default:
    return state;
  }
}

export default signinReducer;