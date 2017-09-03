import express from 'express';
import auth from '../middlewares/auth';
import voteController from '../controllers/vote';
import recipeValidation from '../middlewares/recipeValidation';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.put('/api/v1/recipes/:recipeId/upvote', auth, userValidation.validUser, recipeValidation.recipeExists, voteController.upvote);
router.put('/api/v1/recipes/:recipeId/downvote', auth, userValidation.validUser, recipeValidation.recipeExists, voteController.downvote);

export default router;
