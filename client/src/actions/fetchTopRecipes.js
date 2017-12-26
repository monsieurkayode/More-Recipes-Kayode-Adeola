/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

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
