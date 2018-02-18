import models from '../../models';

import { expect } from '../../utils/testSetup';

const Favorite = models.Favorite;
const Recipe = models.Recipe;

describe(('Favorite Model'), () => {
  before((done) => {
    models.Favorite.destroy({ where: {} }).then(() => {
      Recipe.create({
        recipeName: 'casserole',
        ingredients: 'lettuce, cabbage',
        instructions: 'mix well'
      });
      done();
    });
  });

  describe(('Create Favorite'), () => {
    it('should fail if no recipe name is provided', (done) => {
      Favorite.create({
        recipeId: 4,
        userId: 3
      })
        .then((favorite) => {
          expect(typeof (favorite)).to.equal('object');
          expect(favorite.dataValues.recipeId).to.equal(4);
          done();
        });
    });
  });

  describe('Update Favorite', () => {
    it('should update category of favorite', (done) => {
      Favorite
        .findById(2)
        .then((favorite) => {
          favorite.update({
            category: 'salad'
          })
            .then(() => {
              expect(typeof (favorite)).to.equal('object');
              expect(favorite.dataValues.category).to.equal('salad');
              done();
            });
        });
    });
  });

  describe('Delete Favorite', () => {
    it('should delete favorite', (done) => {
      Favorite
        .findById(2)
        .then((favorite) => {
          favorite.destroy()
            .then(() => {
              Favorite
                .findById(2)
                .then((favoritee) => {
                  expect(favoritee).to.equal(null);
                  done();
                });
            });
        });
    });
  });
});
