/* eslint-disable no-undef */

import actionTypes from '../../src/actions/actionTypes';
import { signupAction } from '../../src/actions';
import mockData from '../__mocks__/mockData';

const setup = () => {
  const { userDetails, signupResponse } = mockData;
  return {
    setAuthorizationToken: jest.fn(),
    userDetails,
    signupResponse,
  };
};


describe('User Authentication', () => {
  describe('SignupAction', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { userDetails, signupResponse } = setup();

    it('should dispatch SIGNUP_SUCCESSFUL action when a user provides ' +
      'valid details to register and user is created ', (done) => {
      const store = mockStore({});

      // Mock request to /api/v1/users/signup
      // arguments for reply are (status, data, headers)
      mock
        .onPost('/api/v1/users/signup', userDetails)
        .reply(201, signupResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.SIGNUP_SUCCESSFUL,
          payload: decode(signupResponse.token).user
        }
      ];

      store.dispatch(signupAction(userDetails))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch SIGNUP_VALIDATION_USER_ERROR action when a user ' +
      'provides a username that already exists on the application',
    (done) => {
      const expectedActions = [
        {
          type: actionTypes.SIGNUP_VALIDATION_USER_ERROR
        }
      ];

      const store = mockStore({});

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

    it('should dispatch SIGNUP_VALIDATION_EMAIL_ERROR action when a user ' +
      'provides an email address that already exists on the application',
    (done) => {
      const expectedActions = [
        {
          type: actionTypes.SIGNUP_VALIDATION_EMAIL_ERROR
        }
      ];

      const store = mockStore({});

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

    it('should dispatch SIGNUP_UNSUCCESSFUL action when signup request fails',
      (done) => {
        const expectedActions = [
          {
            type: actionTypes.SIGNUP_UNSUCCESSFUL
          }
        ];

        const store = mockStore({});

        mock
          .onPost('/api/v1/users/signup', userDetails)
          .reply(500);

        store.dispatch(signupAction(userDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
      });
  });
});
