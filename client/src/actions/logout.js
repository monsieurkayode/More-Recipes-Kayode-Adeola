/* jshint esversion: 6 */
import actionTypes from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import sampleRecipes from '../utils/sampleRecipes';

const logoutAction = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  const user = {};
  Materialize.toast('You have logged out successfully', 4000, 'grey darken-2');
  dispatch({ type: actionTypes.LOGOUT_USER, payload: user });
  dispatch({ type: actionTypes.FETCH_SAMPLE_RECIPES, payload: sampleRecipes });
};

export default logoutAction;
