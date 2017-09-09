import express from 'express';
import auth from '../middlewares/auth';
import { signup, changePassword } from '../controllers/user';
import signin from '../controllers/login';
import { basicValidation, validateUsername, emailValidation, validUser } from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/users/signup', basicValidation, validateUsername, emailValidation, signup);
router.post('/api/v1/users/signin', signin);
router.put('/api/v1/users/changepassword', auth, validUser, changePassword);

export default router;
