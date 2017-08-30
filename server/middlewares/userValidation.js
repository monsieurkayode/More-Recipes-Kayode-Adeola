import db from '../models/index';
import isAlphaNumeric from '../helpers/isAlphaNum';
import isEmail from '../helpers/isEmail';
import cleanString from '../helpers/cleanString';

const User = db.User;

const userValidation = {
  basicValidation(req, res, next) {
    req.body.username = cleanString(req.body.username);
    req.body.password = cleanString(req.body.password);
    req.body.email = cleanString(req.body.email);
    if (!req.body.username) {
      return res.status(400).send({
        success: false,
        message: 'Please enter a username'
      });
    }
    if (!isAlphaNumeric(req.body.username)) {
      return res.status(400).send({
        success: false,
        message: 'Username must contain alphabets and numbers only'
      });
    }
    if (req.body.username.length < 3) {
      return res.status(400).send({
        success: false,
        message: 'Username should be at least three characters'
      });
    }
    if (!req.body.email || !isEmail(req.body.email)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Email, please enter a valid email'
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
        success: false,
        message: 'Please enter a password'
      });
    }
    if (req.body.password.length < 6) {
      return res.status(400).send({
        success: false,
        message: 'Password should be at least six characters long'
      });
    }
    next();
  },
  validateUsername(req, res, next) {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) next();
        else {
          return res.status(409).send({
            success: false,
            message: 'Username already exists'
          });
        }
      })
      .catch(error => res.status(404).send(error));
  },
  emailValidation(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) next();
        else {
          res.status(409).send({
            success: false,
            message: 'Email already exists'
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  validUser(req, res, next) {
    User
      .findById(req.decoded.user.id)
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            success: false,
            message: 'Access denied, you need to register'
          });
        }
        next();
      });
  }
};

export default userValidation;
