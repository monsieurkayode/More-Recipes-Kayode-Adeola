import axios from 'axios';
import decode from 'jwt-decode';

import actionTypes from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * @summary - Action creator for creating a new account
 *
 * @function signupAction
 *
 * @param {object} userDetails
 * @param {function} callback
 *
 * @returns {void}
 */
const signupAction = userDetails => dispatch =>
  axios.post('/api/v1/users/signup', userDetails)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      const user = decode(token).user;
      Materialize
        .toast(`Welcome ${user.username}`, 4000, 'grey darken-2');
      dispatch({ type: actionTypes.SIGNUP_SUCCESSFUL, payload: user });
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        const { message } = error.response.data;
        const userExists = 'Username already exists';
        const emailExists = 'Email already exists';
        if (message === userExists) {
          Materialize.toast(userExists, 4000, 'red');
          dispatch(
            {
              type: actionTypes.SIGNUP_VALIDATION_USER_ERROR
            }
          );
        }
        if (message === emailExists) {
          Materialize.toast(emailExists, 4000, 'red');
          dispatch(
            {
              type: actionTypes.SIGNUP_VALIDATION_EMAIL_ERROR
            }
          );
        }
      } else {
        const payload = 'An error occured! Please try again';
        Materialize.toast(payload, 4000, 'red');
        dispatch(
          {
            type: actionTypes.SIGNUP_UNSUCCESSFUL
          }
        );
      }
    });

export default signupAction;
