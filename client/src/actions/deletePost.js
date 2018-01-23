/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for deleting a recipe post
 *
 * @function deletePost
 *
 * @param {number} recipeId - Id of recipe post to be deleted
 *
 * @returns {void}
 */
const deletePost = recipeId => dispatch =>
  axios.delete(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      const { message } = response.data;
      Materialize.toast(message, 4000, 'grey darken-2');
      dispatch({
        type: actionTypes.DELETE_RECIPE_POST,
        payload: recipeId
      });
    })
    .catch(() => {
      Materialize.toast('An error occured!', 4000, 'red');
    });

export default deletePost;
