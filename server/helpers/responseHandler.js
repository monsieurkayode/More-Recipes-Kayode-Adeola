/**
 * @description Helper function for handling error response
 *
 * @param {number} code
 * @param {object} err
 * @param {object} res
 *
 * @returns {object} status message
 */
const errorHandler = (code, err, res) => {
  switch (code) {
    case 400:
      return res.status(400).json({
        status: 'fail',
        message: err
      });
    case 401:
      return res.status(401).json({
        status: 'fail',
        message: err
      });
    case 404:
      return res.status(404).json({
        status: 'fail',
        message: err
      });
    case 403:
      return res.status(403).json({
        status: 'fail',
        message: err
      });
    case 406:
      return res.status(406).json({
        status: 'fail',
        message: err
      });
    case 409:
      return res.status(409).json({
        status: 'fail',
        message: err
      });
    case 422:
      return res.status(422).json({
        status: 'fail',
        message: err
      });
    default:
      return res.status(500).json({
        status: 'fail',
        message: err
      });
  }
};

/**
 * @description Helper function for handling recipe response
 *
 * @param {number} statusCode
 * @param {object} recipe
 * @param {object} res
 *
 * @returns {object} status, message, id, views, upvote, downvote,
 * recipeName, category, ingredients, instructions, image
 */
const recipeHandler = (statusCode, recipe, res) => {
  switch (statusCode) {
    case 201:
      return res.status(201).json({
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
        image: recipe.image
      });
    default:
      return res.status(200).json({
        status: 'success',
        message: 'Recipe successfully updated',
        id: recipe.id,
        views: recipe.views,
        upvote: recipe.upvote,
        downvote: recipe.downvote,
        recipeName: recipe.recipeName,
        category: recipe.category,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        image: recipe.image
      });
  }
};

/**
 * @description  Helper function for handling get request
 * operations for recipes data
 *
 * @param {integer} statusCode
 * @param {object} res
 * @param {function} func
 * @param {integer} page
 * @param {integer} limit
 * @param {string} status
 * @param {string} message
 * @param {object} response
 *
 * @returns {object} response body
 */
const handleResponse = (
  statusCode, res, func, page, limit, status, message, response) => {
  const { rows: { length }, count } = response;
  status = 'success';
  message = `Showing ${length} of ${count} recipes found`;
  return res.status(statusCode)
    .json(
      func(page, limit, status, message, response)
    );
};

export { errorHandler, recipeHandler, handleResponse };

