import axios from 'axios';
import actionTypes from './actionTypes';

const updateProfileAction = updateDetails => (dispatch) => {
  const formData = new FormData();
  const {
    bio,
    firstName,
    lastName,
    imageUrl,
  } = updateDetails;

  formData.append('bio', bio);
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('imageUrl', imageUrl);

  dispatch({
    type: actionTypes.IS_FETCHING,
    payload: { status: true, componentName: 'UserProfile' }
  });

  return axios.patch('/api/v1/users/updateProfile', formData)
    .then((response) => {
      const { message, userDetails } = response.data;
      dispatch(
        {
          type: actionTypes.UPDATE_USER_PROFILE,
          payload: userDetails
        }
      );

      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'UserProfile' }
      });

      Materialize.toast(message, 4000, 'grey darken-2');
    })
    .catch((error) => {
      const { message } = error.response.data;

      Materialize.toast(message, 4000, 'red');
      dispatch(
        {
          type: actionTypes.UPDATE_USER_PROFILE_ERROR
        }
      );
      dispatch({
        type: actionTypes.IS_FETCHING,
        payload: { status: false, componentName: 'UserProfile' }
      });
    });
};

export default updateProfileAction;
