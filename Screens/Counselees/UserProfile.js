import React,{useState,useContext} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from "react-native";
import { AuthContext } from "../Authetication/Authprovider";
import LinearGradient from "react-native-linear-gradient";

const UserProfile = () => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";
    const [attendance, setAttendance] = useState("");
    const { logout } = useContext(AuthContext)

    // dummy data for piechart
    const data = [
        {
          name: "Present",
          total: 25,
          color: "green",
          legendFontColor: "#000000",
          legendFontSize: 15
        },
        {
          name: "Absent",
          total: 3,
          color: "red",
          legendFontColor: "#000000",
          legendFontSize: 15
        },
        {
          name: "Late",
          total: 2,
          color: "yellow",
          legendFontColor: "#000000",
          legendFontSize: 15
        }
    ]

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const screenWidth = Dimensions.get("window").width;

    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>ABC</Text>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Date: </Text>
                    <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={attendance}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setAttendance(itemValue)}
                    >
                        <Picker.Item label="Today's" value="Present" /> 
                        {/*TODO: Change the value */}
                        <Picker.Item label="Yesterday's" value="Absent" />
                    </Picker>
                    </View>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Reading (in min):</Text>
                    <TextInput style={styles.input} placeholder="eg: 180" keyboardType="numeric"/>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Hearing (in min): </Text>
                    <TextInput style={styles.input} placeholder="eg: 180" keyboardType="numeric"/>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Chanting done at: </Text>
                    <TextInput style={styles.input} placeholder="eg: 15:20"/>
                    <TouchableOpacity onPress={() => alert("If chanting completed after 23:59 i.e on next day, please fill 23:59 only.")}>
                        <Text><Icon name="information-circle-outline" size={30} color="#900" /></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Attendance: </Text>
                    <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={attendance}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setAttendance(itemValue)}
                    >
                        <Picker.Item label="Present" value="Present" />
                        <Picker.Item label="Absent" value="Absent" />
                        <Picker.Item label="Late" value="Late" />
                    </Picker>
                    </View>
                    <TouchableOpacity onPress={() => alert("If present in all three (chanting, mangal aarti and class) at time then only select present. If absent in any one or two or all of three, select absent.")}>
                        <Text><Icon name="information-circle-outline" size={30} color="#900" /></Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: "3%"}}>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Submit</Text>
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
        margin:'2%'
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
        width: "30%",
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
        height: 20,
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

})

export default UserProfile