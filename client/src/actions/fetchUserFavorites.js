/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

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
        payload: { status: false, componentName: 'UserFavorites' }
      });
    })
    .catch(() => {
      dispatch({ type: actionTypes.FETCH_USER_FAVORITES_ERROR });
    });

export default fetchUserFavorites;
