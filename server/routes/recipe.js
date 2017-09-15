import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { create, update, deleteRecipe, getRecipes, searchRecipesByIngredients, getUserRecipes, viewRecipe, getTopRecipes, searchRecipesByCategory, searchUserFavsByCategory } from '../controllers/recipe';
import { recipeBasicValidation, recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes', auth, validUser, recipeBasicValidation, create);
router.get('/api/v1/recipes', auth, validUser, getRecipes, getTopRecipes, searchRecipesByIngredients, searchRecipesByCategory);
router.get('/api/v1/users/recipes', auth, validUser, searchUserFavsByCategory);
router.get('/api/v1/recipes/user', auth, validUser, getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, update);
router.get('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, viewRecipe);
router.delete('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, deleteRecipe);

export default router;
