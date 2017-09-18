import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { validUser } from '../middlewares/userValidation';
import { validRecipe, favoriteExists, isValidFavorite } from '../middlewares/favoriteValidation';
import { addFavorite, getUserFavorites, deleteFavorite, addRecipeCategory } from '../controllers/favorite';

const router = express.Router();

router.post('/api/v1/users/:recipeId/favorites', auth, validate, validUser, validRecipe, favoriteExists, addFavorite);
router.put('/api/v1/users/:recipeId/favorites', auth, validate, validUser, validRecipe, isValidFavorite, addRecipeCategory);
router.delete('/api/v1/users/:recipeId/favorites', auth, validate, validUser, validRecipe, isValidFavorite, deleteFavorite);
router.get('/api/v1/users/recipes/favorites', auth, validUser, getUserFavorites);

export default router;
