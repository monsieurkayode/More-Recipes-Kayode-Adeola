/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for posting reviews
 *
 * @function postComment
 *
 * @param {boolean} recipeId - Id of recipe
 * @param {string} comment - review post
 *
 * @returns {void}
 */
const postComment = (recipeId, comment) => dispatch =>
  axios.post(`/api/v1/recipes/${recipeId}/reviews`, comment)
    .then((response) => {
      const payload = response.data;
      const { message } = response.data;
      dispatch({ type: actionTypes.POST_REVIEW, payload });
      setTimeout(() => Materialize.toast(message, 4000, 'grey darken-2'), 1000);
    })
    .catch(() => {
      Materialize
        .toast('An error occured while posting your comment', 4000, 'red');
      dispatch({ type: actionTypes.POST_REVIEW_ERROR });
    });

export default postComment;
