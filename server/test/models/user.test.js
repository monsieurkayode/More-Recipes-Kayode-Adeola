import models from '../../models';

import { expect } from '../../utils/testSetup';

const User = models.User;

describe(('User Model'), () => {
  before((done) => {
    models.User.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe(('Create User'), () => {
    it('should fail if no username is provided', (done) => {
      User.create({
        email: 'zabuza@hiddenmist.com',
        password: 'hiddenmist'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].message).to.equal('username cannot be null');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });
    it('should fail provided username length is less than 3', (done) => {
      User.create({
        username: 'za',
        email: 'zabuza@hiddenmist.com',
        password: 'hiddenmist'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('Validation error');
          expect(error.errors[0].message)
            .to
            .equal('Username must be minimum 3 and maximum 30');
          done();
        });
    });

    it('should fail provided username length is more than 30', (done) => {
      User.create({
        username: 'thisisaverylongusernamandshouldntbeaccepted',
        email: 'zabuza@hiddenmist.com',
        password: 'hiddenmist'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('Validation error');
          expect(error.errors[0].message)
            .to
            .equal('Username must be minimum 3 and maximum 30');
          done();
        });
    });

    it('should fail if no password is provided', (done) => {
      User.create({
        username: 'zabuza',
        email: 'zabuza@hiddenmist.com',
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].message).to.equal('password cannot be null');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });

    it('should fail if no email is provided', (done) => {
      User.create({
        username: 'zabuza',
        password: 'hiddenmist'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].message).to.equal('email cannot be null');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });

    it('should fail if provided email is invalid', (done) => {
      User.create({
        username: 'zabuza',
        email: 'zabuza.com',
        password: 'hiddenmist'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('Validation error');
          expect(error.errors[0].message).to.equal('Invalid email address');
          done();
        });
    });

    it('should create user if all validation exceptions passes', (done) => {
      User.create({
        username: 'zabuza',
        email: 'zabuza@hiddenmist.com',
        password: 'hiddenmist'
      })
        .then((user) => {
          expect(typeof (user)).to.equal('object');
          expect(user.dataValues.username).to.equal('zabuza');
          expect(user.dataValues.email).to.equal('zabuza@hiddenmist.com');
          done();
        });
    });

    it('should fail if username already exists', (done) => {
      User.create({
        username: 'zabuza',
        email: 'hercules@olympus.com',
        password: 'hiddenmist'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('unique violation');
          expect(error.errors[0].message).to.equal('Username already exists');
          done();
        });
    });

    it('should fail if email already exists', (done) => {
      User.create({
        username: 'hercules',
        email: 'zabuza@hiddenmist.com',
        password: 'hiddenmist'
      })
        .catch((error) => {
          expect(error.errors[0].type).to.equal('unique violation');
          expect(error.errors[0].message).to.equal('Email already exists');
          done();
        });
    });
  });

  describe('Update User', () => {
    it('should fail if provided first name length is less than 3', (done) => {
      User
        .findById(3)
        .then((user) => {
          user.update({
            firstName: 'za'
          })
            .catch((error) => {
              expect(error.errors[0].type).to.equal('Validation error');
              expect(error.errors[0].message)
                .to
                .equal('First name must be minimum 3 and maximum 30 letters');
              done();
            });
        });
    });

    it('should fail if provided last name length is less than 3', (done) => {
      User
        .findById(3)
        .then((user) => {
          user.update({
            lastName: 'za'
          })
            .catch((error) => {
              expect(error.errors[0].type).to.equal('Validation error');
              expect(error.errors[0].message)
                .to
                .equal('Last name must be minimum 3 and maximum 30 letters');
              done();
            });
        });
    });

    it('should fail if provided first name length is more than 30', (done) => {
      User
        .findById(3)
        .then((user) => {
          user.update({
            firstName: 'thisisaverylongnamethatshouldntbeentry'
          })
            .catch((error) => {
              expect(error.errors[0].type).to.equal('Validation error');
              expect(error.errors[0].message)
                .to
                .equal('First name must be minimum 3 and maximum 30 letters');
              done();
            });
        });
    });

    it('should fail if provided last name length is more than 30', (done) => {
      User
        .findById(3)
        .then((user) => {
          user.update({
            lastName: 'thisisaverylongnamethatshouldntbeentry'
          })
            .catch((error) => {
              expect(error.errors[0].type).to.equal('Validation error');
              expect(error.errors[0].message)
                .to
                .equal('Last name must be minimum 3 and maximum 30 letters');
              done();
            });
        });
    });
  });
});
