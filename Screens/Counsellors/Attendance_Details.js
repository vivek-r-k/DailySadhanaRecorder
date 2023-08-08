import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart, LineChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Octicons'; // dot-fill
import { Dimensions } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import LinearGradient from "react-native-linear-gradient";

const Attendance_Details = ({route}) => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";

    // console.log("in",route.params.name);
    // console.log("line 23:",route.params.attendance);
    // console.log("line 27:",attendance);
    // console.log("line 25:",route.params.data);
    // console.log("line 27:",route.params.dates);

    const tableHead = ['Date','Attendance'];
    const tableData = route.params.dates.map((date, index) => [date, route.params.attendance[index]]);

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
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>{route.params.name}</Text>
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
                        data={route.params.data}
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
                
                {/* <View style={styles.container1}>                  */}
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {/* TODO: Add ontouch (if necessary) */}
                        <Rows data={tableData} textStyle={styles.text}/>
                    </Table>
                {/* </View> */}
    
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