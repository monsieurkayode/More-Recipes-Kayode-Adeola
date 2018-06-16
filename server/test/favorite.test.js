import models from '../models';
import userSeeder from '../seeders/userSeeder';
import favoriteSeeder from '../seeders/favoriteSeeder';

import { signin, server, expect } from '../utils/testSetup';

const authenticationToken = {};

describe('Favorite Recipe Endpoint', () => {
/**
 *
 * @description Hook for cleaning up the test database
 * before any test block have been run
 *
 * @return {undefined}
 */
  before((done) => {
    models.Favorite.destroy({ where: {} })
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

  it('should add recipe to authenticated user favorite list and respond with ' +
  'a success message and status code 201',
  (done) => {
    server
      .post('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', authenticationToken.authUser1)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to
          .equal('Recipe successfully added to favorites');
        if (err) return done(err);
        done();
      });
  });

  it('should update the category of recipe favorited by authenticated user ' +
  'and respond with a success message and status code 200',
  (done) => {
    const { smoothies } = favoriteSeeder;
    server
      .patch('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', authenticationToken.authUser1)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(smoothies)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to
          .equal('Recipe added to Smoothies');
        if (err) return done(err);
        done();
      });
  });

  it('should throw error message with status 409 if an authenticated ' +
  'user attempts to add an already favorited recipe by him or her',
  (done) => {
    server
      .post('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', authenticationToken.authUser1)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message)
          .to
          .equal('Recipe has already been favorited');
        if (err) return done(err);
        done();
      });
  });

  it('should throw error message with status 404 if an authenticated user ' +
  'attempts to add a recipe that does not exist as a favorite', (done) => {
    server
      .post('/api/v1/users/5/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', authenticationToken.authUser1)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.be.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });

  it('should thhrow error message with status 404 if an authenticated user ' +
  'attempts to update the category of a recipe not on his or her favorite ' +
  'list',
  (done) => {
    const { fruitSmoothie } = favoriteSeeder;
    server
      .patch('/api/v1/users/3/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', authenticationToken.authUser1)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(fruitSmoothie)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message)
          .to
          .equal('Recipe has not been added to favorite');
        if (err) return done(err);
        done();
      });
  });

  it('should fetch maximum of 8 recipes added as favorites by authenticated ' +
  'user',
  (done) => {
    server
      .get('/api/v1/users/recipes/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', authenticationToken.authUser1)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Showing 1 of 1 recipes found');
        if (err) return done(err);
        done();
      });
  });

  it('should throw error message with status 404 if a user favorite ' +
  'recipe list is empty',
  (done) => {
    server
      .get('/api/v1/users/recipes/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', authenticationToken.authUser2)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Your favorite recipe list is empty');
        if (err) return done(err);
        done();
      });
  });
  describe('Search favorite recipes', () => {
    it('should throw error message with status 404 if no favorited recipe ' +
    'matches search term',
    (done) => {
      server
        .get('/api/v1/recipes')
        .query({ category: 'smoothies' })
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('No recipe matches your search');
          if (err) return done(err);
          done();
        });
    });

    describe('By ingredients', () => {
      it('should fetch recipes on user favorite list that contains ' +
      'ingredients in search term',
      (done) => {
        server
          .get('/api/v1/recipes')
          .query({ ingredients: 'cabbage' })
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser1)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipes[0].recipeName).to.equal('Coleslaw Salad');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('By category', () => {
      it('should fetch recipes on user favorite list that matches ' +
      'category in search term',
      (done) => {
        server
          .get('/api/v1/recipes')
          .query({ category: 'salads' })
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authenticationToken.authUser1)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipes[0].recipeName).to.equal('Coleslaw Salad');
            if (err) return done(err);
            done();
          });
      });
    });
  });
  it('should remove recipe added as favorite from user favorite list and ' +
    'respond with a success message and status code 200',
  (done) => {
    server
      .delete('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', authenticationToken.authUser1)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to
          .equal('Recipe successfully removed from favorites');
        if (err) return done(err);
        done();
      });
  });
});
