import express from 'express';

import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  searchRecipesByIngredients,
  getUserRecipes,
  viewRecipe,
  getTopRecipes,
  searchRecipesByCategory,
  searchRecipesByName } from '../controllers/recipe';
import {
  recipeBasicValidation,
  recipeExists,
  checkMultiplePost,
  checkPermission
} from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import imageUploader, { uploadImage } from '../middlewares/uploadImage';

const router = express.Router();

const baseUrl = '/api/v1/recipes';

const { validateImage } = imageUploader('image');

router.post(
  `${baseUrl}`,
  auth, validateImage, validUser, recipeBasicValidation,
  checkMultiplePost, uploadImage, createRecipe
);

router.get(`${baseUrl}`,
  auth, validUser, getRecipes, getTopRecipes,
  searchRecipesByIngredients, searchRecipesByCategory, searchRecipesByName
);

router.get(`${baseUrl}/user`, auth, validUser, getUserRecipes);

router.put(`${baseUrl}/:recipeId`,
  auth, validate, validateImage, validUser, recipeExists,
  checkPermission, uploadImage, updateRecipe
);

router.get(
  `${baseUrl}/:recipeId`,
  auth, validate, validUser, recipeExists, viewRecipe
);

router.delete(`${baseUrl}/:recipeId`,
  auth, validate, validUser, recipeExists, checkPermission, deleteRecipe
);

export default router;
