/* eslint-disable no-undef */

import { downvoteAction } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('Downvote Recipe', () => {
  describe('DownvoteAction', () => {
    beforeEach(() => {
      mock.reset();
    });

    it('should dispatch DOWNVOTE_POST action when a recipe is downvoted',
      (done) => {
        const store = mockStore({});
        const recipeId = 1;
        mock
          .onPut(`/api/v1/recipes/${recipeId}/downvote`)
          .reply(200, {
            status: 'success',
            message: 'Your vote has been recorded',
            downvote: 1,
            upvote: 0
          });

        // Declare and initialize expected actions to be received by store
        const expectedActions = [
          {
            type: actionTypes.DOWNVOTE_POST,
            payload: {
              recipeId,
              upvote: 0,
              downvote: 1
            }
          }
        ];

        store
          .dispatch(downvoteAction(recipeId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('should dispatch DOWNVOTE_POST_ERROR action when the request to ' +
      'downvote a recipe fails',
    (done) => {
      const store = mockStore({});
      const recipeId = 1;
      mock
        .onPut(`/api/v1/users/${recipeId}/downvote`)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.DOWNVOTE_POST_ERROR
        }
      ];

      store
        .dispatch(downvoteAction(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
