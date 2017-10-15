import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';

const rootReducer = combineReducers({
  signupReducer,
  signinReducer
});

export default rootReducer;