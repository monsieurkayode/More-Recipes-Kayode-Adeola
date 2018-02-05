/* eslint-disable no-undef */

import { fetchUserRecipes } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import actionSeeders from '../seeders/actionSeeders';

const setup = () => {
  const { fetchRecipesResponse } = actionSeeders;
  return {
    page: 1,
    fetchRecipesResponse
  };
};

describe('Fetch User Recipes', () => {
  describe('FetchUserRecipes', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { page, fetchRecipesResponse } = setup();

    it('should dispatch FETCH_USER_RECIPES and IS_FETCHING actions when' +
      'user recipes is fetched',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes/user?page=${page}`)
        .reply(200, fetchRecipesResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_USER_RECIPES,
          payload: {
            pagination: fetchRecipesResponse.pagination,
            recipes: fetchRecipesResponse.recipes
          }
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            componentName: 'Dashboard',
            status: false
          }
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            componentName: 'UserRecipes',
            status: false
          }
        }
      ];

      store
        .dispatch(fetchUserRecipes(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_USER_RECIPES_ERROR action when request ' +
      'to fetch user recipes returns an empty response',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes/user?page=${page}`)
        .reply(404, {
          status: 'fail',
          message: 'You have no recipe post'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_USER_RECIPES_ERROR
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            componentName: 'Dashboard',
            status: false
          }
        }
      ];

      store
        .dispatch(fetchUserRecipes(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_USER_RECIPES_ERROR action when request ' +
      'to fetch user recipes fails',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes/user?page=${page}`)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_USER_RECIPES_ERROR
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            componentName: 'Dashboard',
            status: false
          }
        }
      ];

      store
        .dispatch(fetchUserRecipes(page))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
