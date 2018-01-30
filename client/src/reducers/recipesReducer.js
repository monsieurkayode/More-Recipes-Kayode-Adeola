/* jshint esversion: 6 */
import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit';

import actionTypes from '../actions/actionTypes';

/**
 * Reducer function for recipe posts operations
 * @function recipeReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DELETE_RECIPE_POST:
      return {
        ...state,
        recipes: omit(state.recipes, action.payload)
      };
    case actionTypes.FETCH_RECIPES:
      return {
        recipes: mapKeys(action.payload.recipes, 'id'),
        pagination: action.payload.pagination
      };
    case actionTypes.FETCH_RECIPES_BY_CATEGORY:
      return {
        recipes: mapKeys(action.payload.recipes, 'id'),
        pagination: action.payload.pagination
      };
    case actionTypes.FETCH_RECIPES_BY_CATEGORY_ERROR:
      return {
        recipes: {},
      };
    case actionTypes.SEARCH_RECIPE_POST_ERROR:
      return action.payload;
    case actionTypes.SEARCH_RECIPE_POST:
      return {
        recipes: mapKeys(action.payload.recipes, 'id'),
        pagination: action.payload.pagination
      };
    case actionTypes.CREATE_POST:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          [action.payload.id]: action.payload,
        }
      };
    case actionTypes.UPVOTE_POST:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          [action.payload.recipeId]: {
            ...state.recipes[action.payload.recipeId],
            upvote: action.payload.upvote,
            downvote: action.payload.downvote,
          }
        }
      };
    case actionTypes.DOWNVOTE_POST:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          [action.payload.recipeId]: {
            ...state.recipes[action.payload.recipeId],
            upvote: action.payload.upvote,
            downvote: action.payload.downvote,
          }
        }
      };
    default:
      return state;
  }
};

export default recipeReducer;
