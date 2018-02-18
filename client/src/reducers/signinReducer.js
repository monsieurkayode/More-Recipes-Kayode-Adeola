import isEmpty from 'lodash/isEmpty';

import actionTypes from '../actions/actionTypes';

const initialState = {
  success: false,
  isAuthenticated: false,
  user: {}
};

/**
 * Reducer function for login authentication operations
 * @function signinReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESSFUL:
      return {
        ...state,
        success: !isEmpty(action.payload),
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        success: !isEmpty(action.payload),
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case actionTypes.SIGNIN_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        isAuthenticated: false,
        user: {}
      };
    case actionTypes.SIGNIN_AUTHENTICATION_ERROR:
      return {
        ...state,
        success: false,
        isAuthenticated: false,
        user: {}
      };
    case actionTypes.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        success: !isEmpty(action.payload),
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        success: !isEmpty(action.payload),
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default signinReducer;
