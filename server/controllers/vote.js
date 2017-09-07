import db from '../models/index';

const Recipe = db.Recipe;
const Vote = db.Vote;

const voteController = {
  upvote(req, res) {
    return Vote
      .findOrCreate({ where: {
        userId: req.decoded.user.id,
        recipeId: req.params.recipeId },
      defaults: { option: true }
      })
      .spread((voter, created) => {
        if (created) {
          return Recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((recipe) => {
              recipe.increment('upvote').then(() => {
                recipe.reload().then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upvote,
                  downvote: recipe.downvote
                }));
              });
            });
        } else if (!created && voter.option === false) {
          voter.update({ option: true });
          return Recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((recipe) => {
              recipe.increment('upvote').then(() => {
                recipe.decrement('downvote').then(() => {
                  recipe.reload();
                }).then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upvote,
                  downvote: recipe.downvote
                }));
              });
            });
        } else if (!created && voter.option === true) {
          voter.destroy();
          return Recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((recipe) => {
              recipe.decrement('upvote').then(() => {
                recipe.reload();
              }).then(() => res.status(200).send({
                status: 'success',
                message: 'Your vote has been removed',
                upvote: recipe.upvote,
                downvote: recipe.downvote
              }));
            });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  downvote(req, res) {
    return Vote
      .findOrCreate({ where: {
        userId: req.decoded.user.id,
        recipeId: req.params.recipeId },
      defaults: { option: false }
      })
      .spread((voter, created) => {
        if (created) {
          return Recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((recipe) => {
              recipe.increment('downvote').then(() => {
                recipe.reload().then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upvote,
                  downvote: recipe.downvote
                }));
              });
            });
        } else if (!created && voter.option === true) {
          voter.update({ option: false });
          return Recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((recipe) => {
              recipe.increment('downvote').then(() => {
                recipe.decrement('upvote').then(() => {
                  recipe.reload();
                }).then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upvote,
                  downvote: recipe.downvote
                }));
              });
            });
        } else if (!created && voter.option === false) {
          voter.destroy();
          return Recipe
            .findOne({ where: { id: req.params.recipeId } })
            .then((recipe) => {
              recipe.decrement('downvote').then(() => {
                recipe.reload();
              }).then(() => res.status(200).send({
                status: 'success',
                message: 'Your vote has been removed',
                upvote: recipe.upvote,
                downvote: recipe.downvote
              }));
            });
        }
      })
      .catch(error => res.status(400).send(error));
  }
};

export default voteController;
