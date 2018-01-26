/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary Action creator for updating a recipe post
 * Ensures only owner is able to update
 *
 * @function editPost
 *
 * @param {number} recipeId - Id of recipe to be updated
 * @param {string} category - updated category or previously defined at creation
 * @param {object} values - object with properties to update the record
 * @param {function} callback - functiom executed after update is successful
 *
 * @returns {void}
 */
const editPost = (recipeId, category, values, callback) => (dispatch) => {
  const formData = new FormData(); // eslint-disable-line
  formData.append('recipeName', values.recipeName);
  formData.append('category', category || 'others');
  formData.append('ingredients', values.ingredients);
  formData.append('instructions', values.instructions);
  formData
    .append(
      'image', values.image.file === 'empty' ?
        values.image.name : values.image.file
    );
  return axios.put(`/api/v1/recipes/${recipeId}`, formData)
    .then((response) => {
      const { message } = response.data;
      dispatch({ type: actionTypes.EDIT_RECIPE_POST });
      callback(message);
    })
    .catch(() => {
      const message = 'An error occured';
      Materialize.toast(message, 4000, 'red');
      dispatch({
        type: actionTypes.EDIT_RECIPE_POST_ERROR
      });
    });
};

export default editPost;
