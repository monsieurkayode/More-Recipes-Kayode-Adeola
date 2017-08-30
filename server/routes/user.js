import express from 'express';
import userController from '../controllers/user';
import loginController from '../controllers/login';

const router = express.Router();

router.post('/api/v1/users/signup', userController.signup);
router.post('/api/v1/users/signin', loginController.signin);

export default router;
