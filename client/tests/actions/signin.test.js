/* eslint-disable no-undef */

import { signinAction } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import actionSeeders from '../seeders/actionSeeders';

const setup = () => {
  const { userCredentials, signinResponse } = actionSeeders;
  return {
    setAuthorizationToken: jest.fn(),
    userCredentials,
    signinResponse,
  };
};

describe('User Authentication', () => {
  describe('SigninAction', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { userCredentials, signinResponse } = setup();
    it('should dispatch SIGNIN_SUCCESSFUL action when a user provides ' +
      'valid credentials to login to the application',
    (done) => {
      const store = mockStore({});
      mock
        .onPost('/api/v1/users/signin', userCredentials)
        .reply(200, signinResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.SIGNIN_SUCCESSFUL,
          payload: decode(signinResponse.Token).user
        }
      ];

      store.dispatch(signinAction(userCredentials))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch SIGNIN_AUTHENTICATION_ERROR action when a user ' +
      'provides invalid credentials to login to the application',
    (done) => {
      const store = mockStore({});
      mock
        .onPost('/api/v1/users/signin', userCredentials)
        .reply(401, {
          status: 'fail',
          message: 'Invalid Authentication Details'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.SIGNIN_AUTHENTICATION_ERROR,
          payload: 'Invalid Authentication Details'
        }
      ];

      store.dispatch(signinAction(userCredentials))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch SIGNIN_UNSUCCESSFUL action when login request fails',
      (done) => {
        const store = mockStore({});
        mock
          .onPost('/api/v1/users/signin', userCredentials)
          .reply(500);

        // Declare and initialize expected actions to be received by store
        const expectedActions = [
          {
            type: actionTypes.SIGNIN_UNSUCCESSFUL,
            payload: 'An error occured!'
          }
        ];

        store.dispatch(signinAction(userCredentials))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });
  });
});
