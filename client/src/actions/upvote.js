/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for upvoting a recipe post
 *
 * @function upvoteAction
 *
 * @param {number} recipeId - recipe Id
 *
 * @returns {void}
 */
const upvoteAction = recipeId => dispatch =>
  axios.put(`/api/v1/recipes/${recipeId}/upvote`)
    .then((response) => {
      const { upvote, downvote } = response.data;
      dispatch({
        type: actionTypes.UPVOTE_POST,
        payload: { upvote, downvote, recipeId }
      });
    })
    .catch(() => {
      const message = 'An error occured!';
      Materialize.toast(message, 4000, 'red');
      dispatch(
        {
          type: actionTypes.UPVOTE_POST_ERROR
        }
      );
    });

export default upvoteAction;
