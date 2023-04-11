import React from 'react';
import Screening from '../screens/Screening';
import Home from '../screens/Home';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyHeader from '../components/MyHeader';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppTabNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#d8c3d1",
            tabBarStyle: {
              backgroundColor: '#a60545'
            }
          }}>
          <Tab.Screen name="Home" component={Home}
          options={{ 
            header: (props) => <MyHeader {...props}/>,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            )
         }}
          />
          <Tab.Screen name="Screening" component={Screening}
          options={{ header: (props) => (<MyHeader {...props}/>),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          )
        }}
           />
        </Tab.Navigator>
      );
}

export default AppTabNavigator;