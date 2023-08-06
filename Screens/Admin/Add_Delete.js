import React,{useState,useContext, useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../Authetication/Authprovider";
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';

const Add_Delete = ({navigation}) => {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {register,logout} = useContext(AuthContext)

    const handleAdd = () => {
        if(name === "" || email === "" || password === ""){
            Alert.alert("Please fill all the fields");
        }
        else{
        database()
          .ref('/Admin/Counsellors')
          .update({
            [name]: { Email: email, Password: password }
          })
          .then(() => 
          {
            Alert.alert(`Name: ${name}, Email: ${email} and Password: ${password} is added!`)
            setName("");
            setEmail("")
            setPassword("")
          }
          );
        }     
    };

    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Admin</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 30,
                        marginTop: 20,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Add New Counsellor</Text>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Full Name:</Text>
                    <TextInput style={styles.input} defaultValue={name} onChangeText={(userName) => setName(userName)}/>
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
                <View style={{margin: "3%"}}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => handleAdd()}
                    >
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>ADD</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: "3%"}}>
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
        fontSize: 50,
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

export default Add_Delete