import axios from 'axios';
import actionTypes from '../actions/actionTypes';

/**
 * @summary Action creator for fetching one recipe post
 *
 * @function fetchSingleRecipe
 *
 * @param {number} recipeId - Id of recipe
 *
 * @returns {void}
 */
const fetchSingleRecipe = recipeId => dispatch =>
  axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      const payload = response.data;
      dispatch(
        {
          type: actionTypes.FETCH_SINGLE_RECIPE,
          payload
        }
      );
    })
    .catch((error) => {
      if (error.response.status === 403) {
        dispatch({ type: actionTypes.FETCH_SINGLE_RECIPE_ERROR });
        return Materialize.toast('You are not logged in', 4000, 'red');
      }
      if (process.env.NODE_ENV !== 'test') {
        window.location.replace('/error?info=resource-not-found');
      }
      dispatch({ type: actionTypes.FETCH_SINGLE_RECIPE_ERROR });
    });

export default fetchSingleRecipe;
