import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/index';

dotenv.load();
const secret = process.env.secretKey;
const issuer = process.env.issuer;
const jwtid = process.env.jwtid;
const expiresIn = process.env.expiresIn;
const User = db.User;

const loginController = {
  signin(req, res) {
    return User
      .findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'fail',
            message: 'Invalid Authentication Details'
          });
        }
        const check = bcrypt.compareSync(req.body.password, user.password);
        if (check) {
          const token = jwt.sign({ user }, secret,
            { issuer, jwtid, expiresIn });
          res.status(200).send({
            status: 'success',
            message: 'Token successfully generated',
            Token: token
          });
        } if (user && !check) {
          res.status(401).send({
            status: 'fail',
            message: 'Invalid Authentication Details'
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },
};

export default loginController;
