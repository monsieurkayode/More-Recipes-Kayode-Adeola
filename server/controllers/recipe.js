import db from '../models/index';

const Recipe = db.Recipe;

const recipeController = {
  create(req, res) {
    return Recipe
      .create({
        recipeName: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        userId: req.decoded.user.id
      })
      .then((recipe) => {
        res.status(201).send({
          success: true,
          message: 'Successfully created new recipe',
          recipeId: recipe.id,
          recipeName: recipe.recipeName,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions
        });
      })
      .catch(error => res.status(400).json(error));
  },
  update(req, res) {
    return Recipe
      .findOne({ where: {
        userId: req.decoded.user.id, id: req.params.recipeId }
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            message: 'No recipe found'
          });
        }
        return recipe
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => {
            res.status(200).send({
              success: true,
              message: 'Recipe successfully updated',
              recipeId: recipe.id,
              recipeName: recipe.recipeName,
              ingredients: recipe.ingredients,
              instructions: recipe.instructions
            });
          });
      })
      .catch(error => res.status(400).json(error));
  },
  delete(req, res) {
    return Recipe
      .findOne({ where: { userId: req.decoded.user.id, id: req.params.recipeId } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            message: 'No recipe found'
          });
        }
        return recipe
          .destroy()
          .then(() => {
            res.status(200).send({
              success: true,
              message: 'Recipe successfully deleted'
            });
          });
      })
      .catch(error => res.status(400).json(error));
  },
  getRecipes(req, res) {
    return Recipe
      .all({
        attributes:
        [['id', 'recipeId'], 'recipeName', 'ingredients', 'instructions']
      })
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send(error));
  },
  getUserRecipes(req, res) {
    return Recipe
      .findAll({ where: { userId: req.decoded.user.id } })
      .then((recipes) => {
        if (!recipes) {
          return res.status(404).send({
            success: false,
            message: 'No recipe found'
          });
        }
        return res.status(200).send(recipes);
      })
      .catch(error => res.status(400).json(error));
  }
};

export default recipeController;
