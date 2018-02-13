import axios from 'axios';
import actionTypes from './actionTypes';

const fetchUserDetailsAction = () => dispatch =>
  axios.get('/api/v1/users/profile')
    .then((response) => {
      const { userDetails } = response.data;
      dispatch(
        {
          type: actionTypes.FETCH_USER_PROFILE,
          payload: userDetails
        }
      );
    })
    .catch(() => {
      dispatch(
        {
          type: actionTypes.FETCH_USER_PROFILE_ERROR
        }
      );
    });

export default fetchUserDetailsAction;
