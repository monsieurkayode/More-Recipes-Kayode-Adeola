import actionTypes from '../../src/actions/actionTypes';
import signupReducer from '../../src/reducers/signupReducer';

const initialState = {
  success: false
};

describe('Signup Reducer', () => {
  it('should return initial state',
    () => {
      expect(signupReducer(undefined, {})).toEqual(initialState);
    });

  it('sets success to true when action type is SIGNUP_SUCCESSFUL',
    () => {
      const action = {
        type: actionTypes.SIGNUP_SUCCESSFUL
      };
      const newState = signupReducer(initialState, action);
      expect(newState.success).toBe(true);
    });

  it('sets success to false when action type is SIGNUP_UNSUCCESSFUL',
    () => {
      const action = {
        type: actionTypes.SIGNUP_UNSUCCESSFUL
      };
      const newState = signupReducer(initialState, action);
      expect(newState.success).toBe(false);
    });

  it('sets success to false when action type is SIGNUP_VALIDATION_USER_ERROR',
    () => {
      const action = {
        type: actionTypes.SIGNUP_VALIDATION_USER_ERROR
      };
      const newState = signupReducer(initialState, action);
      expect(newState.success).toBe(false);
    });

  it('sets success to false when action type is SIGNUP_VALIDATION_EMAIL_ERROR',
    () => {
      const action = {
        type: actionTypes.SIGNUP_VALIDATION_EMAIL_ERROR
      };
      const newState = signupReducer(initialState, action);
      expect(newState.success).toBe(false);
    });
});
