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
        expect(res.body.message).to.be.equal('Recipe successfully added to favorites');
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
  it('shows recipes with search by category', (done) => {
    server
      .get('/api/v1/recipes')
      .query({ category: 'smoothies' })
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body[0].Recipe.recipeName).to.equal('Coleslaw Salad');
        if (err) return done(err);
        done();
      });
  });
});
