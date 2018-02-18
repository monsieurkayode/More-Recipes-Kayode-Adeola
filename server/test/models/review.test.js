import models from '../../models';

import { expect } from '../../utils/testSetup';

const Review = models.Review;

describe(('Review Model'), () => {
  before((done) => {
    models.Review.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe(('Create Review'), () => {
    it('should create review', (done) => {
      Review.create({
        recipeId: 4,
        userId: 3,
        comment: 'Awesome',
      })
        .then((review) => {
          expect(typeof (review)).to.equal('object');
          expect(review.dataValues.comment).to.equal('Awesome');
          done();
        });
    });
  });

  describe('Update Review', () => {
    it('should update review comment', (done) => {
      Review
        .findById(2)
        .then((review) => {
          review.update({
            comment: 'great'
          })
            .then(() => {
              expect(typeof (favorite)).to.equal('object');
              expect(review.dataValues.category).to.equal('great');
              done();
            });
        });
    });
  });

  describe('Delete Review', () => {
    it('should delete review', (done) => {
      Review
        .findById(2)
        .then((review) => {
          review.destroy()
            .then(() => {
              Review
                .findById(2)
                .then((reveiw) => {
                  expect(reveiw).to.equal(null);
                  done();
                });
            });
        });
    });
  });
});
