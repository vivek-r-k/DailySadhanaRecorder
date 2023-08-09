import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart, LineChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Octicons'; // dot-fill
import { Dimensions } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';

const SingleDateData = ({route}) => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";
    const [attendance, setAttendance] = useState("");

    // console.log("line 16:",route.params.secondYearData); 
    // console.log("line 17:",route.params.date); 

    var secondYearData = route.params.secondYearData
    var date = route.params.date

    const tableHead = ['Counselee','Attendance','Chanting', 'Hearing','Reading',];
    // second year
    const tableData1 = [];
    for (const userEmail in secondYearData) {
    const userData = secondYearData[userEmail];
    const userDataForDate = userData.Dates[date];
    if (userDataForDate) {
        const { Attendance, Chanting, Hearing, Reading } = userDataForDate;
        tableData1.push([userData.Name, Attendance, Chanting, Hearing, Reading]);
    }
    }
    // similarly TODO: add for third, fourth and passout

    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Details of {route.params.date}</Text> 
                    {/* TODO: change the date to onclicked date */}
                </View>
                <View style={styles.container1}>                 
                    <Text style={{justifyContent: 'center', alignSelf:'center', fontSize:35, color:'#000000', fontWeight:'bold', marginTop:'2%',marginBottom:'-5%'}}>
                        Second Year
                    </Text>
                    <Text style={styles.UserName}>Chanting, Hearing and Reading</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {/* TODO: Add ontouch (if necessary) */}
                        <Rows data={tableData1} textStyle={styles.text}/>
                    </Table>
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
    UserName:{
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    date: {
        margin: '5%',
        fontSize: 20,
        color: 'black'
    },
    container1: { flex: 1, padding: 16, paddingTop: 5, backgroundColor: '#fff' },
    head: { height: 70, backgroundColor: '#FFC600' },
    text: { margin: 6, textAlign: 'center', alignContent:'center',alignSelf:'center' },
    border: { borderWidth: 1, borderColor: '#000000' },
})

export default SingleDateData