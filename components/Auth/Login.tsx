import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { googleSignIn } from '../../services/googleAuthService'; // Adjust the import path accordingly

const { width } = Dimensions.get('window');

const Login = () => {

  const handleGoogleSignIn = async () => {
    const userInfo = await googleSignIn();
    console.log(userInfo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.buttonContainer}>
        <GoogleSigninButton
          style={{ width: width * 0.8, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
});

export default Login;
