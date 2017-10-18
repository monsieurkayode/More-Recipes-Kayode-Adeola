import actionTypes from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const logoutAction = () => dispatch => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  const user = {};
  dispatch({type: actionTypes.SIGNIN_SUCCESSFUL, payload: user })
}

export default logoutAction;