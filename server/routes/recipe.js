import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import recipeController from '../controllers/recipe';
import recipeValidation from '../middlewares/recipeValidation';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes', auth, userValidation.validUser, recipeValidation.basicValidation, recipeController.create);
router.get('/api/v1/recipes', auth, userValidation.validUser, recipeController.getRecipes);
router.get('/api/v1/recipes/search', auth, userValidation.validUser, recipeController.searchRecipesByIngredients);
router.get('/api/v1/recipes/sort', auth, userValidation.validUser, recipeController.getTopRecipes);
router.get('/api/v1/recipes/user', auth, userValidation.validUser, recipeController.getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, userValidation.validUser, recipeValidation.recipeExists, recipeController.update);
router.get('/api/v1/recipes/:recipeId', auth, validate, userValidation.validUser, recipeValidation.recipeExists, recipeController.viewRecipe);
router.delete('/api/v1/recipes/:recipeId', auth, validate, userValidation.validUser, recipeValidation.recipeExists, recipeController.delete);

export default router;
