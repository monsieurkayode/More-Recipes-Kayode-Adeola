/* eslint-disable no-undef */

import actionTypes from '../../src/actions/actionTypes';
import { signupAction } from '../../src/actions';
import actionSeeders from '../seeders/actionSeeders';

const setup = () => {
  const { userDetails, signupResponse } = actionSeeders;
  return {
    setAuthorizationToken: jest.fn(),
    userDetails,
    signupResponse,
    store: mockStore({})
  };
};


describe('User Authentication', () => {
  describe('signupAction', () => {
    beforeEach(() => {
      mock.reset();
    });

    it('should dispatch SIGNUP_SUCCESSFUL action when a user inputs' +
      'valid details to register and user is created ', (done) => {
      const { store, userDetails, signupResponse } = setup();

      // Mock request to /api/v1/users/signup
      // arguments for reply are (status, data, headers)
      mock
        .onPost('/api/v1/users/signup', userDetails)
        .reply(201, signupResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [{
        type: actionTypes.SIGNUP_SUCCESSFUL,
        payload: decode(signupResponse.token).user
      }];

      store.dispatch(signupAction(userDetails))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch SIGNUP_VALIDATION_USER_ERROR action when a user' +
      'inputs a username that already exists', (done) => {
      const expectedActions = [{
        type: actionTypes.SIGNUP_VALIDATION_USER_ERROR,
        payload: 'Username already exists'
      }];

      const { store, userDetails } = setup();

      mock
        .onPost('/api/v1/users/signup', userDetails)
        .reply(409, {
          status: 'fail',
          message: 'Username already exists'
        });

      store.dispatch(signupAction(userDetails)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch SIGNUP_VALIDATION_EMAIL_ERROR action when a user' +
      'inputs an email that already exists', (done) => {
      const expectedActions = [{
        type: actionTypes.SIGNUP_VALIDATION_EMAIL_ERROR,
        payload: 'Email already exists'
      }];

      const { store, userDetails } = setup();

      mock
        .onPost('/api/v1/users/signup', userDetails)
        .reply(409, {
          status: 'fail',
          message: 'Email already exists'
        });

      store.dispatch(signupAction(userDetails)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch SIGNUP_UNSUCCESSFUL action when the requests fails',
      (done) => {
        const expectedActions = [{
          type: actionTypes.SIGNUP_UNSUCCESSFUL,
          payload: 'An error occured! Please try again'
        }];

        const { store, userDetails } = setup();

        mock
          .onPost('/api/v1/users/signup', userDetails)
          .reply(400);

        store.dispatch(signupAction(userDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
      });
  });
});
