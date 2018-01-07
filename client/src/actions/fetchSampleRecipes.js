import actionTypes from './actionTypes';
import sampleRecipes from '../utils/sampleRecipes';

const fetchSampleRecipes = callback => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_SAMPLE_RECIPES, payload: sampleRecipes });
  callback();
};

export default fetchSampleRecipes;
