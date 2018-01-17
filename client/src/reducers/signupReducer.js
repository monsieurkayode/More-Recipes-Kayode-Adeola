/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

const initialState = {
  success: false,
  message: ''
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        success: true,
        message: action.payload
      };
    case actionTypes.SIGNUP_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        message: action.payload
      };
    case actionTypes.SIGNUP_VALIDATION_USER_ERROR:
      return {
        ...state,
        success: false,
        message: action.payload
      };
    case actionTypes.SIGNUP_VALIDATION_EMAIL_ERROR:
      return {
        ...state,
        success: false,
        message: action.payload
      };
    default:
      return state;
  }
};

export default signupReducer;
