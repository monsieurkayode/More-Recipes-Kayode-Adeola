/* jshint esversion: 6 */
import actionTypes from '../actions/actionTypes';

const routeAction = route => dispatch =>
  dispatch({
    type: actionTypes.SELECTED_ROUTE,
    payload: route
  });

export default routeAction;
