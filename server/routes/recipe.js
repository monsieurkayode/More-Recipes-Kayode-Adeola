import express from 'express';
import multer from 'multer';
import jimp from 'jimp';
import uuid from 'uuid';
import isEmpty from 'lodash/isEmpty';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { create, update, deleteRecipe, getRecipes, searchRecipesByIngredients, getUserRecipes, viewRecipe, getTopRecipes, searchRecipesByCategory, searchUserFavsByCategory } from '../controllers/recipe';
import { recipeBasicValidation, recipeExists } from '../middlewares/recipeValidation';
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
  const image = jimp.read(req.file.buffer)
    .then(photo => photo.resize(800, jimp.AUTO))
    .then(photo => photo.write(`./client/public/uploads/${req.body.image}`));
  next();
};

const upload = multer(multerOptions).single('image');

router.post('/api/v1/recipes', auth, upload, validUser, recipeBasicValidation, resize, create);
router.get('/api/v1/recipes', auth, validUser, getRecipes, getTopRecipes, searchRecipesByIngredients, searchRecipesByCategory);
router.get('/api/v1/users/recipes', auth, validUser, searchUserFavsByCategory);
router.get('/api/v1/recipes/user', auth, validUser, getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, update);
router.get('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, viewRecipe);
router.delete('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, deleteRecipe);

export default router;
