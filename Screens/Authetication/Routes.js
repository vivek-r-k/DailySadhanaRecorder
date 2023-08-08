import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import database from '@react-native-firebase/database';

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const [counsellorEmails, setCounsellorEmails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Test = database().ref('/Admin/Counsellors/');
        Test.on('value', snapshot => {
          const data = snapshot.val();
          console.log(("line 39:",data));
          const modifiedData = {};

          for (const key in data) {
            const modifiedKey = key.replace(/_/g, '.');
            modifiedData[modifiedKey] = data[key];
          }
          // console.log("line 46:",modifiedData);
          
          const emails = Object.values(data).reduce((acc, curr) => {
            if (curr.Admin !== true && curr.Email) {
              acc.push(curr.Email);
            } 
            return acc;
          }, []);
          setCounsellorEmails(emails);
          console.log("line 55:",counsellorEmails);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function

    return () => {
      const Test = database().ref('/Admin/Counsellors/');
      Test.off();
    };
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
        {/* {user ? <UserProfile /> : <AuthStack />} */}

        {/* TODO: if admin email id changes, then change here below*/}
        {(!user) ? (
        <AuthStack />
        ) : user.email === "aharsh236@gmail.com" ? (
            <AdminAppStack />
        ) : counsellorEmails.includes(user.email) ? (
            <CounAppStack />
        ) : (
          // TODO: here also check only added emails to log in because, its my bad that i didn't
          // handle backend
        <UserProfile />
        )}  

        </NavigationContainer>
  );
};

export default Routes;