import db from '../models/index';

const Recipe = db.Recipe;

const createRecipe = {
  create(req, res) {
    return Recipe
      .create({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        author: req.decoded.user.id
      })
      .then(() => {
        res.status(201).send({
          success: true,
          message: 'Successfully created new recipe'
        });
      })
      .catch(error => res.status(400).json(error));
  }
};

export default createRecipe;
