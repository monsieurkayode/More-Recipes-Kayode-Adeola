/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

const fetchReviews = recipeId => dispatch =>
  axios.get(`/api/v1/recipes/${recipeId}/reviews`)
    .then((response) => {
      const payload = response.data;
      dispatch({
        type: actionTypes.FETCH_REVIEWS,
        payload
      });
    });

export default fetchReviews;
