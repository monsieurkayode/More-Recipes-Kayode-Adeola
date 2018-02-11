/* eslint-disable no-undef */

import { fetchReviews } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import mockData from '../__mocks__/mockData';

const setup = () => {
  const { fetchReviewsResponse } = mockData;
  return {
    fetchReviewsResponse,
    recipeId: 1,
  };
};

describe('Fetch Reviews', () => {
  describe('FetchReviews', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { recipeId, fetchReviewsResponse } = setup();

    it('should dispatch FETCH_REVIEWS action when a' +
    ' recipe review is fetched from server',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes/${recipeId}/reviews`)
        .reply(200, fetchReviewsResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_REVIEWS,
          payload: fetchReviewsResponse
        }
      ];

      store
        .dispatch(fetchReviews(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_REVIEWS_ERROR action when request ' +
      ' to fetch reviews fails or returns an empty response',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes/${recipeId}/reviews`)
        .reply(404);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_REVIEWS_ERROR,
        }
      ];

      store
        .dispatch(fetchReviews(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
