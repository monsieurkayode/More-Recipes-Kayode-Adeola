import express from 'express';
import auth from '../middlewares/auth';
import reviewNotification from '../utils/mailer';
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
const baseUrl = '/api/v1/recipes/:recipeId/reviews';

router.post(
  `${baseUrl}`,
  auth, validate, validateComment, validUser,
  recipeExists, reviewNotification, postReview
);

router.get(`${baseUrl}`,
  auth, validate, validUser, recipeExists, fetchRecipeReviews
);

router.patch(
  `${baseUrl}/:id`,
  auth, validate, validUser, recipeExists, reviewExists, editReview
);

router.delete(
  `${baseUrl}/:id`,
  auth, validate, validUser, recipeExists, reviewExists, deleteReview
);

export default router;
