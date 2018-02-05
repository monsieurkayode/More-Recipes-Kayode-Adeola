/* eslint-disable no-undef */

import { selectRecipe } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';

describe('Select Recipe', () => {
  describe('SelectRecipe', () => {
    beforeEach(() => {
      mock.reset();
    });

    it('should dispatch SELECT_RECIPE action when a recipe is selected for ' +
      'update or delete operations',
    (done) => {
      const store = mockStore({});
      const id = 1;
      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.SELECT_RECIPE,
          payload: id
        }
      ];

      store.dispatch(selectRecipe(id));
      expect(store.getActions()).toEqual(expectedActions);
      setTimeout(() => done(), 1000);
    });
  });
});
