import db from '../models/index';

const Favorite = db.Favorite;

const addFavorite = (req, res) => Favorite
  .create({
    userId: req.decoded.user.id,
    recipeId: req.params.recipeId,
    category: req.body.category
  })
  .then(() => res.status(201).send({
    status: 'success',
    message: 'Recipe successfully added to favorites'
  }))
  .catch(error => res.status(400).send(error));

const getUserFavorites = (req, res) => {
  const userId = req.decoded.user.id;
  return Favorite
    .findAll({ where: { userId } })
    .then((favorites) => {
      if (!favorites.length) {
        return res.status(204).send({
          message: 'Your favorite recipe list is empty'
        });
      }
      return res.status(200).send(favorites);
    })
    .catch(error => res.status(400).send(error));
};

const addRecipeCategory = (req, res) => Favorite
  .findOne({ where:
        { userId: req.decoded.user.id, recipeId: req.params.recipeId }
  })
  .then(recipe => recipe
    .update({ category: req.body.category || recipe.category })
    .then(() => {
      res.status(200).send({
        status: 'success',
        message: `Recipe added to ${recipe.category}`
      });
    }))
  .catch(error => res.status(400).send(error));

export { addFavorite, getUserFavorites, addRecipeCategory };
