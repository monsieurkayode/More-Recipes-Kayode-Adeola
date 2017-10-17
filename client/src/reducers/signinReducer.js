import actionTypes from '../actions/actionTypes';

const initialState = {
  success: false,
  message: null
}

const signinReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SIGNIN_SUCCESSFUL:
    return {...state, success: true, message: null };
  case actionTypes.SIGNIN_UNSUCCESSFUL:
    return {...state, success: false, message: action.payload };
  default:
    return state;
  }
}

export default signinReducer;