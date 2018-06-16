import actionTypes from '../../src/actions/actionTypes';
import userFavoritesReducer from '../../src/reducers/userFavoritesReducer';
import mockData from '../__mocks__/mockData';

describe('Single Favorite Reducer', () => {
  it('should return initial state',
    () => {
      expect(userFavoritesReducer(undefined, {})).toEqual({});
    });

  it('should update the userFavorites state in the store when action type is ' +
  'FETCH_USER_FAVORITES',
  () => {
    const action = {
      type: actionTypes.FETCH_USER_FAVORITES,
      payload: mockData.fetchFavoritesResponse
    };

    const newState = userFavoritesReducer({}, action);
    expect(newState.recipes)
      .toEqual({ 1: mockData.fetchFavoritesResponse.recipes[0] });
  });

  it('should delete recipe from store when action type is REMOVE_FAVORITE',
    () => {
      const action = {
        type: actionTypes.REMOVE_FAVORITE,
        payload: 1
      };

      const prevState = {
        recipes: {
          1: mockData.fetchRecipesResponse.recipes
        },
        pagination: mockData.fetchRecipesResponse.pagination
      };

      const newState = userFavoritesReducer(prevState, action);
      expect(newState.recipes).toEqual({});
    });

  it('should return state if state is empty and action type is REMOVE_FAVORITE',
    () => {
      const action = {
        type: actionTypes.REMOVE_FAVORITE
      };

      const newState = userFavoritesReducer({}, action);
      expect(newState).toEqual({});
    });

  it('should set the userFavorites to initial state when action type is ' +
  'LOGOUT_USER',
  () => {
    const action = {
      type: actionTypes.LOGOUT_USER,
      payload: {}
    };

    const newState = userFavoritesReducer({}, action);
    expect(newState).toEqual({});
  });
});
