/* jshint esversion: 6 */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import signupState from './signupReducer';
import signinState from './signinReducer';
import recipes from './recipesReducer';
import currentRecipe from './singleRecipeReducer';
import isFavorite from './singleFavoriteReducer';
import reviews from './reviewsReducer';
import userRecipes from './userRecipesReducer';
import userFavorites from './userFavoritesReducer';
import topRecipes from './topRecipesReducer';
import selectedRecipe from './selectedRecipeReducer';
import isLoading from './isFetchingReducer';
import userDetails from './userProfileReducer';

const rootReducer = combineReducers({
  isLoading,
  signupState,
  signinState,
  recipes,
  form,
  currentRecipe,
  isFavorite,
  reviews,
  userRecipes,
  userFavorites,
  topRecipes,
  selectedRecipe,
  userDetails
});

export default rootReducer;
