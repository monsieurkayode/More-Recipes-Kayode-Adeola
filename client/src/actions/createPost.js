import axios from 'axios';
import actionTypes from './actionTypes';

const createPost = (values, callback) => dispatch =>
  axios.post('/api/v1/recipes', values)
    .then(({ data }) => {
      dispatch({type:actionTypes.CREATE_POST, payload: data })
      callback();
    })

export default createPost;