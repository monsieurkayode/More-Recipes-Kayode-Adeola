/**
 * import module dependencies
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/index';

// load environment variables
dotenv.load();
const secret = process.env.secretKey;
const issuer = process.env.issuer;
const jwtid = process.env.jwtid;
const expiresIn = process.env.expiresIn;
const User = db.User;

/**
 * @description controller function that handles login
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message token
 */
const signin = (req, res) => User
  // Do a database query to check if user exists
  .findOne({ where: { username: req.body.username } })
  .then((user) => {
    if (!user) {
      // Return a failed authentication message if user does not exist
      return res.status(401).send({
        status: 'fail',
        message: 'Invalid Authentication Details'
      });
    }
    // If user was found, do a password authentication first
    const check = bcrypt.compareSync(req.body.password, user.password);
    // If password verification passes generate a token and return to user
    if (check) {
      const token = jwt.sign({ user: { id: user.id, username: user.username } }, secret,
        { issuer, jwtid, expiresIn });
      res.status(200).send({
        status: 'success',
        message: 'Token successfully generated',
        Token: token,
      });
      // If user exists but password verifcation fails, return an
      // authentication failure message to user
    } if (user && !check) {
      res.status(401).send({
        status: 'fail',
        message: 'Invalid Authentication Details'
      });
    }
  })
  .catch(error => res.status(400).send(error));

/**
 *@export signin
 */
export default signin;
