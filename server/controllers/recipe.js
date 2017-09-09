// Import module dependencies
import db from '../models/index';
import { recipeHandler } from '../helpers/responseHandler';

// Assign variables to the database models
const Recipe = db.Recipe,
  Review = db.Review,
  User = db.User,
  Favorite = db.Favorite,
  // This holds the attributes keys for returned model instances
  keys = [
    'id', 'views', 'upvote', 'downvote',
    'recipeName', 'category', 'ingredients', 'instructions'
  ];

/**
 * @description controller function that handles creation of new recipes post
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const create = (req, res) => Recipe
  // Take in input submitted from client side and create
  // a new recipe instance to be persisted to the database
  .create({
    recipeName: req.body.recipeName,
    category: req.body.category,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    userId: req.decoded.user.id
  }, {
    // Make sure that only fields specified below can be accessed
    fields: [
      'recipeName', 'ingredients', 'instructions', 'userId', 'category'
    ]
  })
  // Lets give the recipe created a view of 1 just to be generous
  // and return the created recipe post to user
  .then((recipe) => {
    recipe.increment('views').then(() => {
      recipe.reload()
        .then(() => {
          recipeHandler(201, recipe, res);
        });
    });
  })
  .catch(error => res.status(400).json(error));

/**
 * @description controller function that handles modification posted recipes
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const update = (req, res) => Recipe
  // Query the database for the recipe to be modified belonging to
  // user using verification of identity from token provided
  .findOne({ where: {
    userId: req.decoded.user.id, id: req.params.recipeId }
  })
  .then(recipe => recipe
    // If found modify fields provided or return initial data
    .update({
      recipeName: req.body.recipeName || recipe.recipeName,
      category: req.body.category || recipe.category,
      ingredients: req.body.ingredients || recipe.ingredients,
      instructions: req.body.instructions || recipe.instructions
    })
    .then(() => {
      // Return recipe to user with showing new modifications
      recipeHandler(200, recipe, res);
    }))
  .catch(error => res.status(400).json(error));

/**
 * @description controller function that handles deletion of posted recipes
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const deleteRecipe = (req, res) => Recipe
  // Query the database for the recipe to be modified belonging to
  // user using verification of identity from token provided
  .findOne({
    where:
        { userId: req.decoded.user.id, id: req.params.recipeId }
  })
  .then(recipe => recipe
    // If found remove entry from database table
    .destroy()
    .then(() => {
      // Return a status message to user
      res.status(200).send({
        status: 'success',
        message: 'Recipe successfully deleted'
      });
    }))
  .catch(error => res.status(400).json(error));

/**
 * @description controller function that handles getting posted recipes
 * in the application if no search query was specified in url
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message recipe
 */
const getRecipes = (req, res, next) => {
  // If url path contains any of the query keys call the next function
  if (req.query.ingredients ||
      req.query.sort ||
      req.query.category) return next();

  // Find all recipes and do an eagerload to include the reviews associated
  // with each recipe and also to include the user whomposted the review
  return Recipe
    .all({
      include: [{
        model: Review,
        as: 'reviews',
        attributes: ['comment'],
        include: [{
          model: User,
          attributes: ['username', 'createdAt']
        }]
      }],
      // Return only attributes defined in the global scope
      attributes: keys
    })
    .then(recipes => res.status(200).send(recipes))
    .catch(error => res.status(400).send(error));
};

/**
 * @description controller function that handles getting allposted recipes
 * posted by a prticular user
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const getUserRecipes = (req, res) => Recipe
  // Perform a database query by slecting all recipes with simple foreign key
  // match from id decoded from token provided, also refine the return by
  // specifying the attributes from keys
  .findAll({ where: { userId: req.decoded.user.id },
    attributes: keys
  })
  .then((recipes) => {
    if (recipes.length === 0) {
      // Notify user he/she has no posted recipes to display if none found
      return res.status(200).send({
        message: 'User has not posted any recipe'
      });
    }
    // Return all recipes if found
    return res.status(200).send(recipes);
  })
  .catch(error => res.status(400).json(error));

/**
 * @description controller function that handles detailed recipe view
 * and also increments the view count of the recipe for every view
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const viewRecipe = (req, res) => Recipe
  // Query database for recipe matching id in params
  .findOne({ where: { id: req.params.recipeId } })
  .then((recipe) => {
    // If found, increment the view count and return new data
    recipe.increment('views').then(() => {
      recipe.reload()
        .then(() => res.status(200).send(recipe));
    });
  })
  .catch(error => res.status(400).send(error));

/**
 * @description controller function that handles getting top recipes
 * using the upvote criteria, lists the top five recipes with the
 * highest number of upvote
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message recipe
 */
const getTopRecipes = (req, res, next) => {
  // If query key does not match sort, call next on the next handler
  if (!req.query.sort) return next();

  // Take the query key and slice order string to get DESC
  // which we then use in ordering
  const sort = req.query.sort,
    order = (req.query.order).slice(0, 4);
  return Recipe
    .findAll({
      attributes: keys,
      order: [[sort, order]],
      limit: 5
    })
    .then(recipes => res.status(200).send(recipes))
    .catch(error => res.status(400).json(error));
};

/**
 * @description controller function that handles recipes
 * search by ingredients
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message recipe
 */
const searchRecipesByIngredients = (req, res, next) => {
  // If query key does not match ingredients, call next on the next handler
  if (!req.query.ingredients) return next();

  // Make provision for multiple ingredients query by delimiting
  // query string using ' ' which is used to replace '+'
  const ingredients = req.query.ingredients.split(' ');

  // If multiple ingredients, map each keyword to an object and use
  // the $or and $iLike for case insensitivity sequelize
  // complex query to perform search
  const query = ingredients.map(keyword => ({
    ingredients: {
      $iLike: `%${keyword}%`
    }
  }));
  return Recipe
    .all({
      where: { $or: query },
      limit: 10,
      attributes: keys
    })
    .then((recipes) => {
      if (!recipes.length) {
        return res.status(200).send({
          message: 'No recipe matches your search'
        });
      }
      return res.status(200).send(recipes);
    })
    .catch(error => res.status(400).send(error));
};

/**
 * @description controller function that handles recipes
 * search by category
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const searchRecipesByCategory = (req, res) => {
  // Make provision for multiple ingredients query by delimiting
  // query string using ' ' which is used to replace '+'
  const category = req.query.category.split(' ');

  // If multiple category, map each keyword to an object and use
  // the $or sequelize complex query to perform search
  const query = category.map(keyword => ({
    category: {
      $iLike: `%${keyword}%`
    }
  }));
  return Recipe
    .all({
      where: { $or: query },
      limit: 10,
      attributes: keys
    })
    .then((recipes) => {
      if (!recipes.length) {
        return res.status(200).send({
          message: 'No recipe matches your search'
        });
      }
      return res.status(200).send(recipes);
    })
    .catch(error => res.status(400).send(error));
};

/**
 * @description controller function that handles recipes
 * search by category in a user favorite list
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const searchUserFavsByCategory = (req, res) => {
  // Make provision for multiple category query by delimiting
  // query string using ' ' which is used to replace '+'
  const category = req.query.category.split(' ');

  // If multiple category, map each keyword to an object and use
  // the $or sequelize complex query to perform search
  const query = category.map(keyword => ({
    category: {
      $iLike: `%${keyword}%`
    }
  }));
  return Favorite
    .all({
      where: { $or: query },
      include: {
        model: Recipe,
        attributes: keys
      },
      attributes: ['category']
    })
    .then((recipes) => {
      if (!recipes) {
        return res.status(200).send({
          message: 'No favorite recipe matches your search'
        });
      }
      res.status(200).send(recipes);
    })
    .catch(error => res.status(400).send(error));
};

export { create, update, deleteRecipe, getRecipes,
  searchRecipesByIngredients, getUserRecipes, viewRecipe,
  getTopRecipes, searchRecipesByCategory, searchUserFavsByCategory };
