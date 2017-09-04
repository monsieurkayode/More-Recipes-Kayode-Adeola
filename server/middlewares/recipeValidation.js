import db from '../models/index';
import isEmpty from '../helpers/isEmpty';

const Recipe = db.Recipe;

const recipeValidation = {
  basicValidation(req, res, next) {
    if (!req.body.recipeName || isEmpty(req.body.recipeName)) {
      return res.status(406).send({
        success: false,
        message: 'Please enter a recipe name'
      });
    }
    if (!req.body.ingredients || isEmpty(req.body.ingredients)) {
      return res.status(406).send({
        success: false,
        message: 'Ingredients field cannot be empty'
      });
    }
    if (!req.body.instructions || isEmpty(req.body.instructions)) {
      return res.status(406).send({
        success: false,
        message: 'Instructions field cannot be empty'
      });
    }
    next();
  },
  recipeExists(req, res, next) {
    Recipe
      .find({ where: { id: req.params.recipeId } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            message: 'Recipe not found'
          });
        }
        next();
      })
      .catch(error => res.status(400).send(error));
  },
};

export default recipeValidation;
