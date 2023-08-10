import React from 'react'

import Home_C from '../Counsellors/Home_C';
import Details_of_Counselee from '../Counsellors/Details_of_Counselee';
import Attendance_Details from '../Counsellors/Attendance_Details';

import Datewise from '../Counsellors/Datewise';
import SingleDateData from '../Counsellors/SingleDateData';

import Add_Delete_C from '../Counsellors/Add_Delete_C';

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Attendance from '../Counsellors/Sidebar/Attendance';
import Chanting from '../Counsellors/Sidebar/Chanting';
import Reading from '../Counsellors/Sidebar/Reading';
import Hearing from '../Counsellors/Sidebar/Hearing';
const Stack = createNativeStackNavigator();

const Home_C_Navigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Home_C"
                component={Home_C}
              options={{headerShown:false}}
            />
            <Stack.Screen
                name="Details_of_Counselee"
                component={Details_of_Counselee}
              options={{headerShown:false}}
            />
            <Stack.Screen
                name="Attendance_Details"
                component={Attendance_Details}
              options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}
export {Home_C_Navigator}

const Calendar = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Datewise"
                component={Datewise}
              options={{headerShown:false}}
            />
            <Stack.Screen
                name="SingleDateData"
                component={SingleDateData}
              options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}
export {Calendar}

const Profile = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Add_Delete_C"
                component={Add_Delete_C}
              options={{headerShown:false}}
            />
            
            <Stack.Screen
                name="Attendance"
                component={Attendance}
              options={{headerShown:false}}
            />
            <Stack.Screen
                name="Chanting"
                component={Chanting}
              options={{headerShown:false}}
            />
            <Stack.Screen
                name="Hearing"
                component={Hearing}
              options={{headerShown:false}}
            />
            <Stack.Screen
                name="Reading"
                component={Reading}
              options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}
export {Profile}