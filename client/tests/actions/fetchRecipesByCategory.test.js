/* eslint-disable no-undef */

import { fetchRecipesByCategory } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import actionSeeders from '../seeders/actionSeeders';

const setup = () => {
  const { fetchRecipesResponse } = actionSeeders;
  return {
    page: 1,
    limit: 8,
    query: 'specials',
    fetchRecipesResponse
  };
};

describe('Fetch Recipe Posts By Category', () => {
  describe('FetchRecipesByCategory', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { page, limit, query, fetchRecipesResponse } = setup();

    it('should dispatch FETCH_RECIPES_BY_CATEGORY action when a' +
    ' recipe is fetched by category',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(
          `/api/v1/recipes?page=${page}&limit=${limit}&category=${query}`)
        .reply(200, fetchRecipesResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_RECIPES_BY_CATEGORY,
          payload: fetchRecipesResponse
        }
      ];

      store
        .dispatch(fetchRecipesByCategory(page, limit, query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_RECIPES_BY_CATEGORY_ERROR action when request ' +
      ' to fetch recipes belonging to a category returns an empty response',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(
          `/api/v1/recipes?page=${page}&limit=${limit}&category=${query}`)
        .reply(404, {
          status: 'fail',
          message: 'No recipe matches your search'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_RECIPES_BY_CATEGORY_ERROR,
          payload: {}
        }
      ];

      store
        .dispatch(fetchRecipesByCategory(page, limit, query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_RECIPES_BY_CATEGORY_ERROR action when ' +
      'request to fetch recipes belonging to a category fails fails',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(
          `/api/v1/recipes?page=${page}&limit=${limit}&category=${query}`)
        .reply(500, {
          status: 'fail',
          message: 'An error occured!'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_RECIPES_BY_CATEGORY_ERROR,
          payload: {}
        }
      ];

      store
        .dispatch(fetchRecipesByCategory(page, limit, query))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
