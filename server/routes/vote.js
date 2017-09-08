import express from 'express';
import auth from '../middlewares/auth';
import { upvote, downvote } from '../controllers/vote';
import validate from '../middlewares/validateParams';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

router.put('/api/v1/recipes/:recipeId/upvote', auth, validate, validUser, recipeExists, upvote);
router.put('/api/v1/recipes/:recipeId/downvote', auth, validate, validUser, recipeExists, downvote);

export default router;
