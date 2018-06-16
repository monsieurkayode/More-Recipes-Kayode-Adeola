/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for downvoting a recipe post
 *
 * @function downvoteAction
 *
 * @param {number} recipeId - Id of recipe post to be downvoted
 *
 * @returns {object} dispatched action
 */
const downvoteAction = recipeId => dispatch =>
  axios.put(`/api/v1/recipes/${recipeId}/downvote`)
    .then((response) => {
      const { upvote, downvote } = response.data;
      dispatch({ type: actionTypes.DOWNVOTE_POST,
        payload: { upvote, downvote, recipeId }
      });
    })
    .catch(() => {
      const message = 'An error occured!';
      Materialize.toast(message, 4000, 'red');
      dispatch(
        {
          type: actionTypes.DOWNVOTE_POST_ERROR
        }
      );
    });

export default downvoteAction;
