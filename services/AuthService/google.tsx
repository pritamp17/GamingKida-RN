import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration for Google Signin
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID',  // Your web client ID from Google Cloud Console
  offlineAccess: true,
  // You can include other configuration options if needed
});

export const googleSignIn = async () => {
  try {
    // Prompt user to sign in with Google
    const userInfo = await GoogleSignin.signIn();
    // Store user information in AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(userInfo));
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

export const isUserSignedIn = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('user');
    
    if (userInfo) {
      return userInfo;  // User has previously signed in
    } else {
      return null; // User has not signed in before
    }
  } catch (error) {
    return null;   // Error occurred, assuming user is not signed in
  }
};

