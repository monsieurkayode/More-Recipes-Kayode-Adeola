import express from 'express';
import auth from '../middlewares/auth';
import { reviewNotification } from '../middlewares/mailer';
import validate from '../middlewares/validateParams';
import postReview from '../controllers/review';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes/:recipeId/reviews', auth, validate, validUser, recipeExists, reviewNotification, postReview);

export default router;
