import decode from 'jwt-decode';

/**
 * @description - Function for checking token expiration validity
 * @function verifyToken
 *
 * @param {string} token
 *
 * @returns {boolean} true or false
 */
const verifyToken = (token) => {
  if (token) {
    const tokenExpiration = decode(token).exp * 1000;
    const currentTime = Date.now();
    return (!(currentTime > tokenExpiration));
  }
  return false;
};

export default verifyToken;
