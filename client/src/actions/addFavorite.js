/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for adding a recipe to a user's favorite
 *
 * @function addFavoriteAction
 *
 * @param {number} recipeId - Id of recipe being favorited
 *
 * @returns {void}
 */
const addFavoriteAction = recipeId => dispatch =>
  axios.post(`/api/v1/users/${recipeId}/favorites`)
    .then((response) => {
      const { message } = response.data;
      Materialize.toast(message, 4000, 'grey darken-2');
      dispatch({ type: actionTypes.ADD_FAVORITE_POST });
    })
    .catch(() => {
      const message = 'An error occured!';
      Materialize.toast(message, 4000, 'red');
      dispatch({ type: actionTypes.ADD_FAVORITE_ERROR });
    });

export default addFavoriteAction;
