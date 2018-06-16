/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for fetching reviews for a recipe post
 *
 * @function fetchReviews
 *
 * @param {number} recipeId - Id of recipe
 *
 * @returns {void}
 */
const fetchReviews = recipeId => dispatch =>
  axios.get(`/api/v1/recipes/${recipeId}/reviews`)
    .then((response) => {
      const payload = response.data;
      dispatch({
        type: actionTypes.FETCH_REVIEWS,
        payload
      });
    })
    .catch(() => {
      dispatch({ type: actionTypes.FETCH_REVIEWS_ERROR });
    });

export default fetchReviews;
