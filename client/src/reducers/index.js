import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';

const rootReducer = combineReducers({
  signupState: signupReducer,
  signinState: signinReducer
});

export default rootReducer;