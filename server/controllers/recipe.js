import db from '../models/index';
import search from '../helpers/search';

const searchByIngredients = search.searchByIngredients;
const searchByCategory = search.searchByCategory;

const Recipe = db.Recipe,
  Review = db.Review,
  User = db.User,
  Favorite = db.Favorite,
  keys = [
    'id', 'views', 'upvote', 'downvote',
    'recipeName', 'ingredients', 'instructions'
  ];

const recipeController = {
  create(req, res) {
    return Recipe
      .create({
        recipeName: req.body.recipeName,
        category: req.body.category,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        userId: req.decoded.user.id
      }, {
        fields: [
          'recipeName', 'ingredients', 'instructions', 'userId', 'category'
        ]
      })
      .then((recipe) => {
        recipe.increment('views').then(() => {
          recipe.reload()
            .then(() => {
              res.status(201).send({
                status: 'success',
                message: 'Successfully created new recipe',
                id: recipe.id,
                views: recipe.views,
                upvote: recipe.upvote,
                downvote: recipe.downvote,
                recipeName: recipe.recipeName,
                category: recipe.category,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
              });
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
            status: 'fail',
            message: 'No recipe found'
          });
        }
        return recipe
          .update({
            recipeName: recipe.recipeName || req.body.recipeName,
            category: recipe.category || req.body.category,
            ingredients: recipe.ingredients || req.body.ingredients,
            instructions: recipe.instructions || req.body.instructions
          })
          .then(() => {
            res.status(200).send({
              status: 'success',
              message: 'Recipe successfully updated',
              id: recipe.id,
              views: recipe.views,
              upvote: recipe.upvote,
              downvote: recipe.downvote,
              recipeName: recipe.recipeName,
              category: recipe.category,
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
            status: 'fail',
            message: 'No recipe found'
          });
        }
        return recipe
          .destroy()
          .then(() => {
            res.status(200).send({
              status: 'success',
              message: 'Recipe successfully deleted'
            });
          });
      })
      .catch(error => res.status(400).json(error));
  },
  getRecipes(req, res, next) {
    if (req.query.ingredients ||
      req.query.sort ||
      req.query.category) return next();
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
        attributes: keys
      })
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send(error));
  },
  getUserRecipes(req, res) {
    return Recipe
      .findAll({ where: { userId: req.decoded.user.id },
        attributes: keys
      })
      .then((recipes) => {
        if (!recipes) {
          return res.status(404).send({
            status: 'fail',
            message: 'No recipe found'
          });
        }
        return res.status(200).send(recipes);
      })
      .catch(error => res.status(400).json(error));
  },
  getTopRecipes(req, res, next) {
    if (req.query.ingredients || req.query.category) return next();
    const sort = req.query.sort,
      order = req.query.order;
    return Recipe
      .findAll({
        attributes: keys,
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
            status: 'fail',
            message: 'No recipe found'
          });
        }
        recipe.increment('views').then(() => {
          recipe.reload()
            .then(() => res.status(200).send(recipe));
        });
      })
      .catch(error => res.status(400).send(error));
  },
  searchRecipesByIngredients(req, res, next) {
    if (req.query.category) return next();
    const ingredients = req.query.ingredients;
    return Recipe
      .all({
        attributes: keys
      })
      .then((recipes) => {
        const result = searchByIngredients(ingredients, recipes);
        res.status(200).send(result);
      })
      .catch(error => res.status(400).send(error));
  },
  searchRecipesByCategory(req, res) {
    const category = req.query.category;
    return Favorite
      .all({
        include: [{
          model: Recipe,
          attributes: keys
        }],
        attributes:
        [
          'category'
        ]
      })
      .then((recipes) => {
        const result = searchByCategory(category, recipes);
        res.status(200).send(result);
      })
      .catch(error => res.status(400).send(error));
  }
};

export default recipeController;
