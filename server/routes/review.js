import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import postReview from '../controllers/review';
import recipeValidation from '../middlewares/recipeValidation';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes/:recipeId/reviews', auth, validate, userValidation.validUser, recipeValidation.recipeExists, postReview);

export default router;
