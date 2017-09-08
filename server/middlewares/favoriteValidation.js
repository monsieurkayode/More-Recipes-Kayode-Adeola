import db from '../models/index';
import errorHandler from '../helpers/responseHandler';

const Favorite = db.Favorite;
const Recipe = db.Recipe;

const validRecipe = (req, res, next) => {
  Recipe
    .find({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      if (!recipe) {
        return errorHandler(
          404, 'Recipe not found', res
        );
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

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
    .catch(error => res.status(400).send(error));
};

export { validRecipe, favoriteExists };
