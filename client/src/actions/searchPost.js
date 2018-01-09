/* jshint esversion: 6 */
import axios from 'axios';

import actionTypes from './actionTypes';

const searchPost = (searchType, searchTerm) => (dispatch) => {
  searchType = searchType.length ? searchType : 'name';
  return axios.get(`/api/v1/recipes?${searchType}=${searchTerm}`)
    .then((response) => {
      const payload = response.data;
      dispatch({ type: actionTypes.SEARCH_RECIPE_POST, payload });
    })
    .catch(() => {
      dispatch({ type: actionTypes.SEARCH_RECIPE_POST_ERROR, payload: {} });
    });
};

export default searchPost;
