import { googleSignIn } from "./google";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isUserSignedIn = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('user');
    if (userInfo) {
      return JSON.parse(userInfo);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  try {
    // Clear user information from AsyncStorage
    await AsyncStorage.removeItem('user');
    return true;  // Successfully logged out
  } catch (error) {
    console.error("Error signing out: ", error);
    return false;  // Error logging out
  }
};

export default { googleSignIn, isUserSignedIn, logout };
