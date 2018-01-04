/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

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
