/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

/**
 * @summary - Action creator for switching components
 * on a user's dashboard
 *
 * @function routeAction
 *
 * @param {string} route
 *
 * @returns {void}
 */
const routeAction = route => dispatch =>
  dispatch({
    type: actionTypes.SELECTED_ROUTE,
    payload: route
  });

export default routeAction;
