import bcrypt from 'bcrypt';
import db from '../models/index';

const User = db.User;

const login = {
  signin(req, res) {
    return User
      .findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'Invalid Authentication Details'
          });
        }
        const check = bcrypt.compareSync(req.body.password, user.password);
        if (check) {
          res.status(200).send({
            success: true,
            message: 'Login Successful',
          });
        } if (user && !check) {
          res.status(401).send({
            success: false,
            message: 'Invalid Authentication Details'
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },
};

export default login;
