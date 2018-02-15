import models from '../../models';

import { expect } from '../../utils/testSetup';

const Recipe = models.Recipe;

describe(('Recipe Model'), () => {
  before((done) => {
    models.Recipe.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe(('Create Recipe'), () => {
    it('should fail if no recipe name is provided', (done) => {
      Recipe.create({
        ingredients: 'lettuce, cabbage',
        instructions: 'mix well'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].message).to.equal('recipeName cannot be null');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });
    it('should fail if provided recipe name length is less than 3', (done) => {
      Recipe.create({
        recipeName: 'ca',
        ingredients: 'lettuce, cabbage',
        instructions: 'mix well'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('Validation error');
          expect(error.errors[0].message)
            .to
            .equal('Recipe name must be minimum 3 and maximum 30 characters');
          done();
        });
    });

    it('should fail provided username length is more than 30', (done) => {
      Recipe.create({
        recipeName: 'cahhhhchchchchhhdhdhdhdhhdhdhccbcbccccvv',
        ingredients: 'lettuce, cabbage',
        instructions: 'mix well'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('Validation error');
          expect(error.errors[0].message)
            .to
            .equal('Recipe name must be minimum 3 and maximum 30 characters');
          done();
        });
    });

    it('should fail if no ingredient is provided', (done) => {
      Recipe.create({
        recipeName: 'casserole',
        instructions: 'mix well'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].message)
            .to
            .equal('ingredients cannot be null');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });

    it('should fail if no instruction is provided', (done) => {
      Recipe.create({
        recipeName: 'casserole',
        ingredients: 'lettuce, cabbage',
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].message)
            .to
            .equal('instructions cannot be null');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });

    it('should create recipe if all validation exceptions passes', (done) => {
      Recipe.create({
        recipeName: 'casserole',
        ingredients: 'lettuce, cabbage',
        instructions: 'mix well'
      })
        .then((recipe) => {
          expect(typeof (recipe)).to.equal('object');
          expect(recipe.dataValues.recipeName).to.equal('casserole');
          expect(recipe.dataValues.views).to.equal(0);
          done();
        });
    });
  });

  describe('Update Recipe', () => {
    it('should fail if provided recipe name length is less than 3', (done) => {
      Recipe
        .findById(3)
        .then((recipe) => {
          recipe.update({
            recipeName: 'ca'
          })
            .catch((error) => {
              expect(error.errors[0].type).to.equal('Validation error');
              expect(error.errors[0].message)
                .to
                .equal(
                  'Recipe name must be minimum 3 and maximum 30 characters'
                );
              done();
            });
        });
    });

    it('should fail if provided recipe name length is more than 30', (done) => {
      Recipe
        .findById(3)
        .then((recipe) => {
          recipe.update({
            recipeName: 'cahjddjncnhcnjcjncncncnjcjdjkdkjdjkdjknxn'
          })
            .catch((error) => {
              expect(error.errors[0].type).to.equal('Validation error');
              expect(error.errors[0].message)
                .to
                .equal(
                  'Recipe name must be minimum 3 and maximum 30 characters'
                );
              done();
            });
        });
    });

    it('should update if provided recipeName is valid', (done) => {
      Recipe
        .findById(3)
        .then((recipe) => {
          recipe.update({
            recipeName: 'salad'
          })
            .then(() => {
              expect(typeof (recipe)).to.equal('object');
              expect(recipe.dataValues.recipeName).to.equal('salad');
              done();
            });
        });
    });
  });

  describe('Delete Recipe', () => {
    it('should delete recipe', (done) => {
      Recipe
        .findById(3)
        .then((recipe) => {
          recipe.destroy()
            .then(() => {
              Recipe
                .findById(3)
                .then((recipee) => {
                  expect(recipee).to.equal(null);
                  done();
                });
            });
        });
    });
  });
});
