import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { googleSignIn } from '../../services/AuthService/google'; // Adjust the import path accordingly
import { useDispatch } from 'react-redux';
import {Login} from '../../redux/auth/authActions'

const GoogleSignInBtn = () => {
  const handleGoogleSignIn = async () => {
    const userInfo = await googleSignIn();
    if (userInfo) {
      useDispatch(Login(userInfo.user))
    }else{
      console.log("Error logging in with Google")
    }
    console.log(userInfo);
    
  };

    return (
        <TouchableOpacity style={styles.circle} onPress={onPress}>
            <GoogleSigninButton 
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleGoogleSignIn}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent white
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButton: {
        width: '80%',
        height: 48,
    },
});

export default GoogleSignInBtn;
