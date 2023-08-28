import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from '../../components/Auth/Login';


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
  },
});

export default LoginScreen;
