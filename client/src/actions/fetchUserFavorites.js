/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

const fetchUserFavorites = () => dispatch =>
  axios.get('/api/v1/users/recipes/favorites')
    .then((response) => {
      const { pagination, recipes } = response.data;
      dispatch({
        type: actionTypes.FETCH_USER_FAVORITES,
        payload: { pagination, recipes }
      });
    })
    .catch(() => {
      dispatch({ type: actionTypes.FETCH_USER_FAVORITES_ERROR });
    });

export default fetchUserFavorites;
