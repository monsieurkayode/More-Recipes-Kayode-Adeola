/* eslint-disable no-undef */

import { searchPost } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import mockData from '../__mocks__/mockData';

const setup = () => {
  const { fetchRecipesResponse } = mockData;
  return {
    searchType: 'category',
    searchTerm: 'specials',
    fetchRecipesResponse
  };
};

describe('Search Recipe Posts', () => {
  describe('SearchPost', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { searchType, searchTerm, fetchRecipesResponse } = setup();

    it('should dispatch SEARCH_RECIPE_POST action when a' +
    ' search request is made and is successful',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes?${searchType}=${searchTerm}`)
        .reply(200, fetchRecipesResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.SEARCH_RECIPE_POST,
          payload: fetchRecipesResponse
        }
      ];

      store
        .dispatch(searchPost(searchType, searchTerm))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch SEARCH_RECIPE_POST_ERROR action when a' +
    ' search recipe post request returns an empty response',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes?${searchType}=${searchTerm}`)
        .reply(404, {
          status: 'fail',
          message: 'No recipe matches your search'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.SEARCH_RECIPE_POST_ERROR,
          payload: {}
        }
      ];

      store
        .dispatch(searchPost(searchType, searchTerm))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
