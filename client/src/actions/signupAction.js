import axios from 'axios';
import actionTypes from './actionTypes';

const signupAction = (user, callback) => dispatch => {
  axios.post('/api/v1/users/signup', user)
    .then((response) => {
    if (response.status === 201) {
      const { token, message } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type:actionTypes.SIGNUP_SUCCESSFUL, payload: message });
      callback();
    }
  })
  .catch((error) => {
    if (error.response && error.response.status >= 400 ) {
      const { message } = error.response.data;
      const userExists = 'Username already exists';
      const emailExists = 'Email already exists';
      if (message === userExists) {
        dispatch({ type:actionTypes.SIGNUP_VALIDATION_USER_ERROR, payload: message });
      }
      if (message === emailExists) {
        dispatch({ type:actionTypes.SIGNUP_VALIDATION_EMAIL_ERROR, payload: message });
      }
    }

    if (error.response && error.response.status >= 500 ) {
      const payload = 'An error occured'
      dispatch({ type:actionTypes.SIGNUP_UNSUCCESSFUL, payload});
    }
  })
}

export default signupAction;