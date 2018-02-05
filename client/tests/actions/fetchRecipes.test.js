/* eslint-disable no-undef */

import { fetchRecipesAction } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import actionSeeders from '../seeders/actionSeeders';

const setup = () => {
  const { fetchRecipesResponse } = actionSeeders;
  return {
    page: 1,
    limit: 8,
    fetchRecipesResponse
  };
};

describe('Fetch Recipe Posts', () => {
  describe('FetchRecipesAction', () => {
    beforeEach(() => {
      mock.reset();
    });

    const { page, limit, fetchRecipesResponse } = setup();

    it('should dispatch FETCH_RECIPES action when a recipe is fetched',
      (done) => {
        const store = mockStore({});

        mock
          .onGet(`/api/v1/recipes?page=${page}&limit=${limit}`)
          .reply(200, fetchRecipesResponse);

        // Declare and initialize expected actions to be received by store
        const expectedActions = [
          {
            type: actionTypes.FETCH_RECIPES,
            payload: fetchRecipesResponse
          }
        ];

        store
          .dispatch(fetchRecipesAction(page, limit))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

    it('should dispatch FETCH_RECIPES_ERROR action when request to fetch ' +
      'recipes returns an empty response',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes?page=${page}&limit=${limit}`)
        .reply(404, {
          status: 'fail',
          message: 'No recipe found'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_RECIPES_ERROR
        }
      ];

      store
        .dispatch(fetchRecipesAction(page, limit))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch FETCH_RECIPES_ERROR action when request to fetch ' +
      'recipes fails',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes?page=${page}&limit=${limit}`)
        .reply(500, {
          status: 'fail',
          message: 'An error occured!'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.FETCH_RECIPES_ERROR
        }
      ];

      store
        .dispatch(fetchRecipesAction(page, limit))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch SESSION_EXPIRED, LOGOUT_USER actions when the ' +
      'bearer authentication token in header sent with request has expired',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`/api/v1/recipes?page=${page}&limit=${limit}`)
        .reply(403, {
          status: 'fail',
          message: 'Your session has expired, sign in again'
        });

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.SESSION_EXPIRED
        },
        {
          type: actionTypes.LOGOUT_USER,
          payload: {}
        }
      ];

      store
        .dispatch(fetchRecipesAction(page, limit))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
