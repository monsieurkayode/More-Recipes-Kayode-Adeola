import dotenv from 'dotenv';
import db from '../models/index';
import cleanString from '../helpers/cleanString';

dotenv.load();
const User = db.User;

const userController = {
  signup(req, res) {
    return User
      .create(req.body, { fields: Object.keys(req.body) })
      .then((user) => {
        res.status(201).send({
          id: user.id,
          username: user.username,
          email: user.email,
          status: 'success',
          message: 'Account successfully created',
        });
      })
      .catch(error => res.status(400).send(error));
  },
  changePassword(req, res) {
    return User
      .findById(req.decoded.user.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'fail',
            message: 'User does not exist'
          });
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
        return res.status(503).send({
          status: 'fail',
          message: 'Your request could not be completed at this time'
        });
      })
      .catch(error => res.status(400).send(error));
  }
};

export default userController;
