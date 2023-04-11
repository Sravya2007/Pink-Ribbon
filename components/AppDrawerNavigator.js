import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import AppTabNavigator from './AppTabNavigator';
import About from '../screens/About';
import { RFValue } from 'react-native-responsive-fontsize';

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator navigation={navigation}
    screenOptions={{
      headerShown: false,
      drawerActiveTintColor: '#a60545',
      drawerInactiveTintColor: '#967BB6',
      drawerStyle: {
        backgroundColor: '#d8c3d1'
      },
      drawerLabelStyle: {
        fontSize: RFValue(18)
      },
      drawerItemStyle: {
        paddingVertical: RFValue(10)
      }
    }}>
    <Drawer.Screen name="Home" component={AppTabNavigator} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigator;