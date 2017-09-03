import express from 'express';
import auth from '../middlewares/auth';
import reviewController from '../controllers/review';

const router = express.Router();

router.post('/api/v1/recipes/:recipeId/reviews', auth, reviewController.create);

export default router;
