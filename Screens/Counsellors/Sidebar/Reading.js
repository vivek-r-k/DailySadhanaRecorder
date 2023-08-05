import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart, LineChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Octicons'; // dot-fill
import { Dimensions } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const Reading = () => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    };

    const getLast30Days = () => {
      const today = new Date();
      const last30Days = [];
  
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = formatDate(date);
        last30Days.push(formattedDate);
      }
  
      return last30Days;
    };

    // TODO:
    // After last 30 day column, there will be two columns which will show average and total reading
    // second year
    const tableHead1 = ['Counselee  ', ...getLast30Days()];
    const tableData1 = [
        ['John', '15:10', '15:10', '15:10','15:10', '15:10', '15:10','15:10', '15:10', '15:10','15:10', '15:10', '15:10','15:10', '15:10', '15:10','15:10', '15:10', '15:10','15:10', '15:10', '15:10','15:10', '15:10', '15:10','15:10', '15:10', '15:10','15:10', '15:10', '15:10'],
        ['Wick', '', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
        ['Cena', '', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
        ['John', '', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
        ['Wick', '', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
        ['Cena', '', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', '','', '', ''],
    ];

    // similarly TODO: add for third, fourth and passout

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Reading details</Text>
                </View>
                <View style={styles.container1}>                 
                    <Text style={{justifyContent: 'center', alignSelf:'center', fontSize:35, color:'#000000', fontWeight:'bold', marginTop:'2%',marginBottom:'5%'}}>
                        Second Year
                    </Text>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={styles.border}>
                                <Row data={tableHead1} style={styles.head} textStyle={styles.text}/>
                                {/* TODO: Add ontouch (if necessary) */}
                                <Rows data={tableData1} textStyle={styles.text}/>
                            </Table>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.container1}>                 
                    <Text style={{justifyContent: 'center', alignSelf:'center', fontSize:35, color:'#000000', fontWeight:'bold', marginTop:'2%',marginBottom:'5%'}}>
                        Third Year
                    </Text>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={styles.border}>
                                <Row data={tableHead1} style={styles.head} textStyle={styles.text}/>
                                {/* TODO: Add ontouch (if necessary) */}
                                <Rows data={tableData1} textStyle={styles.text}/>
                            </Table>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.container1}>                 
                    <Text style={{justifyContent: 'center', alignSelf:'center', fontSize:35, color:'#000000', fontWeight:'bold', marginTop:'2%',marginBottom:'5%'}}>
                        Fourth Year
                    </Text>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={styles.border}>
                                <Row data={tableHead1} style={styles.head} textStyle={styles.text}/>
                                {/* TODO: Add ontouch (if necessary) */}
                                <Rows data={tableData1} textStyle={styles.text}/>
                            </Table>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.container1}>                 
                    <Text style={{justifyContent: 'center', alignSelf:'center', fontSize:35, color:'#000000', fontWeight:'bold', marginTop:'2%',marginBottom:'5%'}}>
                        Passout
                    </Text>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={styles.border}>
                                <Row data={tableHead1} style={styles.head} textStyle={styles.text}/>
                                {/* TODO: Add ontouch (if necessary) */}
                                <Rows data={tableData1} textStyle={styles.text}/>
                            </Table>
                        </View>
                    </ScrollView>
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
        fontSize: 40,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    UserName1:{
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
    container1: { flex: 1, padding: 8, paddingTop: 25, backgroundColor: '#fff' },
    head: { height: 70, backgroundColor: '#FFC600' },
    text: { margin: 6, textAlign: 'center', alignContent:'center',alignSelf:'center' },
    border: { borderWidth: 1, borderColor: '#000000' },
})

export default Reading