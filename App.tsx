import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import MainNavigator from './navigation/MainNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { loginSuccess } from './redux/auth/authActions'; // assuming you have this action

export default function App() {
  const [isUserChecked, setUserChecked] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData != null) {
          // Parse stored json user string and set user state.
          dispatch(loginSuccess(JSON.parse(userData))); // Dispatch action to update Redux state
          setUserLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUserChecked(true); // Set this to true to render the appropriate navigator
      }
    };

    checkUser();
  }, [dispatch]);

  if (!isUserChecked) {
    // You can display a loading indicator while the app checks for the user data
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isUserLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
