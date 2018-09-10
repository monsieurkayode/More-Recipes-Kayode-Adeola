/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for fetching favorite recipes belonging to
 * or added by the current user
 *
 * @function fetchUserFavorites
 *
 * @param {number} page - selected page number
 *
 * @returns {void}
 */
const fetchUserFavorites = page => dispatch =>
  axios.get(`/api/v1/users/recipes/favorites?page=${page}`)
    .then((response) => {
      const { pagination, recipes } = response.data;
      dispatch({
        type: actionTypes.FETCH_USER_FAVORITES,
        payload: { pagination, recipes }
      });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'DashboardPage' }
      });
    })
    .catch(() => {
      dispatch({ type: actionTypes.FETCH_USER_FAVORITES_ERROR });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'DashboardPage' }
      });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'UserFavoriteRecipe' }
      });
    });

export default fetchUserFavorites;
