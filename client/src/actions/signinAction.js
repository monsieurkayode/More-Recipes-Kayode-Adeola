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
      Materialize.toast(`Welcome to More-Recipes ${user.username}`, 4000, 'green')
      dispatch({ type:actionTypes.SIGNIN_SUCCESSFUL, payload: user });
    }
  })
  .catch((error) => {
    if (error.response && error.response.status >= 401 ) {
      const { message } = error.response.data
      Materialize.toast(message, 4000, 'red')
      dispatch({ type:actionTypes.SIGNIN_UNSUCCESSFUL, payload: message });
    }
    else {
      const message = 'An error occured!';
      Materialize.toast(message, 4000, 'red');
      dispatch({ type:actionTypes.SIGNIN_UNSUCCESSFUL, payload: message });
    }
  })

export default signinAction;