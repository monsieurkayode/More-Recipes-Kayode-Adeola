/* jshint esversion: 6 */
import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { validUser } from '../middlewares/userValidation';
import {
  validRecipe,
  favoriteExists,
  isValidFavorite
} from '../middlewares/favoriteValidation';
import {
  addFavorite,
  getUserFavorites,
  getOneUserFavorite,
  deleteFavorite,
  addRecipeCategory
} from '../controllers/favorite';
import { searchUserFavsByCategory } from '../controllers/recipe';

const router = express.Router();

router.post('/api/v1/users/:recipeId/favorites', auth, validate, validUser, validRecipe, favoriteExists, addFavorite);
router.patch('/api/v1/users/:recipeId/favorites', auth, validate, validUser, isValidFavorite, addRecipeCategory);
router.delete('/api/v1/users/:recipeId/favorites', auth, validate, validUser, isValidFavorite, deleteFavorite);
router.get('/api/v1/users/recipes/favorites', auth, validUser, getUserFavorites, searchUserFavsByCategory);
router.get('/api/v1/users/:recipeId/favorites', auth, validate, validUser, isValidFavorite, getOneUserFavorite);

export default router;
