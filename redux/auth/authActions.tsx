// action/authActions.ts

import { Action } from 'redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export interface LoginSuccessAction extends Action {
  type: typeof LOGIN_SUCCESS;
  payload: {
    userInfo: any; // Replace 'any' with the actual user info type
  };
}

export interface LogoutAction extends Action {
  type: typeof LOGOUT;
}

export const loginSuccess = (user: any): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
  },
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

// Export all action types as AuthActionTypes
export type AuthActionTypes = LoginSuccessAction | LogoutAction;
