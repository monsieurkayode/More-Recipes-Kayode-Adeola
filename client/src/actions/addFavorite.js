/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

const addFavoriteAction = recipeId => dispatch =>
  axios.post(`/api/v1/users/${recipeId}/favorites`)
    .then((response) => {
      const { message } = response.data;
      Materialize.toast(message, 4000, 'grey darken-2');
      dispatch({ type: actionTypes.ADD_FAVORITE_POST });
    })
    .catch((error) => {
      const { message } = error.response.data;
      Materialize.toast(message, 4000, 'red');
      dispatch({ type: actionTypes.ADD_FAVORITE_ERROR });
    });

export default addFavoriteAction;
