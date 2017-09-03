import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../../app';
import users from '../seeders/userSeeder';
import recipes from '../seeders/recipeSeeder';


const server = supertest.agent(app),
  expect = require('chai').expect,
  validUsersLogin = users.validUsersLogin,
  recipePosts = recipes.recipePosts,
  editRecipe = recipePosts.every,
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
        expect(res.body.success).to.equal(true);
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
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Token successfully generated');
        if (err) return done(err);
        done();
      });
  });
});

describe('Create recipe post', () => {
  it('allows a registered and logged in user post a recipe', (done) => {
    server
      .post('/api/v1/recipes')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(recipePosts[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Successfully created new recipe');
        if (err) return done(err);
        done();
      });
  });
  it('allows a registered and logged in user post a recipe', (done) => {
    server
      .post('/api/v1/recipes')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(recipePosts[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Successfully created new recipe');
        if (err) return done(err);
        done();
      });
  });
});

describe('Modify recipe post', () => {
  it('allows a logged in user modify his or her posted recipe', (done) => {
    server
      .put('/api/v1/recipes/1')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(editRecipe[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Recipe successfully updated');
        if (err) return done(err);
        done();
      });
  });
});

describe('Delete recipe post', () => {
  it('allows a logged in user delete his or her posted recipe', (done) => {
    server
      .delete('/api/v1/recipes/1')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Recipe successfully deleted');
        if (err) return done(err);
        done();
      });
  });
});
