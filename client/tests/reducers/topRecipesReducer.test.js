import actionTypes from '../../src/actions/actionTypes';
import topRecipesReducer from '../../src/reducers/topRecipesReducer';
import mockData from '../__mocks__/mockData';

describe('Top Recipes Reducer', () => {
  it('should return initial state',
    () => {
      expect(topRecipesReducer(undefined, {})).toEqual([]);
    });

  it('should add top recipes when passed FETCH_TOP_RECIPES',
    () => {
      const action = {
        type: actionTypes.FETCH_TOP_RECIPES,
        payload: mockData.fetchTopRecipesResponse.recipes
      };

      const newState = topRecipesReducer([], action);
      expect(newState).toHaveLength(1);
    });
});
