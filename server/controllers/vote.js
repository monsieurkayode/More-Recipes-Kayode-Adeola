import db from '../models/index';

const Recipe = db.Recipe;

const voteController = {
  upvote(req, res) {
    return Recipe
      .findOne({ where: { id: req.params.recipeId } })
      .then((recipe) => {
        recipe.increment('upvote').then(() => {
          recipe.reload().then(() => res.status(200).send({
            message: `${recipe.recipeName} has ${recipe.upvote} upvote`
          }));
        });
      })
      .catch(error => res.status(400).json(error));
  },
  downvote(req, res) {
    return Recipe
      .findOne({ where: { id: req.params.recipeId } })
      .then((recipe) => {
        recipe.decrement('downvote').then(() => {
          recipe.reload().then(() => res.status(200).send({
            message: `${recipe.recipeName} has ${recipe.downvote} downvote`
          }));
        });
      })
      .catch(error => res.status(400).json(error));
  },
};

export default voteController;
