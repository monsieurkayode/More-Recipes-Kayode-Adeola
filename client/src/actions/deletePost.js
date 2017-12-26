/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

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
