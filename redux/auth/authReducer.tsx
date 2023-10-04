// reducer/authReducer.ts

import { AuthActionTypes, LOGIN_SUCCESS, LOGOUT } from '../actions/authActions';

export interface AuthState {
  userInfo: any | null; // Replace 'any' with the actual user info type
}

const initialState: AuthState = {
  userInfo: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    case LOGOUT:
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default authReducer;
