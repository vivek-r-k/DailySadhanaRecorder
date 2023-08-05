import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './Authprovider';

import AuthStack from './AuthStack';
import Home_A from '../Admin/Home_A';
import Add_Delete from '../Admin/Add_Delete';
import Home_C from '../Counsellors/Home_C';
import Attendance_Details from '../Counsellors/Attendance_Details';
import Datewise from '../Counsellors/Datewise';
import UserProfile from '../Counselees/UserProfile';
import AdminAppStack from './AdminAppstack';
import CounAppStack from './CounAppstack';
// import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const CounsellorEmails = ["vivekanandrkumachagi@gmail.com", "vivekanandrk2001@gmail.com"] 

  return (
    <NavigationContainer>
        {/* {user ? <UserProfile /> : <AuthStack />} */}

        {/* TODO: if admin email id changes, then change here below*/}
        {(!user) ? (
        <AuthStack />
        ) : user.email === "aharsh236@gmail.com" ? (
        // TODO: create app stack for admin separately
            <AdminAppStack />
        ) : CounsellorEmails.includes(user.email) ? (
            <CounAppStack />
        ) : (
        <UserProfile />
        )}  

        </NavigationContainer>
  );
};

export default Routes;