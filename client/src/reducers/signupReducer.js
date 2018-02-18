import actionTypes from '../actions/actionTypes';

const initialState = {
  success: false
};

/**
 * Reducer function for registration related operations
 * @function signupReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        success: true
      };
    case actionTypes.SIGNUP_UNSUCCESSFUL:
      return {
        ...state,
        success: false
      };
    case actionTypes.SIGNUP_VALIDATION_USER_ERROR:
      return {
        ...state,
        success: false
      };
    case actionTypes.SIGNUP_VALIDATION_EMAIL_ERROR:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export default signupReducer;
