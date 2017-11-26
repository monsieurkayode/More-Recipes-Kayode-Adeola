import actionTypes from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const logoutAction = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  const user = {};
  Materialize.toast('You have logged out successfully', 4000, 'green');
  dispatch({ type: actionTypes.LOGOUT_USER, payload: user });
};

export default logoutAction;
