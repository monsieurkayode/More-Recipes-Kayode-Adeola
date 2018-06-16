/* eslint-disable no-undef */

import { postReview } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import mockData from '../__mocks__/mockData';

const setup = () => {
  const { postReviewResponse } = mockData;
  return {
    recipeId: 1,
    comment: 'Awesome recipe',
    postReviewResponse
  };
};

describe('Post Review', () => {
  describe('PostReview', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { recipeId, comment, postReviewResponse } = setup();

    it('should dispatch POST_REVIEW action when a review is posted ',
      (done) => {
        const store = mockStore({});
        mock
          .onPost(`/api/v1/recipes/${recipeId}/reviews`, comment)
          .reply(201, postReviewResponse);

        // Declare and initialize expected actions to be received by store
        const expectedActions = [
          {
            type: actionTypes.POST_REVIEW,
            payload: postReviewResponse
          }
        ];

        store
          .dispatch(postReview(recipeId, comment))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('should dispatch POST_REVIEW_ERROR action when a post review request ' +
    'fails',
    (done) => {
      const store = mockStore({});
      mock
        .onPost(`/api/v1/recipes/${recipeId}/reviews`, comment)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.POST_REVIEW_ERROR
        }
      ];

      store
        .dispatch(postReview(recipeId, comment))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
