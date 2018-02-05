/* eslint-disable no-undef */

import { fetchSingleFavorite } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('Fetch Single Favorite Recipe', () => {
  describe('FetchSingleFavorite', () => {
    beforeEach(() => {
      mock.reset();
    });

    const recipeId = 1;

    it('should dispatch CHECK_FAVORITED action when a fetch' +
    ' single favorite request is made to check if is on the user\'s favorite ' +
    'list, payload will be true if it exists',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/users/${recipeId}/favorites`)
        .reply(200, {
          status: 'success',
          message: 'Recipe on favorite list',
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.CHECK_FAVORITED,
          payload: true
        }
      ];

      store
        .dispatch(fetchSingleFavorite(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch CHECK_FAVORITED action when a fetch single ' +
    'favorite request is made to check if is on the user\'s favorite list ' +
    'payload should be false if not found',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/users/${recipeId}/favorites`)
        .reply(404, {
          status: 'fail',
          message: 'Recipe has not been added to favorite',
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.CHECK_FAVORITED,
          payload: false
        }
      ];

      store
        .dispatch(fetchSingleFavorite(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
