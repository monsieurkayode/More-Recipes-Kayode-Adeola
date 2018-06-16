import actionTypes from '../../src/actions/actionTypes';
import singleRecipeReducer from '../../src/reducers/singleRecipeReducer';
import mockData from '../__mocks__/mockData';

describe('Single Recipe Reducer', () => {
  it('should return initial state',
    () => {
      expect(singleRecipeReducer(undefined, {})).toEqual({});
    });

  it('should set current recipe when action type is FETCH_SINGLE_RECIPE',
    () => {
      const action = {
        type: actionTypes.FETCH_SINGLE_RECIPE,
        payload: mockData.recipeFetched
      };

      const newState = singleRecipeReducer({}, action);
      expect(newState.recipeName).toEqual('Chicken Soup');
    });

  it('should update recipe upvote when action type is UPVOTE_POST',
    () => {
      const action = {
        type: actionTypes.UPVOTE_POST,
        payload: {
          upvote: 1,
          downvote: 0
        }
      };

      const newState = singleRecipeReducer({}, action);
      expect(newState.upvote).toBe(1);
      expect(newState.downvote).toBe(0);
    });

  it('should update recipe downvote when action type is DOWNVOTE_POST',
    () => {
      const action = {
        type: actionTypes.DOWNVOTE_POST,
        payload: {
          upvote: 0,
          downvote: 1
        }
      };

      const newState = singleRecipeReducer({}, action);
      expect(newState.downvote).toBe(1);
      expect(newState.upvote).toBe(0);
    });
});
