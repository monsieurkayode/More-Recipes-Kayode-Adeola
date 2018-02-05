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
  const { recipeName, ingredients, instructions } = values;

  formData.append('recipeName', recipeName);
  formData.append('category', category);
  formData.append('ingredients', ingredients);
  formData.append('instructions', instructions);
  formData.append(
    'image',
    values.image ?
      values.image.file :
      '../uploads/spice.jpg'
  );

  return axios.post('/api/v1/recipes', formData)
    .then(({ data }) => {
      const { message } = data;
      dispatch({ type: actionTypes.CREATE_POST, payload: data });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'PostRecipe' }
      });
      callback(message);
    })
    .catch(() => {
      const message = 'An error occured!';
      Materialize.toast(message, 4000, 'red');
      dispatch({ type: actionTypes.CREATE_POST_ERROR });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'PostRecipe' }
      });
    });
};

export default createPost;
