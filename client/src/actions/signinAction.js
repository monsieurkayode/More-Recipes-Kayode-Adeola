import axios from 'axios';
import actionTypes from './actionTypes';

const signinAction = (user, callback) => dispatch => {
  axios.post('/api/v1/users/signin', user)
    .then((response) => {
    if (response.status === 200) {
      const { Token } = response.data;
      localStorage.setItem('token', Token);
      dispatch({ type:actionTypes.SIGNIN_SUCCESSFUL });
      callback();
    }
  })
  .catch((error) => {
    if (error.response && error.response.status >= 400 ) {
      const { message } = error.response.data
      dispatch({ type:actionTypes.SIGNIN_UNSUCCESSFUL, payload: message });
    }
  })
}

export default signinAction;