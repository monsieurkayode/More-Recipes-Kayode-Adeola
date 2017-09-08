import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { create, update, deleteRecipe, getRecipes, searchRecipesByIngredients, getUserRecipes, viewRecipe, getTopRecipes, searchRecipesByCategory, searchUserFavsByCategory } from '../controllers/recipe';
import recipeValidation from '../middlewares/recipeValidation';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes', auth, userValidation.validUser, recipeValidation.basicValidation, create);
router.get('/api/v1/recipes', auth, userValidation.validUser, getRecipes, getTopRecipes, searchRecipesByIngredients, searchRecipesByCategory);
router.get('/api/v1/users/recipes', auth, userValidation.validUser, searchUserFavsByCategory);
router.get('/api/v1/recipes/user', auth, userValidation.validUser, getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, userValidation.validUser, recipeValidation.recipeExists, update);
router.get('/api/v1/recipes/:recipeId', auth, validate, userValidation.validUser, recipeValidation.recipeExists, viewRecipe);
router.delete('/api/v1/recipes/:recipeId', auth, validate, userValidation.validUser, recipeValidation.recipeExists, deleteRecipe);

export default router;
