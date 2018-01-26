/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for removing a recipe from
 * a user's favorite list
 *
 * @function removeFavorite
 *
 * @param {number} recipeId - Id of recipe
 *
 * @returns {void}
 */
const removeFavorite = recipeId => dispatch =>
  axios.delete(`/api/v1/users/${recipeId}/favorites`)
    .then((response) => {
      const { message } = response.data;
      Materialize.toast(message, 4000, 'grey darken-2');
      dispatch({
        type: actionTypes.REMOVE_FAVORITE,
        payload: recipeId
      });
    })
    .catch(() => {
      Materialize.toast('An error occured!', 4000, 'red');
    });

export default removeFavorite;
