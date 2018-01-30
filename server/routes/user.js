import express from 'express';
import auth from '../middlewares/auth';
import { signup, changePassword } from '../controllers/user';
import signin from '../controllers/login';
import {
  basicValidation,
  validateUsername,
  emailValidation,
  validUser,
  trimSpaces
} from '../middlewares/userValidation';

const router = express.Router();
const baseUrl = '/api/v1/users';

router.post(`${baseUrl}/signin`, signin);

router.post(`${baseUrl}/signup`,
  trimSpaces, basicValidation, validateUsername, emailValidation, signup
);

router.put(`${baseUrl}/changepassword`, auth, validUser, changePassword);

export default router;
