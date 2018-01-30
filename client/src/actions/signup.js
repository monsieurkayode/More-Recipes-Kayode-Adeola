import axios from 'axios';
import decode from 'jwt-decode';

import actionTypes from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * @summary - Action creator for creating a new account
 *
 * @function signupAction
 *
 * @param {object} user
 * @param {function} callback
 *
 * @returns {void}
 */
const signupAction = (user, callback) => dispatch =>
  axios.post('/api/v1/users/signup', user)
    .then((response) => {
      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setAuthorizationToken(token);
        user = decode(token).user;
        Materialize
          .toast(`Welcome ${user.username}`, 4000, 'grey darken-2');
        dispatch({ type: actionTypes.SIGNUP_SUCCESSFUL, payload: user });
      }
      callback();
    })
    .catch((error) => {
      if (error.response && error.response.status >= 400) {
        const { message } = error.response.data;
        const userExists = 'Username already exists';
        const emailExists = 'Email already exists';
        if (message === userExists) {
          Materialize.toast(userExists, 4000, 'red');
          dispatch(
            {
              type: actionTypes.SIGNUP_VALIDATION_USER_ERROR,
              payload: message
            }
          );
        }
        if (message === emailExists) {
          Materialize.toast(emailExists, 4000, 'red');
          dispatch(
            {
              type: actionTypes.SIGNUP_VALIDATION_EMAIL_ERROR,
              payload: message
            }
          );
        }
      } else {
        const payload = 'An error occured! Please try again';
        Materialize.toast(payload, 4000, 'red');
        dispatch({ type: actionTypes.SIGNUP_UNSUCCESSFUL, payload });
      }
    });

export default signupAction;
