import supertest from 'supertest';

import app from '../app';

export { expect, assert } from 'chai';
export const server = supertest.agent(app);

export const signup = (signupDetails, done, callback) => {
  server
    .post('/api/v1/users/signup')
    .set('Connection', 'keep alive')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(signupDetails)
    .end((err, res) => {
      if (err) return done(err);
      if (typeof callback === 'function') {
        const { token } = res.body;
        callback(token);
      } else {
        done();
      }
    });
};

export const signin = (signinDetails, done, callback) => {
  server
    .post('/api/v1/users/signin')
    .set('Connection', 'keep alive')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .type('form')
    .send(signinDetails)
    .end((err, res) => {
      if (err) return done(err);
      if (typeof callback === 'function') {
        const { token } = res.body;
        callback(token);
      } else {
        done();
      }
    });
};
