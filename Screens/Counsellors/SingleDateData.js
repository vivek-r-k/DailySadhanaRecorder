import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart, LineChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Octicons'; // dot-fill
import { Dimensions } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const SingleDateData = () => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";
    const [attendance, setAttendance] = useState("");

    const greenDot = <Icon name="dot-fill" size={18} color="green" />;
    const redDot = <Icon name="dot-fill" size={18} color="red" />;
    const yellowDot = <Icon name="dot-fill" size={18} color="yellow" />;

    // second year
    const tableHead2 = ['Counselee','Attendance','Chanting', 'Hearing','Reading',];
    const tableData2 = [
        ['John','Present', '15:30', 130, 130],
        ['Wick','Absent', '20:50', 240, 130],
        ['Cena','Absent', '16:05', 130, 240],
        ['John','Present', '12:45', 240, 130],
        ['Wick','Present', '09:45', 240, 130],
        ['Cena','Late', '13:40', 240, 130],
    ];

    // similarly TODO: add for third, fourth and passout

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Details of 30/07/2023</Text> 
                    {/* TODO: change the date to onclicked date */}
                </View>
                <View style={styles.container1}>                 
                    <Text style={{justifyContent: 'center', alignSelf:'center', fontSize:35, color:'#000000', fontWeight:'bold', marginTop:'2%',marginBottom:'-5%'}}>
                        Second Year
                    </Text>
                    <Text style={styles.UserName}>Chanting, Hearing and Reading</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead2} style={styles.head} textStyle={styles.text}/>
                        {/* TODO: Add ontouch (if necessary) */}
                        <Rows data={tableData2} textStyle={styles.text}/>
                    </Table>
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