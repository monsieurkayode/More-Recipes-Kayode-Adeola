/* eslint-disable no-undef */

import { addFavoriteAction } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('Add Favorite Recipe', () => {
  describe('AddFavoriteAction', () => {
    // Reset mock adapter instance before each test block
    beforeEach(() => {
      mock.reset();
    });

    it('should dispatch ADD_FAVORITE_POST action when a recipe post is ' +
      'favorited',
    (done) => {
      // Set the store to an empty initial state
      const store = mockStore({});
      const recipeId = 1;

      // Mock api request and response data
      mock
        .onPost(`/api/v1/users/${recipeId}/favorites`)
        .reply(201, {
          status: 'success',
          message: 'Recipe successfully added to favorites'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.ADD_FAVORITE_POST
        }
      ];

      // Dispatch action and assert action type matches expectedActions
      store
        .dispatch(addFavoriteAction(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch ADD_FAVORITE_ERROR action when the request to add a ' +
      'favorite recipe fails',
    (done) => {
      // Set the store to an empty initial state
      const store = mockStore({});
      const recipeId = 1;

      // Mock api request and response data
      mock
        .onPost(`/api/v1/users/${recipeId}/favorites`)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.ADD_FAVORITE_ERROR
        }
      ];

      // Dispatch action and assert action type matches expectedActions
      store
        .dispatch(addFavoriteAction(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
