import axios from 'axios';
import actionTypes from '../actions/actionTypes';

const fetchSingleRecipe = recipeId => dispatch =>
  axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      const payload = response.data;
      dispatch({ type: actionTypes.FETCH_SINGLE_RECIPE, payload });
    })
    .catch((error) => {
      if (error.response.status === 403) {
        return Materialize.toast('You are not logged in', 4000, 'red');
      }
      window.location.replace('/error?no-resource');
      dispatch({ type: actionTypes.FETCH_SINGLE_RECIPE_ERROR });
    });

export default fetchSingleRecipe;
