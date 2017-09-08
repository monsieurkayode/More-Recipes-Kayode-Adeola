import db from '../models/index';

const Favorite = db.Favorite;
const Recipe = db.Recipe;

const validRecipe = (req, res, next) => {
  Recipe
    .find({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send({
          status: 'fail',
          message: 'Recipe not found'
        });
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
        return res.status(409).send({
          status: 'fail',
          message: 'Recipe has already been favorited'
        });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

export { validRecipe, favoriteExists };
