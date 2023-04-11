import React from 'react';
import SignUp from './screens/SignUp';
import Questionnaire from './screens/Questionnaire';
import AppTabNavigator from './components/AppTabNavigator';
import AppDrawerNavigator from './components/AppDrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Testimonials from './screens/Testimonials';
import AboutBC from './screens/AboutBC';
import Prevention from './screens/Prevention';
import Lifestyle from './screens/Lifestyle';
import BCMen from './screens/BCMen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false
    }}>
    <Stack.Screen
      name="SignUp"
      component={SignUp}
    />
    <Stack.Screen
      name="Questionnaire"
      component={Questionnaire}
    />
  <Stack.Screen name="Drawer" component={AppDrawerNavigator} />
  
  <Stack.Screen
      name="Testimonials"
      component={Testimonials}
    />
    <Stack.Screen
      name="AboutBC"
      component={AboutBC}
    />
    <Stack.Screen
      name="Prevention"
      component={Prevention}
    />
    <Stack.Screen
      name="Lifestyle"
      component={Lifestyle}
    />
    <Stack.Screen
      name="BCMen"
      component={BCMen}
    />
  </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
    <Stack.Screen
      name="Drawer"
      component={AppDrawerNavigator}
    /> */