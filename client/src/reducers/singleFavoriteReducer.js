import actionTypes from '../actions/actionTypes';

/**
 * Reducer function for a favorite related operations
 * @function singleFavoriteReducer
 *
 * @param {boolean} state
 * @param {object} action
 *
 * @returns {object} state - the new state
 */
const singleFavoriteReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.CHECK_FAVORITED:
      return action.payload;
    case actionTypes.ADD_FAVORITE_POST:
      return true;
    case actionTypes.REMOVE_FAVORITE:
      return false;
    default:
      return state;
  }
};

export default singleFavoriteReducer;
