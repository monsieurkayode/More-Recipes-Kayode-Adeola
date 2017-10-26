import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import sampleReducer from './sampleReducer';
import fetchRecipesReducer from './fetchRecipesReducer';

const rootReducer = combineReducers({
  signupState: signupReducer,
  signinState: signinReducer,
  recipes: sampleReducer,
  recipesState: fetchRecipesReducer
});

export default rootReducer;