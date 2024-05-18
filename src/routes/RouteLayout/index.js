import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../Auth/Login';
import {HomeStack} from '../HomeStack';

const RouteLayout = ({token = ''}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={token}
      // initialRouteName={'BottomStack'}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          flex: 1,
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default RouteLayout;
