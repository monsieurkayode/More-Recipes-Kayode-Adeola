import db from '../models/index';

const User = db.User;
console.log(db.User);

const createUser = {
  signup(req, res) {
    return User
      .create(req.body, { fields: Object.keys(req.body) })
      .then(() => {
        res.status(201).send({
          success: true,
          message: 'Account successfully created',
        });
      })
      .catch(error => res.status(400).send(error));
  },
};

export default createUser;
