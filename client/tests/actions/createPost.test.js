/* eslint-disable no-undef */

import { createPost } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import actionSeeders from '../seeders/actionSeeders';

/**
 * @description - Setup variables and functions for testing
 * @function setup
 *
 * @param {void} void
 *
 * @returns {object} any
 */
const setup = () => {
  const { recipeDetails, createPostResponse } = actionSeeders;
  return {
    recipeDetails,
    createPostResponse,
    callback: jest.fn(),
    formData: new FormData()
  };
};

describe('Create Recipe Post', () => {
  describe('CreatePost', () => {
    // Reset mock adapter instance before each test block
    beforeEach(() => {
      mock.reset();
    });

    const { recipeDetails, createPostResponse, callback, formData } = setup();

    it('should dispatch CREATE_POST and IS_FETCHING actions when a recipe ' +
    'post is created',
    (done) => {
      // Set the store to an empty initial state
      const store = mockStore({});

      // Mock api request and response data
      mock
        .onPost('/api/v1/recipes', formData)
        .reply(201, createPostResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.CREATE_POST,
          payload: createPostResponse
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            status: false,
            componentName: 'PostRecipe'
          }
        }
      ];

      // Dispatch action and assert action type matches expectedActions
      store
        .dispatch(createPost(recipeDetails.category, recipeDetails, callback))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch CREATE_POST_ERROR and IS_FETCHING actions when ' +
      'request to create recipe postfails',
    (done) => {
      const store = mockStore({});

      // Mock api request and response data
      mock
        .onPost('/api/v1/recipes', formData)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.CREATE_POST_ERROR
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            status: false,
            componentName: 'PostRecipe'
          }
        }
      ];

      // Dispatch action and assert action type matches expectedActions
      store
        .dispatch(createPost(recipeDetails.category, recipeDetails, callback))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
