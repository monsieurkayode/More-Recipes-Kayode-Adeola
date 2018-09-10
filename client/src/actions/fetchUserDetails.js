import axios from 'axios';
import actionTypes from './actionTypes';

const fetchUserDetailsAction = () => (dispatch) => {
  dispatch({
    type: actionTypes.IS_FETCHING,
    payload: { status: true, componentName: 'UserProfile' }
  });

  return axios.get('/api/v1/users/profile')
    .then((response) => {
      const { userDetails } = response.data;
      dispatch(
        {
          type: actionTypes.FETCH_USER_PROFILE,
          payload: userDetails
        }
      );
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'DashboardPage' }
      });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'UserProfile' }
      });
    })
    .catch(() => {
      dispatch(
        {
          type: actionTypes.FETCH_USER_PROFILE_ERROR
        }
      );
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'DashboardPage' }
      });
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'UserProfile' }
      });
    });
};

export default fetchUserDetailsAction;
