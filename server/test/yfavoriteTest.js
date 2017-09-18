import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../../app';
import users from '../seeders/userSeeder';
import favorite from '../seeders/favoriteSeeder';


const server = supertest.agent(app),
  expect = require('chai').expect,
  validUsersLogin = users.validUsersLogin,
  userData = [];

describe('User Login', () => {
  it('allows a registered user to signin', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validUsersLogin[0])
      .end((err, res) => {
        userData[0] = res.body.Token;
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Token successfully generated');
        if (err) return done(err);
        done();
      });
  });
  it('allows a registered user to signin', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validUsersLogin[1])
      .end((err, res) => {
        userData[1] = res.body.Token;
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Token successfully generated');
        if (err) return done(err);
        done();
      });
  });
});

describe('Favorite a recipe', () => {
  it('allows logged in user add recipe to favorite and category', (done) => {
    server
      .post('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(favorite[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.be.equal('Recipe successfully added to favorites');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user delete recipe he/she has favorited', (done) => {
    server
      .delete('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(favorite[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.be.equal('Recipe successfully removed from favorites');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user add recipe to favorite and category', (done) => {
    server
      .post('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(favorite[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.be.equal('Recipe successfully added to favorites');
        if (err) return done(err);
        done();
      });
  });
  it('does not allow user add same favorite more than once', (done) => {
    server
      .post('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(favorite[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.be.equal('Recipe has already been favorited');
        if (err) return done(err);
        done();
      });
  });
  it('does not allow user favorite non-existing recipe', (done) => {
    server
      .post('/api/v1/users/1/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(favorite[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.be.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });
  it('does not allow user edit category of valid recipe not favorited', (done) => {
    server
      .put('/api/v1/users/3/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(favorite[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.be.equal('Recipe has not been added to favorite');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user edit favorite recipe category', (done) => {
    server
      .put('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(favorite[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe added to Smoothies');
        if (err) return done(err);
        done();
      });
  });
  it('returns existing favorite category if form is empty', (done) => {
    server
      .put('/api/v1/users/2/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe added to Smoothies');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user view his/her favorite recipes', (done) => {
    server
      .get('/api/v1/users/recipes/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        if (err) return done(err);
        done();
      });
  });
  it('return Your favorite recipe list is empty', (done) => {
    server
      .get('/api/v1/users/recipes/favorites')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Your favorite recipe list is empty');
        if (err) return done(err);
        done();
      });
  });
});
describe('Search recipes', () => {
  it('shows recipes with search by ingredients', (done) => {
    server
      .get('/api/v1/recipes')
      .query({ ingredients: 'cabbage' })
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body[0].recipeName).to.equal('Coleslaw Salad');
        if (err) return done(err);
        done();
      });
  });
  it('shows no recipes matches search if not found', (done) => {
    server
      .get('/api/v1/recipes')
      .query({ category: 'smoothies' })
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('No recipe matches your search');
        if (err) return done(err);
        done();
      });
  });
});
