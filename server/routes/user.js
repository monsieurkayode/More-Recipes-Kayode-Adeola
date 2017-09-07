import express from 'express';
import auth from '../middlewares/auth';
import userController from '../controllers/user';
import loginController from '../controllers/login';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/users/signup', userValidation.basicValidation, userValidation.validateUsername, userValidation.emailValidation, userController.signup);
router.post('/api/v1/users/signin', loginController.signin);
router.put('/api/v1/users/changepassword', auth, userValidation.validUser, userController.changePassword);

export default router;
