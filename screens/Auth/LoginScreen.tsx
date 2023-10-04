import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import googleLoginButton from '../../components/Auth/googleLoginButton';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <googleLoginButton />
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
