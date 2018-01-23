/* jshint esversion: 6 */
import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import sampleRecipes from '../utils/sampleRecipes';

/**
 * @summary Action creator for fetching maximum of 8 recipe posts
 * if no limit argument is passed to the query params
 * This operation attaches an authorization token in every request header
 * and sets it to false if user is not authenticated or token validity expires
 *
 * @function fetchRecipesAction
 *
 * @param {number} page selected page number
 *
 * @returns {void}
 */
const fetchRecipesAction = page => dispatch =>
  axios.get(`/api/v1/recipes?page=${page}`)
    .then((response) => {
      const payload = response.data;
      dispatch({ type: actionTypes.FETCH_RECIPES, payload });
    })
    .catch((error) => {
      const { message } = error.response.data;
      if (message !== 'Bad Token') {
        Materialize.toast(message, 4000, 'red');
      }

      if (error.response.status === 403) {
        localStorage.removeItem('token');
        setAuthorizationToken(false);
        const user = {};
        dispatch({ type: actionTypes.SESSION_EXPIRED });
        dispatch({ type: actionTypes.LOGOUT_USER, payload: user });
        dispatch({
          type: actionTypes.FETCH_SAMPLE_RECIPES,
          payload: sampleRecipes
        });
      }
    });

export default fetchRecipesAction;
