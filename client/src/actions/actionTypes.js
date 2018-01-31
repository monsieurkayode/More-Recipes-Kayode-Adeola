/* jshint esversion: 6 */
const IS_FETCHING = 'IS_FETCHING';
const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
const SIGNUP_UNSUCCESSFUL = 'SIGNUP_UNSUCCESSFUL';
const SIGNUP_VALIDATION_USER_ERROR = 'SIGNUP_VALIDATION_USER_ERROR';
const SIGNUP_VALIDATION_EMAIL_ERROR = 'SIGNUP_VALIDATION_EMAIL_ERROR';
const SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL';
const SIGNIN_UNSUCCESSFUL = 'SIGNIN_UNSUCCESSFUL';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const FETCH_RECIPES = 'FETCH_RECIPES';
const FETCH_RECIPES_ERROR = 'FETCH_RECIPES_ERROR';
const FETCH_SINGLE_RECIPE = 'FETCH_SINGLE_RECIPE';
const FETCH_SINGLE_RECIPE_ERROR = 'FETCH_SINGLE_RECIPE_ERROR';
const FETCH_SAMPLE_RECIPES = 'FETCH_SAMPLE_RECIPES';
const CREATE_POST = 'CREATE_POST';
const CREATE_POST_ERROR = 'CREATE_POST_ERROR';
const SESSION_EXPIRED = 'SESSION_EXPIRED';
const UPVOTE_POST = 'UPVOTE_POST';
const DOWNVOTE_POST = 'DOWNVOTE_POST';
const ADD_FAVORITE_POST = 'ADD_FAVORITE_POST';
const CHECK_FAVORITED = 'CHECK_FAVORITED';
const ADD_FAVORITE_ERROR = 'ADD_FAVORITE_ERROR';
const POST_REVIEW = 'POST_REVIEW';
const POST_REVIEW_ERROR = 'POST_REVIEW_ERROR';
const FETCH_REVIEWS = 'FETCH_REVIEWS';
const FETCH_REVIEWS_ERROR = 'FETCH_REVIEWS_ERROR';
const FETCH_USER_RECIPES = 'FETCH_USER_RECIPES';
const FETCH_USER_RECIPES_ERROR = 'FETCH_USER_RECIPES_ERROR';
const FETCH_USER_FAVORITES = 'FETCH_USER_FAVORITES';
const FETCH_USER_FAVORITES_ERROR = 'FETCH_USER_FAVORITES_ERROR';
const DELETE_RECIPE_POST = 'DELETE_RECIPE_POST';
const FETCH_TOP_RECIPES = 'FETCH_TOP_RECIPES';
const FETCH_TOP_RECIPES_ERROR = 'FETCH_TOP_RECIPES_ERROR';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const EDIT_RECIPE_POST = 'EDIT_RECIPE_POST';
const EDIT_RECIPE_POST_ERROR = 'EDIT_RECIPE_POST_ERROR';
const SEARCH_RECIPE_POST = 'SEARCH_RECIPE_POST';
const SEARCH_RECIPE_POST_ERROR = 'SEARCH_RECIPE_POST_ERROR';
const SELECT_RECIPE = 'SELECT_RECIPE';
const FETCH_RECIPES_BY_CATEGORY = 'FETCH_RECIPES_BY_CATEGORY';
const FETCH_RECIPES_BY_CATEGORY_ERROR = 'FETCH_RECIPES_BY_CATEGORY_ERROR';

export default {
  LOGOUT_USER,
  IS_FETCHING,
  SIGNIN_SUCCESSFUL,
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL,
  SIGNIN_UNSUCCESSFUL,
  SET_CURRENT_USER,
  SIGNUP_VALIDATION_USER_ERROR,
  SIGNUP_VALIDATION_EMAIL_ERROR,
  FETCH_RECIPES,
  FETCH_RECIPES_ERROR,
  FETCH_SINGLE_RECIPE,
  FETCH_SINGLE_RECIPE_ERROR,
  FETCH_SAMPLE_RECIPES,
  CREATE_POST,
  CREATE_POST_ERROR,
  SESSION_EXPIRED,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_FAVORITE_POST,
  ADD_FAVORITE_ERROR,
  CHECK_FAVORITED,
  POST_REVIEW,
  POST_REVIEW_ERROR,
  FETCH_REVIEWS,
  FETCH_REVIEWS_ERROR,
  FETCH_USER_RECIPES,
  FETCH_USER_RECIPES_ERROR,
  FETCH_USER_FAVORITES,
  FETCH_USER_FAVORITES_ERROR,
  DELETE_RECIPE_POST,
  FETCH_TOP_RECIPES,
  FETCH_TOP_RECIPES_ERROR,
  REMOVE_FAVORITE,
  EDIT_RECIPE_POST,
  EDIT_RECIPE_POST_ERROR,
  SEARCH_RECIPE_POST,
  SEARCH_RECIPE_POST_ERROR,
  SELECT_RECIPE,
  FETCH_RECIPES_BY_CATEGORY,
  FETCH_RECIPES_BY_CATEGORY_ERROR
};
