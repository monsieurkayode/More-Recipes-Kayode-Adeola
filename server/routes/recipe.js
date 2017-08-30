import express from 'express';
import auth from '../middlewares/auth';
import recipeController from '../controllers/recipe';

const router = express.Router();

router.post('/api/v1/recipes', auth, recipeController.create);
router.get('/api/v1/recipes', auth, recipeController.getRecipes);
router.get('/api/v1/recipes/user', auth, recipeController.getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, recipeController.update);
router.delete('/api/v1/recipes/:recipeId', auth, recipeController.delete);

export default router;
