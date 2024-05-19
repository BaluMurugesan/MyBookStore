import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import RouteLayout from './src/routes/RouteLayout';
import {PaperProvider} from 'react-native-paper';
import {ArrayProvider} from './src/context/ArrayContext';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [token, setToken] = useState('');
  function onAuthStateChanged(user) {
    console.log(user, 'UserId');
    if (user) {
      setToken('HomeStack');
    } else {
      setToken('Login');
    }
  }
  useEffect(() => {
    console.log('calledFrom APA');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <ArrayProvider>
        <SafeAreaView style={Styles.container}>
          <StatusBar />
          <PaperProvider>
            {!!token && <RouteLayout token={token} />}
          </PaperProvider>
        </SafeAreaView>
      </ArrayProvider>
    </NavigationContainer>
  );
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2eae0',
  },
});

export default App;
