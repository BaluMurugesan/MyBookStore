import React from 'react';
import Text from '../../components/atoms/Text';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../pages/Home';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchBook from '../../pages/SearchBook';
import Favorite from '../../pages/Favorite';

export const HomeStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: '#f2eae0',
        flex: 1,
      }}
      screenOptions={props => ({
        headerShown: true,
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 20,
          backgroundColor: '#fbf8f6',
          borderTopColor: '#00000020',
        },
      })}
      backBehavior="history">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <>
                <Icon
                  name="home"
                  size={25}
                  color={focused ? '#ed5f64' : 'gray'}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchBook"
        component={SearchBook}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <>
                <Icon
                  name="search1"
                  size={25}
                  color={focused ? '#ed5f64' : 'gray'}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <>
                <Icon
                  name="staro"
                  size={25}
                  color={focused ? '#ed5f64' : 'gray'}
                />
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
