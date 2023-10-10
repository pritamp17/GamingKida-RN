import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import GoogleLoginButton from '../../components/Auth/GoogleLoginButton';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <GoogleLoginButton />
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
