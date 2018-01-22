/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

const initialState = {
  dashBoardIsLoading: false,
  userRecipesIsLoading: false,
  userFavoritesIsLoading: false,
};

const isFetchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_FETCHING:
      if (action.payload.componentName === 'Dashboard') {
        return {
          ...state,
          dashBoardIsLoading: action.payload.status,
        };
      }
      if (action.payload.componentName === 'UserRecipes') {
        return {
          ...state,
          userRecipesIsLoading: action.payload.status,
        };
      }
      if (action.payload.componentName === 'UserFavorites') {
        return {
          ...state,
          userFavoritesIsLoading: action.payload.status,
        };
      }
      break;
    default:
      return state;
  }
};

export default isFetchingReducer;
