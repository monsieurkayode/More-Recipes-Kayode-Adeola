import express from 'express';
import auth from '../middlewares/auth';
import reviewController from '../controllers/review';
import recipeValidation from '../middlewares/recipeValidation';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes/:recipeId/reviews', auth, userValidation.validUser, recipeValidation.recipeExists, reviewController.create);

export default router;
