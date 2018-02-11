/* eslint-disable no-undef */

import { fetchSingleRecipe } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import mockData from '../__mocks__/mockData';

window.location.replace = () => {};

const setup = () => {
  const { fetchSingleRecipeResponse } = mockData;
  return {
    fetchSingleRecipeResponse,
    recipeId: 1,
  };
};

describe('Fetch Single Recipe Post', () => {
  describe('FetchSingleRecipe', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { recipeId, fetchSingleRecipeResponse } = setup();

    it('should dispatch FETCH_SINGLE_RECIPE action when a' +
    ' single recipe is fetched',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes/${recipeId}`)
        .reply(200, fetchSingleRecipeResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_SINGLE_RECIPE,
          payload: fetchSingleRecipeResponse
        }
      ];

      store
        .dispatch(fetchSingleRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_SINGLE_RECIPE_ERROR action when request ' +
      'to fetch a single recipe fails or returns an empty response',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes/${recipeId}`)
        .reply(404);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_SINGLE_RECIPE_ERROR,
        }
      ];

      store
        .dispatch(fetchSingleRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_SINGLE_RECIPE_ERROR action when request ' +
      'to fetch a single recipe is not authenticated with a valid token',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes/${recipeId}`)
        .reply(403);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_SINGLE_RECIPE_ERROR,
        }
      ];

      store
        .dispatch(fetchSingleRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
