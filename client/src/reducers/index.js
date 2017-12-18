/* jshint esversion: 6 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';
import singleRecipeReducer from './singleRecipeReducer';
import routeReducer from './routeReducer';
import fetchSingleFavorite from './fetchSingleFavorite';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
  signupState: signupReducer,
  signinState: signinReducer,
  recipes: recipeReducer,
  form: formReducer,
  currentRecipe: singleRecipeReducer,
  routing: routeReducer,
  isFavorite: fetchSingleFavorite,
  reviews: reviewReducer
});

export default rootReducer;
