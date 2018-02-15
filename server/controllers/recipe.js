import models from '../models';
import { paginate, validatePagination } from '../helpers/paginate';
import {
  recipeHandler,
  errorHandler,
  handleResponse } from '../helpers/responseHandler';

const Recipe = models.Recipe,
  Favorite = models.Favorite,
  include = [
    'id',
    'views',
    'image',
    'upvote',
    'category',
    'downvote',
    'createdAt',
    'recipeName',
    'ingredients',
    'instructions',
  ];

/**
 * @description controller function that handles creation of new recipes post
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message recipe
 */
const createRecipe = (req, res) => Recipe
  .create({
    recipeName: req.body.recipeName,
    category: req.body.category,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    userId: req.decoded.user.id,
    image: req.upload || '../uploads/spice.jpg'
  }, {
    fields: [
      'recipeName',
      'ingredients',
      'instructions',
      'userId',
      'category',
      'image'
    ]
  })
  .then(recipe => recipeHandler(201, recipe, res))
  .catch(() => errorHandler(500, 'An error occured!', res));

/**
 * @description controller function that handles modification posted recipes
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message recipe
 */
const updateRecipe = (req, res) => Recipe
  .findOne({ where: {
    userId: req.decoded.user.id, id: req.params.recipeId }
  })
  .then(recipe => recipe
    .update({
      recipeName: req.body.recipeName || recipe.recipeName,
      category: req.body.category || recipe.category,
      ingredients: req.body.ingredients || recipe.ingredients,
      instructions: req.body.instructions || recipe.instructions,
      image: req.upload || recipe.image
    })
    .then(() => {
      recipeHandler(200, recipe, res);
    }))
  .catch(() => errorHandler(500, 'An error occured!', res));

/**
 * @description controller function that handles deletion of posted recipes
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message
 */
const deleteRecipe = (req, res) => Recipe
  .findOne({
    where:
      { userId: req.decoded.user.id, id: req.params.recipeId }
  })
  .then(recipe => recipe
    .destroy()
    .then(() => {
      res.status(200).send({
        status: 'success',
        message: 'Recipe successfully deleted'
      });
    }))
  .catch(() => errorHandler(500, 'An error occured!', res));

/**
 * @description controller function that handles getting posted recipes
 * in the application if no search query was specified in url
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message recipe
 */
const getRecipes = (req, res, next) => {
  if (req.query.ingredients ||
      req.query.sort ||
      req.query.category ||
      req.query.name) return next();

  const { page, limit, offset } = validatePagination(req);

  return Recipe
    .findAndCountAll({
      attributes: include,
      limit,
      offset,
      order: [['id', 'DESC']]
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return errorHandler(404, 'No recipe found', res);
      }
      let status;
      let message;
      return handleResponse(
        200, res, paginate, page, limit, status, message, recipes
      );
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description controller function that handles getting allposted recipes
 * posted by a prticular user
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message recipe
 */
const getUserRecipes = (req, res) => {
  const { page, limit, offset } = validatePagination(req);
  return Recipe
    .findAndCountAll({ where: { userId: req.decoded.user.id },
      attributes: include,
      limit,
      offset,
      order: [['id', 'DESC']]
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return errorHandler(404, 'You have no recipe post', res);
      }
      let status;
      let message;
      return handleResponse(
        200, res, paginate, page, limit, status, message, recipes
      );
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description controller function that handles detailed recipe view
 * and also increments the view count of the recipe for every view
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message recipe
 */
const viewRecipe = (req, res) => Recipe
  .findOne({ where: { id: req.params.recipeId }
  })
  .then((recipe) => {
    if (req.decoded.user.id !== recipe.userId) {
      recipe
        .increment('views')
        .then(() => Recipe
          .findOne({ where: { id: req.params.recipeId },
            attributes: include,
          })
          .then(result => res.status(200).send({
            status: 'success',
            message: `Viewing post with id of ${recipe.id}`,
            recipe: result
          })));
    } else {
      Recipe
        .findOne({ where: { id: req.params.recipeId },
          attributes: include,
        })
        .then(result => res.status(200).send({
          status: 'success',
          message: `Viewing post with id of ${recipe.id}`,
          recipe: result
        }));
    }
  })
  .catch(() => errorHandler(500, 'An error occured!', res));

/**
 * @description controller function that handles getting top recipes
 * using the upvote criteria, lists the top five recipes with the
 * highest number of upvote
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message recipe
 */
const getTopRecipes = (req, res, next) => {
  if (!req.query.sort) return next();

  const sort = req.query.sort,
    order = (req.query.order).slice(0, 4);
  return Recipe
    .findAll({
      attributes: include,
      order: [[sort, order]],
      limit: 5,
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return errorHandler(404, 'No recipe found', res);
      }
      return res.status(200).send({
        status: 'success',
        message: 'Top recipes found',
        recipes
      });
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description controller function that handles recipes
 * search by ingredients, makes provision for multiple
 * ingredients query by delimiting query string using
 * ' ' which is used to replace '+'
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message recipe
 */
const searchRecipesByIngredients = (req, res, next) => {
  if (!req.query.ingredients) return next();

  const ingredients = req.query.ingredients.split(' ');
  const { page, limit, offset } = validatePagination(req);

  const query = ingredients.map(keyword => ({
    ingredients: {
      $iLike: `%${keyword}%`
    }
  }));
  return Recipe
    .findAndCountAll({
      where: { $or: query },
      limit,
      offset,
      order: [['id', 'DESC']],
      attributes: include
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return errorHandler(404, 'No recipe matches your search', res);
      }
      let status;
      let message;
      return handleResponse(
        200, res, paginate, page, limit, status, message, recipes
      );
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description controller function that handles recipes
 * search by category
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message recipe
 */
const searchRecipesByCategory = (req, res, next) => {
  if (!req.query.category) return next();
  const category = req.query.category.split(' ');
  const { page, limit, offset } = validatePagination(req);

  const query = category.map(keyword => ({
    category: {
      $iLike: `%${keyword}%`
    }
  }));
  return Recipe
    .findAndCountAll({
      where: { $or: query },
      limit,
      offset,
      order: [['id', 'DESC']],
      attributes: include
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return errorHandler(404, 'No recipe matches your search', res);
      }
      let status;
      let message;
      return handleResponse(
        200, res, paginate, page, limit, status, message, recipes
      );
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description controller function that handles recipes
 * search by name
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 * @returns {object} status message recipe
 */
const searchRecipesByName = (req, res) => {
  const name = req.query.name.split(' ');
  const { page, limit, offset } = validatePagination(req);

  const query = name.map(keyword => ({
    recipeName: {
      $iLike: `%${keyword}%`
    }
  }));
  return Recipe
    .findAndCountAll({
      where: { $or: query },
      limit,
      offset,
      order: [['id', 'DESC']],
      attributes: include
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return errorHandler(404, 'No recipe matches your search', res);
      }
      let status;
      let message;
      return handleResponse(
        200, res, paginate, page, limit, status, message, recipes
      );
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

/**
 * @description controller function that handles recipes
 * search by category in a user favorite list
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
 * @returns {object} status message recipe
 */
const searchUserFavsByCategory = (req, res) => {
  const category = req.query.category.split(' ');
  const { page, limit, offset } = validatePagination(req);

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
      attributes: ['id', 'category']
    })
    .then((recipes) => {
      if (recipes.count === 0) {
        return res.status(404).send({
          message: 'No favorite recipe matches your search'
        });
      }
      let status;
      let message;
      return handleResponse(
        200, res, paginate, page, limit, status, message, recipes
      );
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

export {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  searchRecipesByIngredients,
  getUserRecipes,
  viewRecipe,
  getTopRecipes,
  searchRecipesByCategory,
  searchUserFavsByCategory,
  searchRecipesByName
};
