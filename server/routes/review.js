import express from 'express';
import auth from '../middlewares/auth';
import reviewNotification from '../middlewares/mailer';
import validate from '../middlewares/validateParams';
import {
  postReview,
  fetchRecipeReviews,
  editReview,
  deleteReview } from '../controllers/review';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import { validateComment, reviewExists } from '../middlewares/reviewValidation';

const router = express.Router();

router.post('/api/v1/recipes/:recipeId/reviews', auth, validate, validateComment, validUser, recipeExists, reviewNotification, postReview);
router.get('/api/v1/recipes/:recipeId/reviews', auth, validate, validUser, recipeExists, fetchRecipeReviews);
router.patch('/api/v1/recipes/:recipeId/reviews/:id', auth, validate, validUser, recipeExists, reviewExists, editReview);
router.delete('/api/v1/recipes/:recipeId/reviews/:id', auth, validate, validUser, recipeExists, reviewExists, deleteReview);

export default router;
