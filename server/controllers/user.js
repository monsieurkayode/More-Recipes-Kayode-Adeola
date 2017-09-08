import dotenv from 'dotenv';
import db from '../models/index';
import cleanString from '../helpers/cleanString';
import { errorHandler } from '../helpers/responseHandler';

dotenv.load();
const User = db.User;

const signup = (req, res) => User
  .create(req.body, { fields: Object.keys(req.body) })
  .then(user =>
    res.status(201).send({
      id: user.id,
      username: user.username,
      email: user.email,
      status: 'success',
      message: 'Account successfully created',
    }))
  .catch(error => res.status(400).send(error));

const changePassword = (req, res) => User
  .findById(req.decoded.user.id)
  .then((user) => {
    if (!user) {
      return errorHandler(404, 'User does not exist', res);
    }
    if (user && req.body.password && user.id === req.decoded.user.id) {
      if (cleanString(req.body.password).length > 5) {
        return user
          .update({
            password: req.body.password
          }).then(() => res.status(200).send({
            status: 'success',
            message: 'Password changed successfully'
          }));
      }
    }
    return res.status(401).send({
      status: 'fail',
      message: 'Your request could not be authenticated'
    });
  })
  .catch(error => res.status(400).send(error));

export { signup, changePassword };
