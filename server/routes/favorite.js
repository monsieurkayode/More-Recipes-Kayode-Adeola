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
const baseUrl = '/api/v1/users';

router.post(
  `${baseUrl}/:recipeId/favorites`,
  auth, validate, validUser, validRecipe, favoriteExists, addFavorite
);
router.patch(
  `${baseUrl}/:recipeId/favorites`,
  auth, validate, validUser, isValidFavorite, addRecipeCategory
);
router.delete(
  `${baseUrl}/:recipeId/favorites`,
  auth, validate, validUser, isValidFavorite, deleteFavorite
);
router.get(
  `${baseUrl}/recipes/favorites`,
  auth, validUser, getUserFavorites, searchUserFavsByCategory
);
router.get(
  `${baseUrl}/:recipeId/favorites`,
  auth, validate, validUser, isValidFavorite, getOneUserFavorite
);

export default router;
