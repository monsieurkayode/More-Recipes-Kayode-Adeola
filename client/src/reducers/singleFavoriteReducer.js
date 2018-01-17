/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

const singleFavoriteRreducer = (state = false, action) => {
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

export default singleFavoriteRreducer;
