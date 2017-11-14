// Import module dependencies
import db from '../models/index';
import { paginate, validatePaginate } from '../helpers/paginate';
import { recipeHandler, responseHandler } from '../helpers/responseHandler';

// Assign variables to the database models
const Recipe = db.Recipe,
  Review = db.Review,
  User = db.User,
  Favorite = db.Favorite,
  // This holds the attributes keys for returned model instances
  include = [
    'id', 'views', 'upvote', 'downvote',
    'recipeName', 'category', 'ingredients', 'instructions', 'image'
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
    userId: req.decoded.user.id,
    image: req.body.image
  }, {
    // Make sure that only fields specified below can be accessed
    fields: [
      'recipeName', 'ingredients', 'instructions', 'userId', 'category', 'image'
    ]
  })
  // and return the created recipe post to user
  .then(recipe => recipeHandler(201, recipe, res))
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
    // Modify fields provided or retain data from db
    .update({
      recipeName: req.body.recipeName || recipe.recipeName,
      category: req.body.category || recipe.category,
      ingredients: req.body.ingredients || recipe.ingredients,
      instructions: req.body.instructions || recipe.instructions,
      image: req.body.image || recipe.image
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

  const { page, limit, offset } = validatePaginate(req);

  return Recipe
    .findAndCountAll({
      include: responseHandler(Review, User, Favorite),
      attributes: include,
      limit,
      offset,
      order: [['id', 'DESC']]
    })
    .then(result =>
      res.status(200)
        .json(paginate(page, limit, result)))
    .catch(error => res.status(400).send(error));
};

/**
 * @description controller function that handles getting allposted recipes
 * posted by a prticular user
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const getUserRecipes = (req, res) => {
  const { page, limit, offset } = validatePaginate(req);
  return Recipe
    .findAndCountAll({ where: { userId: req.decoded.user.id },
      include: responseHandler(Review, User, Favorite),
      attributes: include,
      limit,
      offset,
      order: [['id', 'DESC']]
    })
    .then((recipes) => {
      if (recipes.count === 0) {
      // Notify user he/she has no posted recipes to display if none found
        return res.status(200).send({
          message: 'User has not posted any recipe'
        });
      }
      return res.status(200).send(paginate(page, limit, recipes));
    })
    .catch(error => res.status(400).json(error));
};

/**
 * @description controller function that handles detailed recipe view
 * and also increments the view count of the recipe for every view
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message recipe
 */
const viewRecipe = (req, res) => Recipe
  // Query database for recipe matching id in params
  .findOne({ where: { id: req.params.recipeId }
  })
  .then((recipe) => {
    // If found, increment the view count and return new data
    recipe.increment('views').then(() => Recipe
      .findOne({ where: { id: req.params.recipeId },
        include: responseHandler(Review, User, Favorite),
        attributes: include,
      }, responseHandler(Review, User, Favorite))
      .then(result => res.status(200).send(result)));
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
      attributes: include,
      order: [[sort, order]],
      limit: 5,
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
  const { page, limit, offset } = validatePaginate(req);

  // If multiple ingredients, map each keyword to an object and use
  // the $or and $iLike for case insensitivity sequelize
  // complex query to perform search
  const query = ingredients.map(keyword => ({
    ingredients: {
      $iLike: `%${keyword}%`
    }
  }));
  return Recipe
    .findAndCountAll({
      where: { $or: query },
      include: responseHandler(Review, User, Favorite),
      limit,
      offset,
      order: [['id', 'DESC']],
      attributes: include
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return res.status(200).send({
          message: 'No recipe matches your search'
        });
      }
      return res.status(200).json(paginate(page, limit, recipes));
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
  const { page, limit, offset } = validatePaginate(req);

  // If multiple category, map each keyword to an object and use
  // the $or sequelize complex query to perform search
  const query = category.map(keyword => ({
    category: {
      $iLike: `%${keyword}%`
    }
  }));
  return Recipe
    .findAndCountAll({
      where: { $or: query },
      include: responseHandler(Review, User, Favorite),
      limit,
      offset,
      order: [['id', 'DESC']],
      attributes: include
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return res.status(200).send({
          message: 'No recipe matches your search'
        });
      }
      return res.status(200).send(paginate(page, limit, recipes));
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
  const { page, limit, offset } = validatePaginate(req);

  // If multiple category, map each keyword to an object and use
  // the $or sequelize complex query to perform search
  const query = category.map(keyword => ({
    category: {
      $iLike: `%${keyword}%`
    }
  }));
  return Favorite
    .findAndCountAll({
      where: { $or: query },
      include: [{
        model: Recipe,
        attributes: include
      }],
      limit,
      offset,
      order: [['id', 'DESC']],
      attributes: ['id']
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return res.status(200).send({
          message: 'No favorite recipe matches your search'
        });
      }
      res.status(200).json(paginate(page, limit, recipes));
    })
    .catch(error => res.status(400).send(error));
};

export { create, update, deleteRecipe, getRecipes,
  searchRecipesByIngredients, getUserRecipes, viewRecipe,
  getTopRecipes, searchRecipesByCategory, searchUserFavsByCategory };
