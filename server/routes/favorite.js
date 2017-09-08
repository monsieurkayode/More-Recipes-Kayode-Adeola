import express from 'express';
import auth from '../middlewares/auth';
import { validUser } from '../middlewares/userValidation';
import { validRecipe, favoriteExists } from '../middlewares/favoriteValidation';
import { addFavorite, getUserFavorites, addRecipeCategory } from '../controllers/favorite';

const router = express.Router();

router.post('/api/v1/users/:recipeId/favorites', auth, validUser, validRecipe, favoriteExists, addFavorite);
router.put('/api/v1/users/:recipeId/favorites', auth, validUser, validRecipe, addRecipeCategory);
router.get('/api/v1/users/recipes/favorites', auth, validUser, getUserFavorites);

export default router;
