import actionTypes from '../../src/actions/actionTypes';
import userRecipesReducer from '../../src/reducers/userRecipesReducer';
import mockData from '../__mocks__/mockData';

describe('User Recipe Reducer', () => {
  it('should return initial state',
    () => {
      expect(userRecipesReducer(undefined, {})).toEqual({});
    });

  it('should update the userRecipes state in the store when action type is ' +
  'FETCH_USER_RECIPES',
  () => {
    const action = {
      type: actionTypes.FETCH_USER_RECIPES,
      payload: mockData.fetchRecipesResponse
    };

    const newState = userRecipesReducer({}, action);
    expect(newState.recipes)
      .toEqual({ 1: mockData.fetchRecipesResponse.recipes[0] });
  });

  it('should delete recipe from store when action type is DELETE_RECIPE_POST',
    () => {
      const action = {
        type: actionTypes.DELETE_RECIPE_POST,
        payload: 1
      };

      const prevState = {
        recipes: {
          1: mockData.fetchRecipesResponse.recipes
        },
        pagination: mockData.fetchRecipesResponse.pagination
      };

      const newState = userRecipesReducer(prevState, action);
      expect(newState.recipes).toEqual({});
    });

  it('should set the userRecipes state to initial state when action type is ' +
  'LOGOUT_USER',
  () => {
    const action = {
      type: actionTypes.LOGOUT_USER,
      payload: {}
    };

    const newState = userRecipesReducer({}, action);
    expect(newState).toEqual({});
  });
});
