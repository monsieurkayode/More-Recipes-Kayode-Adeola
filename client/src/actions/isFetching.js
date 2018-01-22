/* jshint esversion: 6 */
import actionTypes from './actionTypes';

const isFetching = (status, componentName) => dispatch =>
  dispatch({
    type: actionTypes.IS_FETCHING,
    payload: { status, componentName }
  });

export default isFetching;
