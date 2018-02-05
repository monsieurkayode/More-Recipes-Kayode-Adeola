/* eslint-disable no-undef */

import { editPost } from '../../src/actions';
import actionTypes from '../../src/actions/actionTypes';
import actionSeeders from '../seeders/actionSeeders';

const setup = () => {
  const { editRecipeDetails, editPostResponse } = actionSeeders;
  return {
    editRecipeDetails,
    editPostResponse,
    callback: jest.fn(),
    formData: new FormData(),
    recipeId: 1
  };
};

describe('Edit Recipe Post', () => {
  describe('EditPost', () => {
    beforeEach(() => {
      mock.reset();
    });
    const {
      recipeId,
      editRecipeDetails,
      editPostResponse,
      callback,
      formData
    } = setup();

    it('should dispatch EDIT_RECIPE_POST and IS_FETCHING actions when a ' +
    'recipe post is updated',
    (done) => {
      const store = mockStore({});
      mock
        .onPut(`/api/v1/recipes/${recipeId}`, formData)
        .reply(200, editPostResponse);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.EDIT_RECIPE_POST
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            status: false,
            componentName: 'EditRecipe'
          }
        }
      ];

      store
        .dispatch(editPost(
          recipeId, editRecipeDetails.category, editRecipeDetails, callback
        ))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch EDIT_RECIPE_POST_ERROR and IS_FETCHING actions ' +
      'when a request to update a recipe post fails',
    (done) => {
      const store = mockStore({});
      mock
        .onPut(`/api/v1/recipes/${recipeId}`, formData)
        .reply(500);

      // Declare and initialize expected actions to be received by store
      const expectedActions = [
        {
          type: actionTypes.EDIT_RECIPE_POST_ERROR
        },
        {
          type: actionTypes.IS_FETCHING,
          payload: {
            status: false,
            componentName: 'EditRecipe'
          }
        }
      ];

      store
        .dispatch(editPost(
          recipeId, editRecipeDetails.category, editRecipeDetails, callback
        ))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
