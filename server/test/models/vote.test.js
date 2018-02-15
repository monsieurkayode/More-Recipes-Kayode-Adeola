import models from '../../models';

import { expect } from '../../utils/testSetup';

const Vote = models.Vote;

describe(('Vote Model'), () => {
  before((done) => {
    models.Vote.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe(('Create Vote'), () => {
    it('should create vote', (done) => {
      Vote.create({
        recipeId: 4,
        userId: 3,
        option: true
      })
        .then((review) => {
          expect(typeof (review)).to.equal('object');
          done();
        });
    });
  });
});
