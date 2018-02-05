/* jshint esversion: 6 */
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import db from '../models/index';
import cleanString from '../../shared/cleanString';
import { errorHandler } from '../helpers/responseHandler';

const User = db.User;

/**
 * @description Middleware function for validating user input
 * before creating a new account
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const basicValidation = (req, res, next) => {
  const errors = {};
  const { username, email, password, confirmPassword } = req.body;
  if (validator.isEmpty(username)) {
    errors.username = 'Please enter a username';
  }
  if (!validator.isAlphanumeric(username)) {
    errors.username = 'Username must contain alphabets and numbers only';
  }
  if (!validator.isLength(username, 3, 30)) {
    errors.username = 'Username should be at least three characters';
  }
  if (!validator.isEmail(email)) {
    errors.email = 'Invalid Email, please enter a valid email';
  }
  if (validator.isEmpty(password)) {
    errors.password = 'Please enter a password';
  }
  if (!validator.isLength(password, 6)) {
    errors.password = 'Password should be at least six characters long';
  }
  if (validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Re-enter password for confirmation';
  }
  if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = errors.password ? null : 'Password does not match';
  }
  if (isEmpty(errors)) {
    return next();
  }
  return errorHandler(400, errors, res);
};

/**
 * @description Middleware function for validating if a username has
 * already been used by another user, disallows new user from using same
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const validateUsername = (req, res, next) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) next();
      else {
        return errorHandler(
          409, 'Username already exists', res
        );
      }
    })
    .catch(error => res.status(500).send(error));
};

/**
 * @description Middleware function for validating if email has
 * already been used by another user, disallows new user from using same
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const emailValidation = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) next();
      else {
        return errorHandler(
          409, 'Email already exists', res
        );
      }
    })
    .catch(error => res.status(500).send(error));
};

/**
 * @description Middleware function for validating if a user is
 * registered or exists in the database
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const validUser = (req, res, next) => {
  User
    .findById(req.params.userId || req.decoded.user.id)
    .then((user) => {
      if (!user) {
        return errorHandler(
          401, 'Oops! 401. Seems you haven\'t created an account yet', res
        );
      }
      next();
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description Middleware function for validating
 * password confirmation match
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const validatePassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return errorHandler(
      409, 'Password does not match', res
    );
  }
  next();
};

/**
 * @description remove whitespacess from input
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 *
 * @returns {object} user inputs
 */
const trimSpaces = (req, res, next) => {
  req.body.username = req.body.username ? cleanString(req.body.username) : '';
  req.body.email = req.body.email ? cleanString(req.body.email) : '';
  req.body.password = req.body.password ? cleanString(req.body.password) : '';
  req.body.confirmPassword = req.body.confirmPassword ?
    cleanString(req.body.confirmPassword) : '';
  next();
};

export { basicValidation, validateUsername,
  emailValidation, validUser, validatePassword, trimSpaces };
