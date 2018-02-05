import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorHandler } from '../helpers/responseHandler';

dotenv.load();
const secret = process.env.secretKey;

/**
 * @description Middleware for token authentication
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const auth = (req, res, next) => {
  const token = req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return errorHandler(
            403, 'Your session has expired, sign in again', res
          );
        }
        return errorHandler(
          422, 'Bad Token', res
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
