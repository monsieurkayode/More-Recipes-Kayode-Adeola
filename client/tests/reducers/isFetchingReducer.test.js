import actionTypes from '../../src/actions/actionTypes';
import isFetchingReducer from '../../src/reducers/isFetchingReducer';

const initialState = {
  dashBoardIsLoading: false,
  userRecipesIsLoading: false,
  userFavoritesIsLoading: false,
  postRecipeIsLoading: false,
  editRecipeIsLoading: false
};

describe('IsFetching Reducer', () => {
  it('should return initial state', () => {
    expect(isFetchingReducer(undefined, {})).toEqual(initialState);
  });

  it('should set the status of dashBoardIsLoading to true', () => {
    const action = {
      type: actionTypes.IS_FETCHING,
      payload: {
        componentName: 'Dashboard',
        status: true
      }
    };

    const newState = isFetchingReducer(initialState, action);
    expect(newState.dashBoardIsLoading).toBe(true);
  });

  it('should set the status of userRecipesIsLoading to true', () => {
    const action = {
      type: actionTypes.IS_FETCHING,
      payload: {
        componentName: 'UserRecipes',
        status: true
      }
    };

    const newState = isFetchingReducer(initialState, action);
    expect(newState.userRecipesIsLoading).toBe(true);
  });

  it('should set the status of userFavoritesIsLoading to true', () => {
    const action = {
      type: actionTypes.IS_FETCHING,
      payload: {
        componentName: 'UserFavorites',
        status: true
      }
    };

    const newState = isFetchingReducer(initialState, action);
    expect(newState.userFavoritesIsLoading).toBe(true);
  });

  it('should set the status of postRecipeIsLoading to true', () => {
    const action = {
      type: actionTypes.IS_FETCHING,
      payload: {
        componentName: 'PostRecipe',
        status: true
      }
    };

    const newState = isFetchingReducer(initialState, action);
    expect(newState.postRecipeIsLoading).toBe(true);
  });

  it('should set the status of editRecipeIsLoading to true', () => {
    const action = {
      type: actionTypes.IS_FETCHING,
      payload: {
        componentName: 'EditRecipe',
        status: true
      }
    };

    const newState = isFetchingReducer(initialState, action);
    expect(newState.editRecipeIsLoading).toBe(true);
  });
});
