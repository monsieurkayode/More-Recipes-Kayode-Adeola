import models from '../models';
import { errorHandler } from '../helpers/responseHandler';

const Favorite = models.Favorite;
const Recipe = models.Recipe;

/**
 * @description Middleware function for validating if a recipe exists
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const validRecipe = (req, res, next) => {
  Recipe
    .find({
      where: {
        id: req.params.recipeId
      }
    })
    .then((recipe) => {
      if (recipe) return next();
      return errorHandler(
        404, 'Recipe not found', res
      );
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description Middleware function for validating if a favorite recipe exists
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const favoriteExists = (req, res, next) => {
  Favorite
    .find({ where: {
      userId: req.decoded.user.id,
      recipeId: req.params.recipeId }
    })
    .then((favorite) => {
      if (favorite) {
        return errorHandler(
          409, 'Recipe has already been favorited', res
        );
      }
      next();
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description Middleware function for validating if a favorite
 * has not been added by a user
 *
 * @function isValidFavorite
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const isValidFavorite = (req, res, next) => {
  Favorite
    .find({ where: {
      userId: req.decoded.user.id,
      recipeId: req.params.recipeId }
    })
    .then((favorite) => {
      if (!favorite) {
        return errorHandler(
          404, 'Recipe has not been added to favorite', res
        );
      }
      next();
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};
export {
  validRecipe,
  favoriteExists,
  isValidFavorite
};
