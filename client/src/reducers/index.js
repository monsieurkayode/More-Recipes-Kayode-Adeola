import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';
import singleRecipeReducer from './singleRecipeReducer';

const rootReducer = combineReducers({
  signupState: signupReducer,
  signinState: signinReducer,
  recipes: recipeReducer,
  form: formReducer,
  currentRecipe: singleRecipeReducer
});

export default rootReducer;
