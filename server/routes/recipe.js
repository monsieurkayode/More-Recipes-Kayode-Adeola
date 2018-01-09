/* jshint esversion: 6 */
import express from 'express';
import multer from 'multer';
import jimp from 'jimp';
import uuid from 'uuid';
import isEmpty from 'lodash/isEmpty';
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

const router = express.Router();
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    if (!isEmpty(file)) {
      const isPhoto = file.mimetype.startsWith('image/');
      if (isPhoto) {
        return next(null, true);
      }
      return next({ message: 'File type is invalid' }, false);
    }
    next();
  }
};

const resize = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${uuid.v4()}.${extension}`;
  jimp.read(req.file.buffer)
    .then(photo => photo.resize(800, jimp.AUTO))
    .then(photo => photo.write(`./client/public/uploads/${req.body.image}`));
  next();
};

const upload = multer(multerOptions).single('image');

router.post('/api/v1/recipes', auth, upload, validUser, recipeBasicValidation, checkMultiplePost, resize, createRecipe);
router.get('/api/v1/recipes', auth, validUser, getRecipes, getTopRecipes, searchRecipesByIngredients, searchRecipesByCategory, searchRecipesByName);
router.get('/api/v1/recipes/user', auth, validUser, getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, validate, upload, validUser, recipeExists, checkPermission, resize, updateRecipe);
router.get('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, viewRecipe);
router.delete('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, checkPermission, deleteRecipe);

export default router;
