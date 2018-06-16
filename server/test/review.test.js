import models from '../models';
import userSeeder from '../seeders/userSeeder';
import reviewSeeder from '../seeders/reviewSeeder';

import { signin, server, expect } from '../utils/testSetup';

const authenticationToken = {};

describe('Review Endpoint', () => {
  /**
 *
 * @description Hook for cleaning up the test database
 * before any test block have been run
 *
 * @return {undefined}
 */
  before((done) => {
    models.Review.destroy({ where: {} })
      .then(() => {
        const { validSignupDetails1, validSignupDetails2 } = userSeeder;
        signin(validSignupDetails1, done, (token) => {
          authenticationToken.authUser1 = token;
          signin(validSignupDetails2, done, (token2) => {
            authenticationToken.authUser2 = token2;
            done();
          });
        });
      })
      .catch((error) => {
        done(error);
      });
  });

  describe('Post review', () => {
    it('should post review for a recipe and respond with success message ' +
    'and status 201 if user is authenticated',
    (done) => {
      const { review } = reviewSeeder;
      server
        .post('/api/v1/recipes/2/reviews')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(review)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.review.comment)
            .to
            .equal('This is an awesome recipe');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if an empty review ' +
    'form is submitted',
    (done) => {
      server
        .post('/api/v1/recipes/2/reviews')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message)
            .to
            .equal('Comment cannot be empty');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Update review', () => {
    it('should update review posted by an authenticated user and respond ' +
    'with a success message and status 200',
    (done) => {
      const { updateReview } = reviewSeeder;
      server
        .patch('/api/v1/recipes/2/reviews/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(updateReview)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Comment updated successfully');
          expect(res.body.review.comment)
            .to
            .equal('This is not an awesome recipe');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 404 when an authenticated ' +
    'user attempts to update a review that does not exist',
    (done) => {
      const { updateReview } = reviewSeeder;
      server
        .patch('/api/v1/recipes/2/reviews/4')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(updateReview)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Review not found');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Fetch reviews', () => {
    it('should fetch reviews posted for a recipe and respond with a success ' +
    'message and status 200',
    (done) => {
      server
        .get('/api/v1/recipes/2/reviews')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Showing 1 of 1 comments');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Delete review', () => {
    it('should delete review posted by an authenticated user and respond ' +
    'with a success message and status 200',
    (done) => {
      server
        .delete('/api/v1/recipes/2/reviews/1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Your comment has been deleted');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Vote Endpoint', () => {
    describe('Upvote recipe', () => {
      it('should increment recipe upvote count by one and respond with ' +
      'success mesage and status 200 if user is authenticated',
      (done) => {
        server
          .put('/api/v1/recipes/2/upvote')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser1)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.upvote).to.equal(1);
            expect(res.body.downvote).to.equal(0);
            expect(res.body.message).to.be.equal('Your vote has been recorded');
            if (err) return done(err);
            done();
          });
      });

      it('should decrement recipe upvote count by one and respond with ' +
      'success mesage and status 200 if user has already upvoted recipe',
      (done) => {
        server
          .put('/api/v1/recipes/2/upvote')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser1)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.upvote).to.equal(0);
            expect(res.body.downvote).to.equal(0);
            expect(res.body.message).to.be.equal('Your vote has been removed');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('Downvote recipe', () => {
      it('should increment recipe downvote count by one and respond with ' +
        'success mesage and status 200 if user is authenticated',
      (done) => {
        server
          .put('/api/v1/recipes/2/downvote')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser1)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.upvote).to.equal(0);
            expect(res.body.downvote).to.equal(1);
            expect(res.body.message).to.be.equal('Your vote has been recorded');
            if (err) return done(err);
            done();
          });
      });

      it('should decrement recipe downvote count by one and respond with ' +
        'success mesage and status 200 if user has already downvoted recipe',
      (done) => {
        server
          .put('/api/v1/recipes/2/downvote')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser1)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.upvote).to.equal(0);
            expect(res.body.downvote).to.equal(0);
            expect(res.body.message).to.be.equal('Your vote has been removed');
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
