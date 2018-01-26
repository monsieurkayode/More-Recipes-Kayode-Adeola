/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for fetching five recipe posts that have the
 * highest number of upvotes. These are displayed on the home page as top trendings
 *
 * @function fetchTopRecipes
 *
 * @param {void} void
 *
 * @returns {object} dispatched action
 */
const fetchTopRecipes = () => dispatch =>
  axios.get('/api/v1/recipes?sort=upvote&order=descending')
    .then((response) => {
      const { recipes } = response.data;
      dispatch({
        type: actionTypes.FETCH_TOP_RECIPES,
        payload: recipes
      });
    })
    .catch(() => {
      dispatch({ type: actionTypes.FETCH_TOP_RECIPES_ERROR });
    });

export default fetchTopRecipes;
