import axios from 'axios';
import actionTypes from '../actions/actionTypes';

const fetchRecipesAction = () => dispatch =>
  axios.get('/api/v1/recipes')
  .then((response) => {
    const payload = response.data;
    dispatch({type: actionTypes.FETCH_RECIPES, payload });
  })
  .catch((error) => {
    console.log(error.response)
  })

  export default fetchRecipesAction;