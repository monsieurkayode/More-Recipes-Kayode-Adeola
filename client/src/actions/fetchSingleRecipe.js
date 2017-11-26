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
        Materialize.toast('You are not logged in', 4000, 'red');
      }
    });

export default fetchSingleRecipe;
