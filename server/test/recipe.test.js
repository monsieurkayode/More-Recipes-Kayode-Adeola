import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../app';
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
        expect(res.body.status).to.equal('success');
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
        expect(res.body.status).to.equal('success');
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
      .send(recipePosts[2])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Successfully created new recipe');
        if (err) return done(err);
        done();
      });
  });
  it('does not accept empty form for recipe name', (done) => {
    server
      .post('/api/v1/recipes')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(recipePosts[3])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message.recipeName).to.equal('Please enter a recipe name');
        if (err) return done(err);
        done();
      });
  });
  it('does not accept empty form for ingredients', (done) => {
    server
      .post('/api/v1/recipes')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(recipePosts[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message.ingredients).to.equal('Ingredients field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('does not accept empty form for instructions', (done) => {
    server
      .post('/api/v1/recipes')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(recipePosts[5])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message.instructions).to.equal('Instructions field cannot be empty');
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
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe successfully updated');
        if (err) return done(err);
        done();
      });
  });
  it('validate if recipe exists in application', (done) => {
    server
      .put('/api/v1/recipes/10')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(editRecipe[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });
});

describe('Search for Recipes', () => {
  it('return No recipe matches your search', (done) => {
    server
      .get('/api/v1/recipes')
      .query({ category: 'Jargons' })
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('No recipe matches your search');
        if (err) return done(err);
        done();
      });
  });
  it('get recipe that matches category', (done) => {
    server
      .get('/api/v1/recipes')
      .query({ category: 'smooth' })
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes[0].recipeName).to.equal('Kiwi Smoothie on the Rocks');
        if (err) return done(err);
        done();
      });
  });
  it('get recipe that matches ingredient', (done) => {
    server
      .get('/api/v1/recipes')
      .query({ ingredients: 'spinach' })
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes[0].recipeName).to.equal('Coleslaw');
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
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe successfully deleted');
        if (err) return done(err);
        done();
      });
  });
});

describe('Keep records of recipe views', () => {
  it('show the number of times a recipe has been viewed', (done) => {
    server
      .get('/api/v1/recipes/2')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipe.views).to.equal(1);
        if (err) return done(err);
        done();
      });
  });
});

describe('View top recipes', () => {
  it('show recipes with highest upvote first', (done) => {
    server
      .get('/api/v1/recipes')
      .query({ sort: 'upvote', order: 'desc' })
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes[0].recipeName).to.equal('Coleslaw');
        if (err) return done(err);
        done();
      });
  });
});

