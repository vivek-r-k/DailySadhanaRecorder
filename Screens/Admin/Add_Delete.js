import React,{useState,useContext} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import { AuthContext } from "../Authetication/Authprovider";

const Add_Delete = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {register,logout} = useContext(AuthContext)

    return(
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
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Email ID: </Text>
                    <TextInput style={styles.input} onChangeText={(userEmail) => setEmail(userEmail)}/>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Password: </Text>
                    <TextInput style={styles.input} 
                        autoCapitalize="none"
                        onChangeText={(userPassword) => setPassword(userPassword)}
                        autoCorrect={false}
                    />
                </View>
                <View style={{margin: "3%"}}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => register(email, password)}
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