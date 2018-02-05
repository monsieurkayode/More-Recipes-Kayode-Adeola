/* eslint-disable no-undef */

import { fetchUserFavorites } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import actionSeeders from '../seeders/actionSeeders';

const setup = () => {
  const { fetchRecipesResponse } = actionSeeders;
  return {
    page: 1,
    fetchRecipesResponse
  };
};

describe('Fetch User Favorite Recipes', () => {
  describe('FetchUserFavorites', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { page, fetchRecipesResponse } = setup();

    it('should dispatch FETCH_USER_FAVORITES and IS_FETCHING actions when' +
      'user favorite recipes is fetched',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/users/recipes/favorites?page=${page}`)
        .reply(200, fetchRecipesResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_USER_FAVORITES,
          payload: {
            pagination: fetchRecipesResponse.pagination,
            recipes: fetchRecipesResponse.recipes
          }
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            componentName: 'UserFavorites',
            status: false
          }
        }
      ];

      store
        .dispatch(fetchUserFavorites(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_USER_FAVORITES_ERROR action when request ' +
      'to fetch user favorite recipes returns an empty response',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/users/recipes/favorites?page=${page}`)
        .reply(404, {
          status: 'fail',
          message: 'Your favorite recipe list is empty'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_USER_FAVORITES_ERROR
        }
      ];

      store
        .dispatch(fetchUserFavorites(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
