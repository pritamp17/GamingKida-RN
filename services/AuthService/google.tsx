import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Dispatch } from 'redux';
import { loginSuccess } from '../actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID',
  offlineAccess: true,
});

export const googleSignIn = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();
    await AsyncStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(loginSuccess(userInfo));
    return userInfo;
  } catch (error) {
    if (error.code === 'SIGN_IN_CANCELLED') {
      return "User cancelled the sign in request";
    } else if (error.code === 'IN_PROGRESS') {
      return "Sign in is in progress";
    } else {
      return "Error signing in with Google";
    }
  }
};

