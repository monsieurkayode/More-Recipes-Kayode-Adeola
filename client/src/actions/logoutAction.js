import actionTypes from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const logoutAction = () => dispatch => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  const user = {};
  dispatch({type: actionTypes.LOGOUT_USER, payload: user })
}

export default logoutAction;