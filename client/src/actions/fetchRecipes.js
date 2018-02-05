/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * @summary Action creator for fetching maximum of 8 recipe posts
 * if no limit argument is passed to the query params
 * This operation attaches an authorization token in every request header
 * and sets it to false if user is not authenticated or token validity expires
 *
 * @function fetchRecipesAction
 *
 * @param {number} page - selected page number, default is 1
 * @param {number} limit - recipes fetched limit
 *
 * @returns {void}
 */
const fetchRecipesAction = (page, limit) => dispatch =>
  axios
    .get(
      `/api/v1/recipes?page=${page}&limit=${limit}`
    )
    .then((response) => {
      const payload = response.data;
      dispatch(
        {
          type: actionTypes.FETCH_RECIPES,
          payload
        }
      );
    })
    .catch((error) => {
      const { message } = error.response.data;
      if (error.response.status === 404) {
        dispatch({
          type: actionTypes.FETCH_RECIPES_ERROR
        });
      }

      if (error.response.status === 403) {
        localStorage.removeItem('token');
        setAuthorizationToken(false);
        Materialize.toast(message, 4000, 'red');
        const user = {};
        dispatch({ type: actionTypes.SESSION_EXPIRED });
        dispatch({ type: actionTypes.LOGOUT_USER, payload: user });
      }
      if (error.response.status >= 500) {
        const errorMsg = 'An error occured!';
        Materialize.toast(errorMsg, 4000, 'red');
        dispatch({
          type: actionTypes.FETCH_RECIPES_ERROR
        });
      }
    });

export default fetchRecipesAction;
