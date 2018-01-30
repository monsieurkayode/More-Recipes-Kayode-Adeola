import axios from 'axios';
import verifyToken from '../utils/verifyToken';

/**
 *
 * @description - Sets defaults header options for http requests
 * @function setAuthorizationToken
 *
 * @param {string} token
 *
 * @returns {void}
 */
const setAuthorizationToken = (token) => {
  if (verifyToken(token)) {
    axios.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthorizationToken;
