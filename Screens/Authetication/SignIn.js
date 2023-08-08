import React, {createContext, useContext, useState,useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';// praying-hands
import database from '@react-native-firebase/database';

import { useTheme } from 'react-native-paper';

import { AuthContext } from './Authprovider';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {login,register} = useContext(AuthContext)
    const { colors } = useTheme();
    
    const resetPassword = () => {
        if(email != null){
            auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Password reset link has been sent to your email successfully!")
            })
            .catch((error) => {
                console.log(error);
                Alert.alert(error)
            })
        }
        else{
            Alert.alert("Please enter valid email id and then try!")
        }
    }

    const [counsellorData, setCounsellorData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        const Test = database().ref('/Admin/');
        Test.on('value', snapshot => {
            const data = snapshot.val();
            const counsellors = data?.Counsellors; // Access the "Counsellors" object
            // console.log("line 53: ",counsellors);

            const modifiedData = {};
            for (const key in counsellors) {
                const modifiedKey = key.replace(/_/g, '.');
                modifiedData[modifiedKey] = counsellors[key];
              }
              
            //   console.log("line 61:",modifiedData);
            // Check if the "Counsellors" object exists
            if (counsellors) {
            setCounsellorData(modifiedData); // Update the state with the "Counsellors" object
            }
            // console.log("line 66:",counsellorData)
        });
        };
        fetchData(); // Call the async function

        return () => {
        const Test = database().ref('/Admin/');
        Test.off();
        };
    }, []);

    // TODO: if any login or signup issues then the code is here
    const handleLogIn = (email, password) => {
        // Loop through the counsellorData object
        for (const counselorName in counsellorData) {
          if (
            counsellorData[counselorName].Email === email &&
            counsellorData[counselorName].Password === password
          ) {
            try {
              register(email, password);
              return;
            } catch (error) {
              console.error("Error occurred during registration:", error);
              return;
            }
          }
        }
        login(email,password)
        // console.log("Invalid email or password");
      };

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Hare Krishna <FontAwesome5 name={"praying-hands"} size={30} color={"#ffffff"} /></Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email id</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Registered mail id"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(userEmail) => setEmail(userEmail)}
                />
            </View>
            
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(userPassword) => setPassword(userPassword)}
                />
            </View>
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => handleLogIn(email,password)}
                    
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signIn}
                    onPress={resetPassword}
                >
                    <Text style={styles.textSign}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignIn;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        alignItems:'center'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });