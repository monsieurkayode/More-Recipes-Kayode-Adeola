import axios from 'axios';
import actionTypes from './actionTypes';
import decode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const signinAction = (user) => dispatch =>
  axios.post('/api/v1/users/signin', user)
    .then((response) => {
    if (response.status === 200) {
      const { Token } = response.data;
      localStorage.setItem('token', Token);
      setAuthorizationToken(Token);
      const user = decode(Token).user;
      dispatch({ type:actionTypes.SIGNIN_SUCCESSFUL, payload: user });
    }
  })
  .catch((error) => {
    if (error.response && error.response.status >= 400 ) {
      const { message } = error.response.data
      dispatch({ type:actionTypes.SIGNIN_UNSUCCESSFUL, payload: message });
    }
  })

export default signinAction;