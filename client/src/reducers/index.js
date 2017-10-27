import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';

const rootReducer = combineReducers({
  signupState: signupReducer,
  signinState: signinReducer,
  recipes: recipeReducer,
});

export default rootReducer;