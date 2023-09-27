import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Login from '../../components/Auth/Login';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
});

export default LoginScreen;
