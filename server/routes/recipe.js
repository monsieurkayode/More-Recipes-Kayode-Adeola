import express from 'express';
import auth from '../middlewares/auth';
import recipeController from '../controllers/recipe';
import recipeValidation from '../middlewares/recipeValidation';

const router = express.Router();

router.post('/api/v1/recipes', auth, recipeValidation.basicValidation, recipeController.create);
router.get('/api/v1/recipes', auth, recipeController.getRecipes);
router.get('/api/v1/recipes/user', auth, recipeController.getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, recipeValidation.recipeExists, recipeValidation.basicValidation, recipeController.update);
router.delete('/api/v1/recipes/:recipeId', auth, recipeValidation.recipeExists, recipeController.delete);

export default router;
