import actionTypes from '../../src/actions/actionTypes';
import recipesReducer from '../../src/reducers/recipesReducer';
import mockData from '../__mocks__/mockData';

const prevState = {
  recipes: {
    1: mockData.fetchRecipesResponse.recipes
  },
  pagination: mockData.fetchRecipesResponse.pagination
};

describe('Single Favorite Reducer', () => {
  it('should return initial state',
    () => {
      expect(recipesReducer(undefined, {})).toEqual({});
    });

  it('should return initial state when action type is ' +
  'FETCH_RECIPES_BY_CATEGORY_ERROR',
  () => {
    const action = {
      type: actionTypes.FETCH_RECIPES_BY_CATEGORY_ERROR,
      payload: {}
    };

    const newState = recipesReducer({}, action);
    expect(newState).toEqual({ recipes: {} });
  });

  it('should return initial state when action type is ' +
  'SEARCH_RECIPE_POST_ERROR',
  () => {
    const action = {
      type: actionTypes.SEARCH_RECIPE_POST_ERROR,
      payload: {}
    };

    const newState = recipesReducer({}, action);
    expect(newState).toEqual({});
  });

  it('should update the recipes state in the store when action type is ' +
  'FETCH_RECIPES',
  () => {
    const action = {
      type: actionTypes.FETCH_RECIPES,
      payload: mockData.fetchRecipesResponse
    };

    const newState = recipesReducer({}, action);
    expect(newState.recipes)
      .toEqual({ 1: mockData.fetchRecipesResponse.recipes[0] });
  });

  it('should update the recipes state in the store when action type is ' +
  'FETCH_RECIPES_BY_CATEGORY',
  () => {
    const action = {
      type: actionTypes.FETCH_RECIPES_BY_CATEGORY,
      payload: mockData.fetchRecipesResponse
    };

    const newState = recipesReducer({}, action);
    expect(newState.recipes)
      .toEqual({ 1: mockData.fetchRecipesResponse.recipes[0] });
  });

  it('should update the recipes state in the store when action type is ' +
  'SEARCH_RECIPE_POST',
  () => {
    const action = {
      type: actionTypes.SEARCH_RECIPE_POST,
      payload: mockData.fetchRecipesResponse
    };

    const newState = recipesReducer({}, action);
    expect(newState.recipes)
      .toEqual({ 1: mockData.fetchRecipesResponse.recipes[0] });
  });

  it('should delete recipe from store when action type is DELETE_RECIPE_POST',
    () => {
      const action = {
        type: actionTypes.DELETE_RECIPE_POST,
        payload: 1
      };

      const newState = recipesReducer(prevState, action);
      expect(newState.recipes).toEqual({});
    });

  it('should add a new recipe when action type is CREATE_POST',
    () => {
      const action = {
        type: actionTypes.CREATE_POST,
        payload: mockData.createPostResponse
      };

      const newState = recipesReducer({}, action);
      expect(Object.keys(newState.recipes).length).toBe(1);
    });

  it('should update vote count of recipe when action type is UPVOTE_POST',
    () => {
      const action = {
        type: actionTypes.UPVOTE_POST,
        payload: {
          recipeId: 1,
          upvote: 1,
          downvote: 0
        }
      };

      const newState = recipesReducer(prevState, action);
      expect(newState.recipes['1'].upvote).toEqual(1);
    });

  it('should update vote count of recipe when action type is DOWNVOTE_POST',
    () => {
      const action = {
        type: actionTypes.DOWNVOTE_POST,
        payload: {
          recipeId: 1,
          upvote: 0,
          downvote: 1
        }
      };

      const newState = recipesReducer(prevState, action);
      expect(newState.recipes['1'].downvote).toEqual(1);
    });
});
