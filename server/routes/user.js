import express from 'express';
import auth from '../middlewares/auth';
import { signup, changePassword } from '../controllers/user';
import signin from '../controllers/login';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/users/signup', userValidation.basicValidation, userValidation.validateUsername, userValidation.emailValidation, signup);
router.post('/api/v1/users/signin', signin);
router.put('/api/v1/users/changepassword', auth, userValidation.validUser, changePassword);

export default router;
