import actionTypes from '../../src/actions/actionTypes';
import signinReducer from '../../src/reducers/signinReducer';

const initialState = {
  success: false,
  isAuthenticated: false,
  user: {}
};

describe('Signin Reducer', () => {
  it('should return initial state',
    () => {
      expect(signinReducer(undefined, {})).toEqual(initialState);
    });

  it('sets success to true when action type is SIGNIN_SUCCESSFUL and sets ' +
  'user details to the store',
  () => {
    const action = {
      type: actionTypes.SIGNIN_SUCCESSFUL,
      payload: {
        id: 1,
        username: 'username'
      }
    };
    const newState = signinReducer(initialState, action);
    expect(newState.success).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user.username).toBe('username');
  });

  it('sets success to true when action type is SIGNUP_SUCCESSFUL and sets ' +
  'user details to the store',
  () => {
    const action = {
      type: actionTypes.SIGNUP_SUCCESSFUL,
      payload: {
        id: 1,
        username: 'username'
      }
    };
    const newState = signinReducer(initialState, action);
    expect(newState.success).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user.username).toBe('username');
  });

  it('sets success to true when action type is SET_CURRENT_USER and sets ' +
  'user details to the store',
  () => {
    const action = {
      type: actionTypes.SET_CURRENT_USER,
      payload: {
        id: 1,
        username: 'username'
      }
    };
    const newState = signinReducer(initialState, action);
    expect(newState.success).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user.username).toBe('username');
  });

  it('should return the initial state when action type is SIGNIN_UNSUCCESSFUL',
    () => {
      const action = {
        type: actionTypes.SIGNIN_UNSUCCESSFUL,
        payload: {}
      };
      const newState = signinReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });

  it('should return the initial state when action type is ' +
  'SIGNIN_AUTHENTICATION_ERROR',
  () => {
    const action = {
      type: actionTypes.SIGNIN_AUTHENTICATION_ERROR,
      payload: {}
    };
    const newState = signinReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should return the initial state when action type is LOGOUT_USER',
    () => {
      const action = {
        type: actionTypes.LOGOUT_USER,
        payload: {}
      };
      const newState = signinReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });
});
