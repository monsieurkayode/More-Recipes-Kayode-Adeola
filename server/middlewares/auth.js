import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const secret = process.env.secretKey;

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({
            status: 'fail',
            message: 'Your session has expired, sign in again'
          });
        }
        return res.status(403).json({
          status: 'fail',
          message: 'Bad token'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      status: 'fail',
      message: 'No token provided'
    });
  }
};
export default auth;
