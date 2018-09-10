import actionTypes from '../actions/actionTypes';

const initialState = {
  dashboardIsLoading: false,
  userProfileIsLoading: false,
  userRecipesIsLoading: false,
  userFavoritesIsLoading: false,
  postRecipeIsLoading: false,
  editRecipeIsLoading: false
};

/**
 * Reducer function for setting the status of a dispatched action
 * @function isFetchingReducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const isFetchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_FETCHING:
      if (action.payload.componentName === 'DashboardPage') {
        return {
          ...state,
          dashboardIsLoading: action.payload.status,
        };
      }
      if (action.payload.componentName === 'UserProfile') {
        return {
          ...state,
          userProfileIsLoading: action.payload.status,
        };
      }
      if (action.payload.componentName === 'UserRecipes') {
        return {
          ...state,
          userRecipesIsLoading: action.payload.status,
        };
      }
      if (action.payload.componentName === 'UserFavoriteRecipe') {
        return {
          ...state,
          userFavoritesIsLoading: action.payload.status,
        };
      }
      if (action.payload.componentName === 'PostRecipe') {
        return {
          ...state,
          postRecipeIsLoading: action.payload.status,
        };
      }
      if (action.payload.componentName === 'EditRecipe') {
        return {
          ...state,
          editRecipeIsLoading: action.payload.status,
        };
      }
      break;
    default:
      return state;
  }
};

export default isFetchingReducer;
