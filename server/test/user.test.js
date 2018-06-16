import models from '../models';
import userSeeder from '../seeders/userSeeder';

import { signup, server, expect, assert } from '../utils/testSetup';

const authenticationToken = {};

describe('Authentication Test', () => {
/**
 *
 * @description Hook for cleaning up the test database
 * before each test block have been run
 *
 * @return {undefined}
 */
  beforeEach((done) => {
    models.sequelize.sync({
      force: true
    })
      .then(() => {
        const { validSignupDetails1, validSignupDetails2 } = userSeeder;
        signup(validSignupDetails1, done, (token) => {
          authenticationToken.authUser1 = token;
          signup(validSignupDetails2, done, (token2) => {
            authenticationToken.authUser2 = token2;
            done();
          });
        });
      }).catch((error) => {
        done(error);
      });
  });

  describe('User Signup Endpoint', () => {
    it('should create a new account when user provides valid signup details',
      (done) => {
        const { validSignupDetails3 } = userSeeder;
        server
          .post('/api/v1/users/signup')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(validSignupDetails3)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Account successfully created');
            if (err) return done(err);
            done();
          });
      });

    it('should throw error message with status 409 if username already exists',
      (done) => {
        const { existingUsernameSignup } = userSeeder;
        server
          .post('/api/v1/users/signup')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(existingUsernameSignup)
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Username already exists');
            if (err) return done(err);
            done();
          });
      });

    it('should throw error message with status 409 if email already exists',
      (done) => {
        const { existingEmailSignup } = userSeeder;
        server
          .post('/api/v1/users/signup')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(existingEmailSignup)
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Email already exists');
            if (err) return done(err);
            done();
          });
      });

    it('should throw error message with status 422 if username contains ' +
  'special characters',
    (done) => {
      const { nonAlphanumericUsername } = userSeeder;
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(nonAlphanumericUsername)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message.username)
            .to
            .equal('Username must contain alphabets and numbers only');
          if (err) return done(err);
          done();
        });
    });

    it('throw error message with status 422 if username length is less than ' +
  'three characters',
    (done) => {
      const { shortUsernameLength } = userSeeder;
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(shortUsernameLength)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message.username)
            .to
            .equal('Username should be at least three characters');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if password length is ' +
  'less than six characters',
    (done) => {
      const { shortPasswordLength } = userSeeder;
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(shortPasswordLength)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message.password)
            .to
            .equal('Password should be at least six characters long');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if provided password and ' +
  'confirmation password field does not match',
    (done) => {
      const { confirmationPasswordMatchError } = userSeeder;
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(confirmationPasswordMatchError)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message.confirmPassword)
            .to
            .equal('Password does not match');
          if (err) return done(err);
          done();
        });
    });

    it('should throw errors with status 422 if submitted form field is empty',
      (done) => {
        server
          .post('/api/v1/users/signup')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send({})
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.status).to.equal('fail');
            assert.deepEqual((res.body.message),
              {
                username: 'Username should be at least three characters',
                email: 'Invalid Email, please enter a valid email',
                password: 'Password should be at least six characters long',
                confirmPassword: 'Re-enter password for confirmation'
              });
            if (err) return done(err);
            done();
          });
      });
  });

  describe('User Login Endpoint', () => {
    it('should authenticate and signin a user with valid login credentials',
      (done) => {
        const { validLoginCredentials1 } = userSeeder;
        server
          .post('/api/v1/users/signin')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(validLoginCredentials1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Token successfully generated');
            if (err) return done(err);
            done();
          });
      });

    it('should throw error message with status 401 if provided login ' +
  'credentials are invalid',
    (done) => {
      const { invalidLoginCredentials } = userSeeder;
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidLoginCredentials)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Invalid Authentication Details');
          if (err) return done(err);
          done();
        });
    });
  });


  describe('Protected Endpoints', () => {
    it('should throw error message with status 403 if no token is provided ' +
    'in request payload to protected endpoints', (done) => {
      server
        .get('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message).to.equal('No Token provided');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 403 if provided token in ' +
    'header has expired',
    (done) => {
      server
        .get('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('x-access-token', userSeeder.expiredUserToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message)
            .to
            .equal('Your session has expired, sign in again');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if provided token in ' +
    'header is invalid or cant be verified',
    (done) => {
      server
        .get('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('x-access-token', 'yturuueiiwiwjh')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.message).to.equal('Bad Token');
          if (err) return done(err);
          done();
        });
    });

    it('should throw error message with status 422 if invalid route' +
    'parameters are entered in url',
    (done) => {
      server
        .get('/api/v1/recipes/a')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.message)
            .to
            .equal('You have entered an invalid parameter');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Password Change Endpoint', () => {
    it('should authorize password change and return a success message ' +
    'with status 200 for an authenticated user',
    (done) => {
      const { newUserPassword } = userSeeder;
      server
        .put('/api/v1/users/changepassword')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .type('form')
        .send(newUserPassword)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Password changed successfully');
          if (err) return done(err);
          done();
        });
    });
    it('should throw error message with status 422 if new password length ' +
    'is less than six characters', (done) => {
      const { shortPasswordLength } = userSeeder;
      server
        .put('/api/v1/users/changepassword')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(shortPasswordLength)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message)
            .to
            .equal('Your request could not be processed');
          if (err) return done(err);
          done();
        });
    });
    it('should throw error message with status 422 if an empty password form ' +
    'is submitted', (done) => {
      const { emptyForm } = userSeeder;
      server
        .put('/api/v1/users/changepassword')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authenticationToken.authUser1)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(emptyForm)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message)
            .to
            .equal('Your request could not be processed');
          if (err) return done(err);
          done();
        });
    });
  });
});
