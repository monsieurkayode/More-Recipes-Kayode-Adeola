/* eslint-disable no-undef */

import { isFetching } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('Request Status', () => {
  describe('IsFetching', () => {
    beforeEach(() => {
      mock.reset();
    });

    it('should dispatch IS_FETCHING action when an api request is ' +
      'pending or resolved',
    (done) => {
      const store = mockStore({});
      let status, componentName;
      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.IS_FETCHING,
          payload: { status, componentName }
        }
      ];

      store.dispatch(isFetching(status, componentName));
      expect(store.getActions()).toEqual(expectedActions);
      setTimeout(() => done(), 1000);
    });
  });
});
