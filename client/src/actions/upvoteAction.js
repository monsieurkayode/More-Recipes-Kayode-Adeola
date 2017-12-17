/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

const upvoteAction = recipeId => dispatch =>
  axios.put(`/api/v1/recipes/${recipeId}/upvote`)
    .then((response) => {
      const { upvote, downvote } = response.data;
      dispatch({
        type: actionTypes.UPVOTE_POST,
        payload: { upvote, downvote, recipeId }
      });
    });

export default upvoteAction;
