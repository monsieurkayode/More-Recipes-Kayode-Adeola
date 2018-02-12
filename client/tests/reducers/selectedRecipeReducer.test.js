import actionTypes from '../../src/actions/actionTypes';
import selectedRecipeReducer from '../../src/reducers/selectedRecipeReducer';

describe('Selected Recipe Reducer', () => {
  it('should return initial state',
    () => {
      expect(selectedRecipeReducer(undefined, {})).toEqual(0);
    });

  it('should set the id of selected recipe in store when action type is ' +
  'SELECT_RECIPE',
  () => {
    const action = {
      type: actionTypes.SELECT_RECIPE,
      payload: 1
    };

    const newState = selectedRecipeReducer({}, action);
    expect(newState).toBe(1);
  });
});
