/* eslint-disable no-undef */

import { removeFavorite } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('Remove Favorite Recipe', () => {
  describe('RemoveFavorite', () => {
    beforeEach(() => {
      mock.reset();
    });

    const recipeId = 1;

    it('should dispatch REMOVE_FAVORITE action when a recipe post is ' +
      'removed from favorited',
    (done) => {
      const store = mockStore({});
      mock
        .onDelete(`/api/v1/users/${recipeId}/favorites`)
        .reply(200, {
          status: 'success',
          message: 'Recipe successfully removed from favorites'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.REMOVE_FAVORITE,
          payload: recipeId
        }
      ];

      store
        .dispatch(removeFavorite(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch REMOVE_FAVORITE_ERROR action when request to ' +
      'remove a recipe from favorite fails',
    (done) => {
      const store = mockStore({});

      mock
        .onDelete(`/api/v1/users/${recipeId}/favorites`)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.REMOVE_FAVORITE_ERROR
        }
      ];

      store
        .dispatch(removeFavorite(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
