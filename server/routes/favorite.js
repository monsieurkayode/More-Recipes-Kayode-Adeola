import express from 'express';
import auth from '../middlewares/auth';
import userValidation from '../middlewares/userValidation';
import favoriteValidation from '../middlewares/favoriteValidation';
import { addFavorite, getUserFavorites, addRecipeCategory } from '../controllers/favorite';

const router = express.Router();

router.post('/api/v1/users/:recipeId/favorites', auth, userValidation.validUser, favoriteValidation.validRecipe, favoriteValidation.favoriteExists, addFavorite);
router.put('/api/v1/users/:recipeId/favorites', auth, userValidation.validUser, favoriteValidation.validRecipe, addRecipeCategory);
router.get('/api/v1/users/recipes/favorites', auth, userValidation.validUser, getUserFavorites);

export default router;
