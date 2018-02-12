import actionTypes from '../../src/actions/actionTypes';
import reviewsReducer from '../../src/reducers/reviewsReducer';
import mockData from '../__mocks__/mockData';

describe('Reviews Reducer', () => {
  it('should return initial state',
    () => {
      expect(reviewsReducer(undefined, {})).toEqual({});
    });

  it('should set reviews in store when action type is FETCH_REVIEWS',
    () => {
      const action = {
        type: actionTypes.FETCH_REVIEWS,
        payload: mockData.fetchReviewsResponse
      };

      const newState = reviewsReducer({}, action);
      expect(newState.comments)
        .toEqual({ 1: mockData.fetchReviewsResponse.comments[0] });
    });

  it('should add reviews when action type is POST_REVIEW',
    () => {
      const action = {
        type: actionTypes.POST_REVIEW,
        payload: mockData.postReviewResponse
      };

      const newState = reviewsReducer({}, action);
      expect(newState).toHaveProperty('comments');
    });
});
