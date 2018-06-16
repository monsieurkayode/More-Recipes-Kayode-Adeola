/* jshint esversion: 6 */
import actionTypes from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import resetPage from '../utils/resetPage';

/**
 * @summary - Action creator for logging out a user
 * This clears the user preferences removes authourization
 * token from the header
 *
 * @function logoutAction
 *
 * @param {void} void
 *
 * @returns {void}
 */
const logoutAction = () => (dispatch) => {
  resetPage();
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  const user = {};
  Materialize.toast('You have logged out successfully', 4000, 'grey darken-2');
  dispatch({ type: actionTypes.LOGOUT_USER, payload: user });
};

export default logoutAction;
