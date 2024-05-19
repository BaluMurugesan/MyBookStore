import React, {useEffect} from 'react';
import Text from '../../../components/atoms/Text';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';

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
  return (
    <View style={styles.conatiner}>
      <GoogleSigninButton
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress()
            .then(async res => {
              await AsyncStorage.setItem('USERID', res.user.uid);
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
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
