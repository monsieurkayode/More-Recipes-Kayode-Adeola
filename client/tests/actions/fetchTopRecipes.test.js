/* eslint-disable no-undef */

import { fetchTopRecipes } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import mockData from '../__mocks__/mockData';


describe('Fetch Top Recipe Posts', () => {
  describe('FetchTopRecipes', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { fetchTopRecipesResponse } = mockData;

    it('should dispatch FETCH_TOP_RECIPES action when top recipes are fetched',
      (done) => {
        const store = mockStore({});

        mock
          .onGet('/api/v1/recipes?sort=upvote&order=descending')
          .reply(200, fetchTopRecipesResponse);

        // Declare and initialize expected actions to be received by store
        const expectedActions = [
          {
            type: actionTypes.FETCH_TOP_RECIPES,
            payload: fetchTopRecipesResponse.recipes
          }
        ];

        store
          .dispatch(fetchTopRecipes())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('should dispatch FETCH_TOP_RECIPES_ERROR action when request ' +
      'to fetch top recipes fails',
    (done) => {
      const store = mockStore({});

      mock
        .onGet('/api/v1/recipes?sort=upvote&order=descending')
        .reply(500);

      // Declare and initialize expected actions to be received in store
      const expectedActions = [
        {
          type: actionTypes.FETCH_TOP_RECIPES_ERROR
        }
      ];

      store
        .dispatch(fetchTopRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
