import express from 'express';
import auth from '../middlewares/auth';
import recipeController from '../controllers/recipe';

const router = express.Router();

router.post('/api/v1/recipes', auth, recipeController.create);

export default router;
