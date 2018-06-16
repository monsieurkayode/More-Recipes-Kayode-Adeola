/* jshint esversion: 6 */
import actionTypes from './actionTypes';

/**
 * @summary - Action creator for toggling the state of the
 * preloader icon before and after an action is dispatched
 *
 * @function isFetching
 *
 * @param {boolean} status
 * @param {string} componentName - component action is dipatched from
 *
 * @returns {void}
 */
const isFetching = (status, componentName) => dispatch =>
  dispatch({
    type: actionTypes.IS_FETCHING,
    payload: { status, componentName }
  });

export default isFetching;
