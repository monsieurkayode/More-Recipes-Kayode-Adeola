import db from '../models/index';

const Favorite = db.Favorite;

const favoriteController = {
  addFavorite(req, res) {
    return Favorite
      .create({
        userId: req.decoded.user.id,
        recipeId: req.params.recipeId,
        category: req.body.category
      })
      .then((favoritedRecipe) => {
        if (!favoritedRecipe) {
          return res.status(404).send({
            success: false,
            message: 'Recipe not found'
          });
        }
        return res.status(201).send(favoritedRecipe);
      })
      .catch(error => res.status(400).send(error));
  },
  getUserFavorites(req, res) {
    return Favorite
      .findAll({ where: { userId: req.decoded.user.id } })
      .then((favorites) => {
        if (!favorites) {
          return res.status(204).send({
            message: 'Your favorite recipe list is empty'
          });
        }
        return res.status(200).send(favorites);
      })
      .catch(error => res.status(400).send(error));
  },
  addRecipeCategory(req, res) {
    return Favorite
      .findOne({ where:
        { userId: req.decoded.user.id, recipeId: req.params.recipeId }
      })
      .then(recipe => recipe
        .update({ category: req.body.category || recipe.category })
        .then(() => {
          res.status(200).send({
            success: true,
            message: `Recipe added to ${recipe.category}`
          });
        }))
      .catch(error => res.status(400).send(error));
  }
};

export default favoriteController;
