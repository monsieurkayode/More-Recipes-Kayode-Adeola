import db from '../models/index';

const Recipe = db.Recipe;
const Review = db.Review;
const User = db.User;

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
          attributes: ['userId', 'comment'],
          include: [{
            model: User,
            attributes: ['username', 'createdAt']
          }]
        }],
        attributes:
        [
          'id', 'views', 'upvote', 'downvote',
          'recipeName', 'ingredients', 'instructions'
        ]
      })
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send(error));
  },
  getUserRecipes(req, res) {
    return Recipe
      .findAll({ where: { userId: req.decoded.user.id },
        attributes: [
          'id', 'userId', 'views', 'upvote',
          'downvote', 'recipeName', 'ingredients', 'instructions'
        ],
      })
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
    const sort = req.query.sort,
      order = req.query.order;
    return Recipe
      .findAll({
        attributes:
        [
          'id', 'userId', 'views', 'upvote',
          'downvote', 'recipeName', 'ingredients', 'instructions'
        ],
        order: [[sort, order]],
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
      .catch(error => res.status(400).send(error));
  },
  searchRecipesByIngredients(req, res) {
    const ingredients = req.query.ingredients;
    return Recipe
      .findAll({ where: { ingredients },
        attributes:
        [
          'id', 'userId', 'views', 'upvote',
          'downvote', 'recipeName', 'ingredients', 'instructions'
        ]
      })
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send(error));
  }
};

export default recipeController;
