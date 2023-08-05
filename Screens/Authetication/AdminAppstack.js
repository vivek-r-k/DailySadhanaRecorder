import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home_A from '../Admin/Home_A';
import Add_Delete from '../Admin/Add_Delete';

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
                  // else if (route.name === 'Mentor') {
                  //   iconName = focused ? 'md-person' : 'md-person-outline';
                  // }
                  // else if (route.name === 'Schedule') {
                  //   iconName = focused ? 'videocam' : 'videocam-outline';
                  // }
                  // // else if (route.name === 'Countdown') {
                  // //   iconName = focused ? 'md-timer' : 'md-timer-outline';
                  // // }
      
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
            name="Home_A" component={Home_A}
            />
            <Tab.Screen 
            name="Add_Delete" 
            component={Add_Delete}
            />
            {/* <Tab.Screen 
            name="Mentor" 
            component={Mentor}
            />
            <Tab.Screen 
            name="Team" component={Team}
            /> */}
            {/* <Tab.Screen 
            name="Countdown" component={Countdown} 
            // options={{
            //
            /> */}
          </Tab.Navigator>
    )
}

export default AdminAppStack;