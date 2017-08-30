import express from 'express';
import userController from '../controllers/user';
import loginController from '../controllers/login';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/api/v1/users/signup', userController.signup);
router.post('/api/v1/users/signin', loginController.signin);
router.delete('/api/v1/users/deactivate', auth, userController.deactivateAccount);

export default router;
