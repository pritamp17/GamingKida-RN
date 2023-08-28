import React from 'react';
import { View, StyleSheet } from 'react-native';
import Signup from '../../components/Auth/SignUp';


const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Signup />
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

export default SignupScreen;
