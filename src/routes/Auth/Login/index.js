import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '262435857974-77adnk4ec16r5hdfe3peup0n6bmfp7u2.apps.googleusercontent.com',
});
const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log(statusCodes.SIGN_IN_CANCELLED);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log(statusCodes.IN_PROGRESS);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE);
    } else {
      // some other error happened
      console.log(error.message, 'error');
    }
  }
};

const Login = ({navigation}) => {
  const {width} = useWindowDimensions();
  const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    images: {
      height: width,
      aspectRatio: 1 / 1,
    },
    btn: {
      width: width - 50,
    },
  });
  return (
    <View style={styles.conatiner}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/click-here-concept-illustration_114360-4030.jpg?t=st=1716097798~exp=1716101398~hmac=188a2821fd44b3ec30e823deaad8294edc9831fe91624801542e24e24af3c3b0&w=740',
        }}
        style={styles.images}
      />
      <GoogleSigninButton
        style={styles.btn}
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress()
            .then(async res => {
              await AsyncStorage.setItem('USERID', res.user.uid);
              await AsyncStorage.setItem('NAME', res.user.displayName);
              await AsyncStorage.setItem('PROFILE', res.user.photoURL);
              navigation.navigate('HomeStack');
            })
            .catch(error => {
              console.log(error, 'error');
            })
        }
      />
    </View>
  );
};

export default Login;
