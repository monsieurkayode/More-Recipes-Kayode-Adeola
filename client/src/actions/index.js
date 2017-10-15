import axios from 'axios';

export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
export const SIGNUP_UNSUCCESSFUL = 'SIGNUP_UNSUCCESSFUL';
export const SIGNUP_VALIDATION_ERROR = 'SIGNUP_VALIDATION_ERROR';

export const signupAction = (user) => dispatch => {
  axios.post('/api/v1/users/signup', user)
    .then((response) => {
    if (response.status === 201) {
      const { token, message } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type:SIGNUP_SUCCESSFUL, payload: message });
    }
  })
  .catch((error) => {
    if (error.response && error.response.status >= 400 ) {
      const { message } = error.response.data
      dispatch({ type:SIGNUP_VALIDATION_ERROR, payload: message });
    }
    if (error.response && error.response.status >= 500 ) {
      const payload = 'An error occured'
      dispatch({ type:SIGNUP_UNSUCCESSFUL, payload});
    }
  })
}