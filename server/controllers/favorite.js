// Import module dependency
import db from '../models/index';

// Assign a variable to the database table we will be perssisting data
const Favorite = db.Favorite;

/**
 * @description controller function for adding favorite recipes
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const addFavorite = (req, res) => Favorite
  // Take in input submitted from client side and create
  // a favorite recipe instance to be persisted to the database
  .create({
    userId: req.decoded.user.id,
    recipeId: req.params.recipeId,
    category: req.body.category
  })
  // Return a status message notifying the user
  .then(() => res.status(201).send({
    status: 'success',
    message: 'Recipe successfully added to favorites'
  }))
  // Catch any error that may occur during transaction
  .catch(error => res.status(400).send(error));

/**
 * @description controller function to get a user favorite recipes
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const getUserFavorites = (req, res) => {
  // Use token generated to validate user identity
  const userId = req.decoded.user.id;
  return Favorite
  // Query the database to fetch all favorites unique to user's id
  // If none found tell user his favorite recipe list is empty
  // Otherwise return all user's favorite recipe
    .findAll({ where: { userId } })
    .then((favorites) => {
      if (!favorites.length) {
        return res.status(200).send({
          message: 'Your favorite recipe list is empty'
        });
      }
      return res.status(200).send(favorites);
    })
  // Catch error if any occurs
    .catch(error => res.status(400).send(error));
};

/**
 * @description controller function for categorizing recipes
 * that have been added to a user's favorite recipe list
 * Note that this category is distinct from the global recipes category
 * in the application that specified by the owner
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message
 */
const addRecipeCategory = (req, res) => Favorite
  // Query the database for the recipe to be modified
  .findOne({ where:
        { userId: req.decoded.user.id, recipeId: req.params.recipeId }
  })
  .then((recipe) => {
    if (req.body.category === 'undefined') {
      return res.status(200).send({
        status: 'success',
        message: `Recipe added to ${recipe.category}`
      });
    }
    recipe
    // Modify the category and persist modified data to the database
      .update({ category: req.body.category || recipe.category })
      .then(() => {
        res.status(200).send({
          status: 'success',
          message: `Recipe added to ${recipe.category}`
        });
      });
  })
  .catch(error => res.status(400).send(error));

export { addFavorite, getUserFavorites, addRecipeCategory };
