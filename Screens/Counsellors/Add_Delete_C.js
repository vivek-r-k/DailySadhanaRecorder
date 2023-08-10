import React,{useState,useContext,useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { AuthContext } from "../Authetication/Authprovider";
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Add_Delete_C = ({navigation}) => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";
    const { logout } = useContext(AuthContext)
    
    // Below is for getting the name
    const currentUser = auth().currentUser;
    var modifiedEmail = currentUser.email.replace(/\./g, '_');
    const [name1,setName1] = useState('')
    useEffect(() => {
        const fetchData = async () => {
        const Test = database().ref('/Admin/Counsellors/');
        Test.on('value', snapshot => {
            const data = snapshot.val();
            // console.log("line 19:",data[modifiedEmail].Name); 
            setName1(data[modifiedEmail].Name)
        });
        };
        fetchData(); // Call the async function

        return () => {
        const Test = database().ref('/Admin/Counsellors/');
        Test.off();
        };
    }, []);


    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [batch, setBatch] = useState("");
    const handleAdd = () => {
        var modifiedEmail1 = email.replace(/\./g, '_'); 
        console.log("line 40:",modifiedEmail1);
        if(name === "" || email === "" || password === "" || batch === ""){
            Alert.alert("Please fill all the fields");
        }
        else{
        database()
          .ref(`/Counsellor1/${modifiedEmail}/${batch}/Emails/`)
          .update({
            [modifiedEmail1]: { Name: name }
          })
          .then(() => 
          {
            Alert.alert(`Name: ${name}, Email: ${email} and Password: ${password} for ${batch} is added!`)
            setName("");
            setEmail("")
            setPassword("")
            setBatch("")
          }
          );
        }     
    };

    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Counsellor: {name1}</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 30,
                        marginTop: 20,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Add New Counselee</Text>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Full Name:</Text>
                    <TextInput style={styles.input} defaultValue={name} onChangeText={(userName) => setName(userName)}/>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Batch: </Text>
                    <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={batch}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setBatch(itemValue)}
                    >
                        <Picker.Item label="Choose" value="" enabled={false}/>
                        <Picker.Item label="Second Year" value="Second_Year" />
                        <Picker.Item label="Third Year" value="Third_Year" />
                        <Picker.Item label="Fourth Year" value="Fourth_Year" />
                        <Picker.Item label="Passout" value="PassOut" />
                    </Picker>
                    </View>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Email ID: </Text>
                    <TextInput style={styles.input} defaultValue={email} autoCapitalize="none" onChangeText={(userEmail) => setEmail(userEmail)}/>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Password: </Text>
                    <TextInput style={styles.input} 
                        autoCapitalize="none"
                        onChangeText={(userPassword) => setPassword(userPassword)}
                        autoCorrect={false}
                        defaultValue={password}
                    />
                </View>
                <View style={{margin: "3%",marginBottom:'10%'}}>
                    <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>ADD</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: "3%"}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Attendance')}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Attendance</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: "3%"}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chanting')}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Chanting</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: "3%"}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Hearing')}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Hearing</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: "3%"}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reading')}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Reading</Text>
                    </TouchableOpacity>
                </View>

                <View style={{margin: "3%",marginTop:'10%'}}>
                    <TouchableOpacity style={styles.button} onPress={() => logout()}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // padding: 20,
    },
    container1: {
        flex: 1,
        // justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
        margin:'1%'
    },
    UserName:{
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 40,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    date: {
        margin: '5%',
        fontSize: 20,
        color: 'black'
    },
    data: {
        justifyContent: 'flex-start',
        fontSize: 30,
        marginLeft: '4%',
        color: 'black'
    },
    input: {
        width: "50%",
        height: 50,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      pickerContainer: {
        width: "50%",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        overflow: "hidden", // Ensure the border is visible by hiding any overflow
      },
      picker: {
        height: 50,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FFC600',
      },
    buttondate: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FF9F40',
      },
    chooseDate:{
        margin: '5%'
    }

})

export default Add_Delete_C