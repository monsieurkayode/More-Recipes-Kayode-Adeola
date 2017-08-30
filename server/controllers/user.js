import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models/index';

dotenv.load();
const User = db.User;
const secret = process.env.secretKey;

const createUser = {
  signup(req, res) {
    return User
      .create(req.body, { fields: Object.keys(req.body) })
      .then((user) => {
        const token = jwt.sign(
          { userId: user.id,
            username: user.username,
            email: user.email,
          }, secret
        );
        res.status(201).send({
          success: true,
          message: 'Account successfully created',
          id: jwt.decode(token).userId,
          username: jwt.decode(token).username,
          email: jwt.decode(token).email
        });
      })
      .catch(error => res.status(400).send(error));
  },
};

export default createUser;
