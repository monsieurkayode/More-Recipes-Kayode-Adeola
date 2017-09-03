import db from '../models/index';

const Recipe = db.Recipe;
const Review = db.Review;

const recipeController = {
  create(req, res) {
    return Recipe
      .create({
        recipeName: req.body.recipeName,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        userId: req.decoded.user.id
      }, {
        fields: ['recipeName', 'ingredients', 'instructions', 'userId']
      })
      .then((recipe) => {
        recipe.increment('views');
        recipe.reload()
          .then(() => {
            res.status(201).send({
              success: true,
              message: 'Successfully created new recipe',
              recipeId: recipe.id,
              recipeName: recipe.recipeName,
              ingredients: recipe.ingredients,
              instructions: recipe.instructions,
              views: recipe.views,
              upvote: recipe.upvote,
              downvote: recipe.downvote
            });
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
      .findOne({ where:
        { userId: req.decoded.user.id, id: req.params.recipeId }
      })
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
        include: [{
          model: Review,
          as: 'reviews',
          attributes: ['userId', 'comment']
        }],
        attributes:
        [['id', 'recipeId'], 'recipeName', 'ingredients', 'instructions', 'views', 'upvote', 'downvote']
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
  },
  getTopRecipes(req, res) {
    return Recipe
      .all({
        attributes: ['id', 'userId', 'recipeName', 'ingredients', 'instructions', 'views', 'upvote', 'downvote'],
        order: [['upvote', 'DESC']],
        limit: 5
      })
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).json(error));
  },
  viewRecipe(req, res) {
    return Recipe
      .findOne({ where: { id: req.params.recipeId } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            message: 'No recipe found'
          });
        }
        recipe.increment('views');
        recipe.reload()
          .then(() => res.status(200).send({
            recipe
          }));
      })
      .catch(error => res.status(400).json(error));
  }
};

export default recipeController;
