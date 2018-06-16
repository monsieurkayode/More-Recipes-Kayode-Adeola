/* jshint esversion: 6 */
import actionTypes from './actionTypes';

/**
 * @summary - Action creator for getting the Id
 * of selected recipe
 *
 * @function selectRecipe
 *
 * @param {id} id
 *
 * @returns {void}
 */
const selectRecipe = id => dispatch => (
  dispatch({ type: actionTypes.SELECT_RECIPE, payload: id })
);

export default selectRecipe;
