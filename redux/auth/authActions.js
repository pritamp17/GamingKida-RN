// action/authActions.js

export const LOGIN = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const Login = (user) => ({
  type: LOGIN,
  payload: {
    user,
  },
});

export const Logout = () => ({
  type: LOGOUT,
});
