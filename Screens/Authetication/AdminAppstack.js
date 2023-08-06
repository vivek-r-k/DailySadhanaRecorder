import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createNativeStackNavigator} from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import Home_A from '../Admin/Home_A';
import Add_Delete from '../Admin/Add_Delete';

const ADD = () => {
  return(
      <Stack.Navigator>
          <Stack.Screen 
              name="Add_Delete"
              component={Add_Delete}
            options={{headerShown:false}}
          />
          <Stack.Screen
              name="Home_A"
              component={Home_A}
            options={{headerShown:false}}
          />
      </Stack.Navigator>
  )
}

const AdminAppStack = () => {
    return(
        <Tab.Navigator initialRouteName='Home_A' 
        screenOptions = {
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home_A') {
                    iconName = focused ? 'home-circle' : 'home-circle-outline';
                  } 
                  else if (route.name === 'Add_Delete') {
                    iconName = focused ? 'account-multiple-plus' : 'account-multiple-plus-outline';
                  }
                  // You can return any component that you like here!
                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#ffffff',
                tabBarShowLabel: false, 
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: '#2596be', // Add your desired background color here
                },
              })
        }
        >
            <Tab.Screen 
            name="Home_A" component={Home_A}
            />
            <Tab.Screen 
            name="Add_Delete" 
            component={ADD}
            />
          </Tab.Navigator>
    )
}

export default AdminAppStack;