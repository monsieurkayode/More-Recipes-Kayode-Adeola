import actionTypes from '../../src/actions/actionTypes';
import singleFavoriteReducer from '../../src/reducers/singleFavoriteReducer';

describe('Single Favorite Reducer', () => {
  it('should return initial state',
    () => {
      expect(singleFavoriteReducer(undefined, {})).toEqual(false);
    });

  it('should return boolean when action type is CHECK_FAVORITED',
    () => {
      const action = {
        type: actionTypes.CHECK_FAVORITED,
        payload: true
      };

      const newState = singleFavoriteReducer(false, action);
      expect(newState).toBe(true);
    });

  it('should return true when action type is ADD_FAVORITE_POST',
    () => {
      const action = {
        type: actionTypes.ADD_FAVORITE_POST
      };

      const newState = singleFavoriteReducer(false, action);
      expect(newState).toBe(true);
    });

  it('should return false when action type is REMOVE_FAVORITE',
    () => {
      const action = {
        type: actionTypes.REMOVE_FAVORITE
      };

      const newState = singleFavoriteReducer(false, action);
      expect(newState).toBe(false);
    });
});
