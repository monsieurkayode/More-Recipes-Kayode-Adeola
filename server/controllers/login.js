import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorHandler } from '../helpers/responseHandler';

import db from '../models/index';

dotenv.load();
const secret = process.env.secretKey;
const issuer = process.env.issuer;
const jwtid = process.env.jwtid;
const expiresIn = process.env.expiresIn;
const User = db.User;

/**
 * @description controller function that handles login
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message token
 */
const signin = (req, res) => User
  .findOne({ where: { username: req.body.username } })
  .then((user) => {
    if (!user) {
      return res.status(401).send({
        status: 'fail',
        message: 'Invalid Authentication Details'
      });
    }
    const check = bcrypt.compareSync(req.body.password, user.password);
    if (check) {
      const token = jwt.sign({ user: { id: user.id, username: user.username } },
        secret, { issuer, jwtid, expiresIn });
      res.status(200).send({
        status: 'success',
        message: 'Token successfully generated',
        Token: token,
      });
    } if (user && !check) {
      res.status(401).send({
        status: 'fail',
        message: 'Invalid Authentication Details'
      });
    }
  })
  .catch(() => errorHandler(500, 'An error occured!', res));

/**
 *@export signin
 */
export default signin;
