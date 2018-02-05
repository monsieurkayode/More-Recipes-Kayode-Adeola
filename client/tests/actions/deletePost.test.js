/* eslint-disable no-undef */

import { deletePost } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('Delete Recipe Post', () => {
  // Reset mock adapter instance before each test block
  describe('DeletePost', () => {
    beforeEach(() => {
      mock.reset();
    });

    it('should dispatch DELETE_RECIPE_POST action when a recipe is deleted',
      (done) => {
        // Set the store to an empty initial state
        const store = mockStore({});
        const recipeId = 1;

        // Mock api request and response data
        mock
          .onDelete(`/api/v1/recipes/${recipeId}`)
          .reply(200, {
            status: 'success',
            message: 'Recipe successfully deleted'
          });

        // Declare and initialize expected actions to be received by store
        const expectedActions = [
          {
            type: actionTypes.DELETE_RECIPE_POST,
            payload: recipeId
          }
        ];

        // Dispatch action and assert action type matches expectedActions
        store
          .dispatch(deletePost(recipeId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('should dispatch DELETE_RECIPE_POST_ERROR action when the request to ' +
      'delete a recipe fails',
    (done) => {
      const store = mockStore({});
      const recipeId = 1;
      mock
        .onPost(`/api/v1/users/${recipeId}/favorites`)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.DELETE_RECIPE_POST_ERROR
        }
      ];

      store
        .dispatch(deletePost(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
