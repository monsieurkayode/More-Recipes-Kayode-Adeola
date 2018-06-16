import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { errorHandler } from '../helpers/responseHandler';

import models from '../models';

dotenv.load();

const secret = process.env.SECRET_KEY;
const issuer = process.env.ISSUER;
const jwtid = process.env.JWT_ID;
const expiresIn = process.env.EXPIRES_IN;
const User = models.User;

/**
 * @description controller function that handles login
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message token
 */
const signin = (req, res) => User
  .findOne({ where: { username: req.body.username.toLowerCase() } })
  .then((user) => {
    if (!user) {
      return res.status(401).send({
        status: 'fail',
        message: 'Invalid Authentication Details'
      });
    }
    const check = bcrypt.compareSync(req.body.password, user.password);
    if (check) {
      const token = jwt.sign(
        {
          user: {
            id: user.id,
            username: user.username
          }
        },
        secret,
        {
          issuer,
          jwtid,
          expiresIn
        }
      );

      res.status(200).send({
        status: 'success',
        message: 'Token successfully generated',
        token,
      });
    }
    if (user && !check) {
      res.status(401).send({
        status: 'fail',
        message: 'Invalid Authentication Details'
      });
    }
  })
  .catch(() => errorHandler(500, 'An error occured!', res));

export default signin;
