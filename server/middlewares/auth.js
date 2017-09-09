// import module dependencies
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import errorHandler from '../helpers/responseHandler';

// Load environment variables
dotenv.load();
const secret = process.env.secretKey;

/**
 * 
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next 
 * @returns {object} status message
 */
const auth = (req, res, next) => {
  // Reference token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // Authenticate token if provided
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        // If token authentication fails due to expiration
        if (err.name === 'TokenExpiredError') {
          return errorHandler(
            403, 'Your session has expired, sign in again', res
          );
        }
        // Return error if token is bad
        return errorHandler(
          403, 'Bad Token', res
        );
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return errorHandler(
      403, 'No Token provided', res
    );
  }
};
export default auth;
