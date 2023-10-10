import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { Login } from '../../redux/auth/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUserToFirestore } from '../userService/index';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID',
  offlineAccess: true,
});

export const googleSignIn = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();

    if (userInfo) {
      await AsyncStorage.setItem('user', JSON.stringify(userInfo.user));
      const dispatch = useDispatch();

      dispatch(loginSuccess(userInfo));

      if (userInfo && userInfo.user) {
        await addUserToFirestore(userInfo.user);
      }

      return null;
    }
    return "User info could not be retrieved";
  } catch (errorr) {
    if (error.code === 'SIGN_IN_CANCELLED') {
      return "User cancelled the sign in request";
    } else if (error.code === 'IN_PROGRESS') {
      return "Sign in is in progress";
    } else {
      console.error("Error during Google sign in: ", error);
      return "Error signing in with Google";
    }
  }
};
