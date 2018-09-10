/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

/**
 * @summary - Action creator for fetching recipes belonging to
 * or added by the current user
 *
 * @function fetchUserRecipes
 *
 * @param {number} page - selected page number
 *
 * @returns {void}
 */
const fetchUserRecipes = page => dispatch =>
  axios.get(`/api/v1/recipes/user?page=${page}`)
    .then((response) => {
      const { pagination, recipes } = response.data;
      dispatch({
        type: actionTypes.FETCH_USER_RECIPES,
        payload: { pagination, recipes }
      });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'DashboardPage' }
      });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch({ type: actionTypes.FETCH_USER_RECIPES_ERROR });
      }
      if (error.response.status > 404) {
        const errorMessage = 'An error occured!';
        Materialize.toast(errorMessage, 4000, 'red');
        dispatch({ type: actionTypes.FETCH_USER_RECIPES_ERROR });
      }
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'DashboardPage' }
      });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'UserRecipes' }
      });
    });

export default fetchUserRecipes;
