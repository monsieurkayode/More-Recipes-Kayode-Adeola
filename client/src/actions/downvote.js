/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

const downvoteAction = recipeId => dispatch =>
  axios.put(`/api/v1/recipes/${recipeId}/downvote`)
    .then((response) => {
      const { upvote, downvote } = response.data;
      dispatch({ type: actionTypes.DOWNVOTE_POST,
        payload: { upvote, downvote, recipeId }
      });
    });

export default downvoteAction;
