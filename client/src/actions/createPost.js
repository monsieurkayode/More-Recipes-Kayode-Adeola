import axios from 'axios';
import actionTypes from './actionTypes';

const createPost = (values, callback) => dispatch => {
  const formData = new FormData();
  formData.append('recipeName', values.recipeName);
  formData.append('category', values.category);
  formData.append('ingredients', values.ingredients);
  formData.append('instructions', values.instructions);
  formData.append('image', values.image ? values.image['file'] : 'spice.jpg');
  return axios.post('/api/v1/recipes', formData)
    .then(({ data }) => {
      dispatch({type:actionTypes.CREATE_POST, payload: data })
      callback();
    })
}
export default createPost;