/* eslint-disable no-undef */

import { upvoteAction } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('Upvote Recipe', () => {
  describe('UpvoteAction', () => {
    beforeEach(() => {
      mock.reset();
    });

    it('should dispatch UPVOTE_POST action when a recipe is upvoted',
      (done) => {
        const store = mockStore({});
        const recipeId = 1;
        mock
          .onPut(`/api/v1/recipes/${recipeId}/upvote`)
          .reply(200, {
            status: 'success',
            message: 'Your vote has been recorded',
            downvote: 0,
            upvote: 1
          });

        // Declare and initialize expected actions to be received by store
        const expectedActions = [
          {
            type: actionTypes.UPVOTE_POST,
            payload: {
              recipeId,
              upvote: 1,
              downvote: 0
            }
          }
        ];

        store
          .dispatch(upvoteAction(recipeId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('should dispatch UPVOTE_POST_ERROR action when the request to ' +
      'upvote a recipe fails',
    (done) => {
      const store = mockStore({});
      const recipeId = 1;
      mock
        .onPut(`/api/v1/users/${recipeId}/upvote`)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.UPVOTE_POST_ERROR
        }
      ];

      store
        .dispatch(upvoteAction(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
