import React,{useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from './SignIn'

const Stack = createNativeStackNavigator()
const AuthStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
              name='SignIn'
              component={SignIn}
              options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

export default AuthStack