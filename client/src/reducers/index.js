import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import logoutReducer from './logoutReducer';

const rootReducer = combineReducers({
  signupState: signupReducer,
  signinState: signinReducer,
  logoutState: logoutReducer
});

export default rootReducer;