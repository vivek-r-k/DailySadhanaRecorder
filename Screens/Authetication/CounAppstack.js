import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home_C from '../Counsellors/Home_C';
import Details_of_Counselee from '../Counsellors/Details_of_Counselee';
import Attendance_Details from '../Counsellors/Attendance_Details';

import Datewise from '../Counsellors/Datewise';
import SingleDateData from '../Counsellors/SingleDateData';

import Add_Delete_C from '../Counsellors/Add_Delete_C';

const CounAppStack = () => {
    return(
        <Tab.Navigator initialRouteName='Home_C' 
        screenOptions = {
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home_C') {
                    iconName = focused ? 'home-circle' : 'home-circle-outline';
                  } 
                  else if (route.name === 'Datewise') {
                    iconName = focused ? 'calendar-account' : 'calendar-account-outline';
                  }
                  else if (route.name === 'Add_Delete_C') {
                    iconName = focused ? 'account-multiple-plus' : 'account-multiple-plus-outline';
                  }
                  // You can return any component that you like here!
                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#171F1D',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false, 
                headerShown: false,
              })
        }>
            <Tab.Screen 
            name="Home_C" component={Home_C}
            />
            <Tab.Screen 
            name="Datewise" 
            component={Datewise}
            />
            <Tab.Screen 
            name="Add_Delete_C" 
            component={Add_Delete_C}
            />
          </Tab.Navigator>
    )
}

export default CounAppStack;