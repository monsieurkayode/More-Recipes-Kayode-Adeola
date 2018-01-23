/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for creating a recipe post
 *
 * @function createPost
 *
 * @param {string} category - category recipe should be categorized under
 * @param {object} values - an object with properties to create the recipe post
 * @param {function} callback - callback function called after post is created
 *
 * @returns {void}
 */
const createPost = (category, values, callback) => (dispatch) => {
  const formData = new FormData(); // eslint-disable-line
  formData.append('recipeName', values.recipeName);
  formData.append('category', category || 'others');
  formData.append('ingredients', values.ingredients);
  formData.append('instructions', values.instructions);
  formData.append('image', values.image ? values.image.file : 'spice.jpg');
  return axios.post('/api/v1/recipes', formData)
    .then(({ data }) => {
      dispatch({ type: actionTypes.CREATE_POST, payload: data });
      callback();
    })
    .catch((error) => {
      const { message } = error.response.data;
      Materialize.toast(message, 4000, 'red');
      dispatch({ type: actionTypes.CREATE_POST_ERROR });
    });
};

export default createPost;
