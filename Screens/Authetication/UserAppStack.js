import React,{useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserProfile from '../Counselees/UserProfile'
import BatchDetails from '../Counselees/BatchDetails'
import DetailsOfIndi from '../Counselees/DetailsOfIndi'
import Attendance_Details from '../Counsellors/Attendance_Details'

const Stack = createNativeStackNavigator()
const AuthStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
              name='UserProfile'
              component={UserProfile}
              options={{headerShown:false}}
            />
            <Stack.Screen 
              name='BatchDetails'
              component={BatchDetails}
              options={{headerShown:false}}
            />
            <Stack.Screen 
              name='DetailsOfIndi'
              component={DetailsOfIndi}
              options={{headerShown:false}}
            />
            <Stack.Screen 
              name='Attendance_Details'
              component={Attendance_Details}
              options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

export default AuthStack