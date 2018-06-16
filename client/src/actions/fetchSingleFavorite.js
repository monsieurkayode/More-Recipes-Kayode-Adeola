/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';
/**
 * @summary - Action creator for fetching a favorite recipe
 * belonging to user if it exists
 *
 * @function fetchSingleFavorites
 *
 * @param {number} recipeId - Id of recipe
 *
 * @returns {void}
 */
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
