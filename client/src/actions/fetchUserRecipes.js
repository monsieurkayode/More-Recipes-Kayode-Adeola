/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

const fetchUserRecipes = () => dispatch =>
  axios.get('/api/v1/recipes/user')
    .then((response) => {
      const { pagination, recipes } = response.data;
      dispatch({
        type: actionTypes.FETCH_USER_RECIPES,
        payload: { pagination, recipes }
      });
    })
    .catch(() => {
      const errorMessage = 'An error occured!';
      Materialize.toast(errorMessage, 4000, 'red');
      dispatch({ type: actionTypes.FETCH_USER_RECIPES_ERROR });
    });

export default fetchUserRecipes;
