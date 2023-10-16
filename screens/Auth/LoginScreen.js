import React from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
} from 'react-native';
import GoogleSignInBtn from '../../components/Auth/GoogleLoginButton';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    return (
        <ImageBackground source={require('./assets/your_background_image.png')} style={styles.background}>
            <View style={styles.container}>
                <GoogleSignInBtn/>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: height,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
