import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../Auth/Login';
import {HomeStack} from '../HomeStack';
import ViewBook from '../../pages/ViewBook';

const RouteLayout = ({token}) => {
  console.log(token, 'tokentokentokentoken');
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={token}
      // initialRouteName={'HomeStack'}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          flex: 1,
          backgroundColor: '#f2eae0',
        },
      }}>
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ViewBook" component={ViewBook} />
    </Stack.Navigator>
  );
};

export default RouteLayout;
