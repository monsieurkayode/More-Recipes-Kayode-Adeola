import express from 'express';
import auth from '../middlewares/auth';
import userValidation from '../middlewares/userValidation';
import favoriteValidation from '../middlewares/favoriteValidation';
import favoriteController from '../controllers/favorite';

const router = express.Router();

router.post('/api/v1/users/:recipeId/favorites', auth, userValidation.validUser, favoriteValidation.validRecipe, favoriteValidation.favoriteExists, favoriteController.addFavorite);
router.put('/api/v1/users/:recipeId/favorites', auth, userValidation.validUser, favoriteValidation.validRecipe, favoriteController.addRecipeCategory);
router.get('/api/v1/users/:userId/recipes', auth, userValidation.validUser, favoriteController.getUserFavorites);

export default router;
