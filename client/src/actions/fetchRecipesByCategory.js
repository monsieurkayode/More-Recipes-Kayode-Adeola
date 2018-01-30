/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from '../actions/actionTypes';

/**
 * @summary Action creator for fetching maximum of 9 recipe posts
 * if no limit argument is passed to the query params
 * This operation attaches an authorization token in every request header
 * and sets it to false if user is not authenticated or token validity expires
 *
 * @function fetchRecipesAction
 *
 * @param {number} page - selected page number, default is 1
 * @param {number} limit - recipes fetched limit
 * @param {object} query - the query object
 *
 * @returns {void}
 */
const fetchRecipesByCategory = (page, limit, query) => dispatch =>
  axios
    .get(
      `/api/v1/recipes?page=${page}&limit=${limit}&category=${query}`
    )
    .then((response) => {
      const payload = response.data;
      dispatch(
        {
          type: actionTypes.FETCH_RECIPES_BY_CATEGORY,
          payload
        }
      );
    })
    .catch((error) => {
      // const { message } = error.response.data;
      if (error.response.status === 404) {
        dispatch(
          {
            type: actionTypes.FETCH_RECIPES_BY_CATEGORY_ERROR,
            payload: {}
          }
        );
      }
    });

export default fetchRecipesByCategory;
