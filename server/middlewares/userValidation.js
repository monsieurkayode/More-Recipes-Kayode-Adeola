import db from '../models/index';
import isAlphaNumeric from '../helpers/isAlphaNum';
import isEmail from '../helpers/isEmail';
import cleanString from '../helpers/cleanString';
import errorHandler from '../helpers/responseHandler';

const User = db.User;

const basicValidation = (req, res, next) => {
  if (req.body.username && req.body.password && req.body.email) {
    req.body.username = cleanString(req.body.username);
    req.body.password = cleanString(req.body.password);
    req.body.email = cleanString(req.body.email);

    if (!req.body.username) {
      return errorHandler(400, 'Please enter a username', res);
    }
    if (!isAlphaNumeric(req.body.username)) {
      return errorHandler(
        400, 'Username must contain alphabets and numbers only', res
      );
    }
    if (req.body.username.length < 3) {
      return errorHandler(
        400, 'Username should be at least three characters', res
      );
    }
    if (!req.body.email || !isEmail(req.body.email)) {
      return errorHandler(
        400, 'Invalid Email, please enter a valid email', res
      );
    }
    if (!req.body.password) {
      return errorHandler(
        400, 'Please enter a password', res
      );
    }
    if (req.body.password.length < 6) {
      return errorHandler(
        400, 'Password should be at least six characters long', res
      );
    }
  } else if (!req.body.username || !req.body.email || !req.body.password) {
    return errorHandler(
      400, 'Please compelete all form fields', res
    );
  }
  next();
};

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
    .catch(error => errorHandler(400, error, res));
};

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
    .catch(error => errorHandler(400, error));
};

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
    });
};

export { basicValidation, validateUsername, emailValidation, validUser };
