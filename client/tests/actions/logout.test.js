/* eslint-disable no-undef */

import { logoutAction } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('LogoutAction', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should dispatch LOGOUT_USER action ' +
      'user recipes is fetched',
  (done) => {
    const store = mockStore({});

    // Declare and initialize expected actions to be received by store
    const expectedActions = [
      {
        type: actionTypes.LOGOUT_USER,
        payload: {}
      }
    ];

    store.dispatch(logoutAction());
    expect(store.getActions()).toEqual(expectedActions);
    setTimeout(() => done(), 1000);
  });
});
