import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import RouteLayout from './src/routes/RouteLayout';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  const [token, setToken] = useState('HomeStack');

  return (
    <NavigationContainer>
    <SafeAreaView
      style={Styles.container}>
        <StatusBar />
        <PaperProvider>
          {!!token && <RouteLayout token={token} />}
          </PaperProvider>
    </SafeAreaView>
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
