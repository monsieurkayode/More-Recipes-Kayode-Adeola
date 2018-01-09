/* jshint esversion: 6 */
import actionTypes from './actionTypes';

const selectRecipe = id => dispatch => (
  dispatch({ type: actionTypes.SELECT_RECIPE, payload: id })
);

export default selectRecipe;
