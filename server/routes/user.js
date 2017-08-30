import express from 'express';
import userController from '../controllers/user';
import loginController from '../controllers/login';
import auth from '../middlewares/auth';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/users/signup', userValidation.basicValidation, userValidation.validateUsername, userValidation.emailValidation, userController.signup);
router.post('/api/v1/users/signin', loginController.signin);
router.delete('/api/v1/users/deactivate', auth, userController.deactivateAccount);

export default router;
