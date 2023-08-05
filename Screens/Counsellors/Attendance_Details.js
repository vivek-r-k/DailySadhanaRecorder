import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart, LineChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Octicons'; // dot-fill
import { Dimensions } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const Attendance_Details = () => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";
    const [attendance, setAttendance] = useState("");

    const greenDot = <Icon name="dot-fill" size={18} color="green" />;
    const redDot = <Icon name="dot-fill" size={18} color="red" />;
    const yellowDot = <Icon name="dot-fill" size={18} color="yellow" />;

    const tableHead = ['Date','Attendance'];
    const tableData = [
        ['30/07/23', 'Present'],
        ['29/07/23', 'Absent'],
        ['28/07/23', 'Late'],
    ];

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
        backgroundGradientFrom: "#000000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    
    const screenWidth = Dimensions.get("window").width;

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>ABC</Text>
                </View>

                <View>
                    <Text 
                    style={{
                        justifyContent:'center', 
                        flex:1,
                        fontSize:20,
                        alignSelf:'center',
                        fontWeight:"bold",
                        color:'#000000'
                    }}>Last 30 days attendance</Text>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={240}
                        chartConfig={chartConfig}
                        accessor={"total"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[30,5]}
                        absolute
                    />
                </View>
                <View style={styles.container1}>                 
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {/* TODO: Add ontouch (if necessary) */}
                        <Rows data={tableData} textStyle={styles.text}/>
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
    container1: { flex: 1, padding: 16, paddingTop: 5, backgroundColor: '#fff' },
    head: { height: 70, backgroundColor: '#FFC600' },
    text: { margin: 6, textAlign: 'center', alignContent:'center',alignSelf:'center' },
    border: { borderWidth: 1, borderColor: '#000000' },
})

export default Attendance_Details