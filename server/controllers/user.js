// Import module dependencies
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import cleanString from '../helpers/cleanString';
import { errorHandler } from '../helpers/responseHandler';

// Load environment variables
dotenv.load();
const secret = process.env.secretKey;
const issuer = process.env.issuer;
const jwtid = process.env.jwtid;
const expiresIn = process.env.expiresIn;

// Reference database model User
const User = db.User;

/**
 * 
 * @description controller function that handles creation of new user account
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message token
 */
const signup = (req, res) => User
  .create(req.body, { fields: Object.keys(req.body) })
  .then((user) => {
    // Generate token with body payload containing user id, username
    // and email to be used for authentication
    const token = jwt.sign({
      user: { id: user.id, username: user.username, email: user.email } },
    secret, { issuer, jwtid, expiresIn });
    res.status(201).send({
      status: 'success',
      message: 'Account successfully created',
      token
    });
  })
  .catch(error => res.status(400).send(error));

/**
 * 
 * @description controller function that handles changing user password
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const changePassword = (req, res) => User
  // Query user data from database using decoded id from token
  .findById(req.decoded.user.id)
  .then((user) => {
    if (!user) {
      // If user not found return an error response
      return errorHandler(404, 'User does not exist', res);
    }
    // If user exists, verify identity matches before completing request
    if (user && req.body.password && user.id === req.decoded.user.id) {
      // Lets make sure empty character is not supplied
      if (cleanString(req.body.password).length > 5) {
        return user
        // If all is well and good do the change
          .update({
            password: req.body.password
          }).then(() => res.status(200).send({
            status: 'success',
            message: 'Password changed successfully'
          }));
      }
    }
    // Something probably went wrong
    return res.status(401).send({
      status: 'fail',
      message: 'Your request could not be authorized'
    });
  })
  .catch(error => res.status(400).send(error));

export { signup, changePassword };
