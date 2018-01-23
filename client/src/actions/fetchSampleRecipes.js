import actionTypes from './actionTypes';
import sampleRecipes from '../utils/sampleRecipes';

/**
 * @summary - Action creator for loading sample recipes
 *
 * @function fetchSampleRecipes
 *
 * @param {function} callback
 *
 * @returns {void}
 */
const fetchSampleRecipes = callback => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_SAMPLE_RECIPES, payload: sampleRecipes });
  callback();
};

export default fetchSampleRecipes;
