/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

const fetchSingleFavorite = recipeId => dispatch =>
  axios.get(`/api/v1/users/${recipeId}/favorites`)
    .then((response) => {
      const payload = response.data.status === 'success';
      dispatch({ type: actionTypes.CHECK_FAVORITED, payload });
    })
    .catch(() => {
      const payload = false;
      dispatch({ type: actionTypes.CHECK_FAVORITED, payload });
    });

export default fetchSingleFavorite;
