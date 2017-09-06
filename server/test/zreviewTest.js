import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../../app';
import users from '../seeders/userSeeder';
import review from '../seeders/reviewSeeder';


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

describe('Review a recipe', () => {
  it('allows logged in user review a posted recipe', (done) => {
    server
      .post('/api/v1/recipes/2/reviews')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(review[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.comment).to.be.equal('This is an awesome recipe');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user review a posted recipe', (done) => {
    server
      .post('/api/v1/recipes/2/reviews')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(review[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.comment).to.be.equal('It would be nice if you could throw in some ginger');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user review a posted recipe', (done) => {
    server
      .post('/api/v1/recipes/2/reviews')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(review[2])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Review successfully posted');
        expect(res.body.comment).to.be.equal('Pretty please can I have some?');
        if (err) return done(err);
        done();
      });
  });
});

describe('Vote a recipe', () => {
  it('allows logged in user upvote a posted recipe', (done) => {
    server
      .put('/api/v1/recipes/2/upvote')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.be.equal('Your vote has been recorded');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user downvote a posted recipe', (done) => {
    server
      .put('/api/v1/recipes/2/downvote')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.be.equal('Your vote has been recorded');
        if (err) return done(err);
        done();
      });
  });
});
