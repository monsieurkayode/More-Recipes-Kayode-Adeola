/* eslint-disable */
/* jshint esversion: 6 */
import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SAMPLE_RECIPES:
      return _.mapKeys(action.payload, 'id');
    case actionTypes.FETCH_RECIPES:
      const { recipes } = action.payload;
      _.omitBy(state, 'sample');
      return Object.assign(
        {}, _.orderBy(
          _.mapKeys([...recipes, ...state], 'id'), 'id', 'desc')
      );
    case actionTypes.CREATE_POST:
      return _.orderBy(
        { ...state, [action.payload.id]: action.payload }, 'id', 'desc'
      );
    default:
      return state;
  }
};

export default recipeReducer;
