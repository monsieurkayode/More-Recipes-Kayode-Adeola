import { expect, assert } from '../../utils/testSetup';
import recipeSeeder from '../../seeders/recipeSeeder';
import {
  errorHandler,
  recipeHandler,
} from '../../helpers/responseHandler';


const res = {
  status: function status(code) {
    this.statusCode = code;
    return this;
  },
  json: function json(obj) {
    this.body = obj;
    return this;
  }
};

const { coleSlawSaladRecipe } = recipeSeeder.validRecipes;
coleSlawSaladRecipe.id = 1;
coleSlawSaladRecipe.views = 0;
coleSlawSaladRecipe.upvote = 1;
coleSlawSaladRecipe.downvote = 0;
coleSlawSaladRecipe.image = 'imageUrl';


describe('Response handler helper functions', () => {
  describe('errorHandler', () => {
    describe('takes a status code, message and server response as arguments',
      () => {
        it('and returns a response object with error message', () => {
          assert.isObject(errorHandler(406, 'Error message', res));
        });
        it('and returns status code', () => {
          expect(errorHandler(404, 'Error message', res).statusCode)
            .to
            .equal(404);
        });
        it('and returns response body', () => {
          expect(errorHandler(401, 'Error message', res).body)
            .to
            .deep
            .equal({ status: 'fail', message: 'Error message' });
        });
      });
  });

  describe('recipeHandler', () => {
    describe('takes a status code, recipe and server response as arguments',
      () => {
        it('and returns a recipe details response object ', () => {
          assert.isObject(recipeHandler(201, coleSlawSaladRecipe, res));
        });
        it('and returns status code', () => {
          expect(recipeHandler(201, coleSlawSaladRecipe, res).statusCode)
            .to
            .equal(201);
        });
        it('and returns response body with recipe details', () => {
          expect(recipeHandler(201, coleSlawSaladRecipe, res).body)
            .to
            .deep
            .equal({
              ...coleSlawSaladRecipe,
              status: 'success',
              message: 'Successfully created new recipe'
            });
        });
      });
  });
});
