// After last 30 day column, there will be two columns which will show average and total hearing

import React,{useState,useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart, LineChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Octicons'; // dot-fill
import { Dimensions } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import LinearGradient from "react-native-linear-gradient";

const Hearing = () => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}-${month}-${year}`;
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

    const currentUser = auth().currentUser;
    var modifiedEmail = currentUser.email.replace(/\./g, '_');

    const [tableHead,setTableHead] = useState(['Counselee',...getLast30Days(),'Total Hearing','Average Hearing'])
    // Second Year
    const [tableData,setTableData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Second_Year/Emails/`);
          await Test.on('value', snapshot => {
            const data = snapshot.val();
            const dates = getLast30Days();
            console.log("line 51:",data);
            const tableData15 = [];

            // Iterate through each user in the "data" object
            for (const email in data) {
            const user = data[email];
            const userData = [user.Name];

            // Iterate through each date in the "dates" array
            for (const date of dates) {
                const formattedDate = date.split('/').reverse().join('-'); // Convert to "dd-mm-yyyy" format
                const hearingValue = user.Dates && user.Dates[formattedDate] ? user.Dates[formattedDate].Hearing : null;
                userData.push(hearingValue);
            }

            tableData15.push(userData);
            }

            console.log("tableData15:",tableData15);
            const updatedTableData15 = tableData15.map(userArray => {
                const userName = userArray[0];
                const hearingValues = userArray.slice(1).map(value => parseFloat(value) || 0);
              
                const totalHearing = hearingValues.reduce((total, value) => total + value, 0);
                const averageHearing = (totalHearing / (hearingValues.length || 1)).toFixed(2);
              
                return [...userArray, totalHearing, averageHearing];
              });
              
              console.log("updatedTableData15:",updatedTableData15);
              setTableData(updatedTableData15)
          });
        };
    
        fetchData();
    
        return () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Second_Year/Emails/`);
          Test.off();
        };
    }, []);

    // Third Year
    const [tableData1,setTableData1] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Third_Year/Emails/`);
          await Test.on('value', snapshot => {
            const data = snapshot.val();
            const dates = getLast30Days();
            console.log("line 51:",data);
            const tableData15 = [];

            // Iterate through each user in the "data" object
            for (const email in data) {
            const user = data[email];
            const userData = [user.Name];

            // Iterate through each date in the "dates" array
            for (const date of dates) {
                const formattedDate = date.split('/').reverse().join('-'); // Convert to "dd-mm-yyyy" format
                const hearingValue = user.Dates && user.Dates[formattedDate] ? user.Dates[formattedDate].Hearing : null;
                userData.push(hearingValue);
            }

            tableData15.push(userData);
            }

            console.log("tableData15:",tableData15);
            const updatedTableData15 = tableData15.map(userArray => {
                const userName = userArray[0];
                const hearingValues = userArray.slice(1).map(value => parseFloat(value) || 0);
              
                const totalHearing = hearingValues.reduce((total, value) => total + value, 0);
                const averageHearing = (totalHearing / (hearingValues.length || 1)).toFixed(2);
              
                return [...userArray, totalHearing, averageHearing];
              });
              
              console.log("updatedTableData15:",updatedTableData15);
              setTableData1(updatedTableData15)
          });
        };
    
        fetchData();
    
        return () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Third_Year/Emails/`);
          Test.off();
        };
    }, []);

    // Fourth Year
    const [tableData2,setTableData2] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Fourth_Year/Emails/`);
          await Test.on('value', snapshot => {
            const data = snapshot.val();
            const dates = getLast30Days();
            console.log("line 51:",data);
            const tableData15 = [];

            // Iterate through each user in the "data" object
            for (const email in data) {
            const user = data[email];
            const userData = [user.Name];

            // Iterate through each date in the "dates" array
            for (const date of dates) {
                const formattedDate = date.split('/').reverse().join('-'); // Convert to "dd-mm-yyyy" format
                const hearingValue = user.Dates && user.Dates[formattedDate] ? user.Dates[formattedDate].Hearing : null;
                userData.push(hearingValue);
            }

            tableData15.push(userData);
            }

            console.log("tableData15:",tableData15);
            const updatedTableData15 = tableData15.map(userArray => {
                const userName = userArray[0];
                const hearingValues = userArray.slice(1).map(value => parseFloat(value) || 0);
              
                const totalHearing = hearingValues.reduce((total, value) => total + value, 0);
                const averageHearing = (totalHearing / (hearingValues.length || 1)).toFixed(2);
              
                return [...userArray, totalHearing, averageHearing];
              });
              
              console.log("updatedTableData15:",updatedTableData15);
              setTableData2(updatedTableData15)
          });
        };
    
        fetchData();
    
        return () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Fourth_Year/Emails/`);
          Test.off();
        };
    }, []);

    // Pass out
    const [tableData3,setTableData3] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/PassOut/Emails/`);
          await Test.on('value', snapshot => {
            const data = snapshot.val();
            const dates = getLast30Days();
            console.log("line 51:",data);
            const tableData15 = [];

            // Iterate through each user in the "data" object
            for (const email in data) {
            const user = data[email];
            const userData = [user.Name];

            // Iterate through each date in the "dates" array
            for (const date of dates) {
                const formattedDate = date.split('/').reverse().join('-'); // Convert to "dd-mm-yyyy" format
                const hearingValue = user.Dates && user.Dates[formattedDate] ? user.Dates[formattedDate].Hearing : null;
                userData.push(hearingValue);
            }

            tableData15.push(userData);
            }

            console.log("tableData15:",tableData15);
            const updatedTableData15 = tableData15.map(userArray => {
                const userName = userArray[0];
                const hearingValues = userArray.slice(1).map(value => parseFloat(value) || 0);
              
                const totalHearing = hearingValues.reduce((total, value) => total + value, 0);
                const averageHearing = (totalHearing / (hearingValues.length || 1)).toFixed(2);
              
                return [...userArray, totalHearing, averageHearing];
              });
              
              console.log("updatedTableData15:",updatedTableData15);
              setTableData3(updatedTableData15)
          });
        };
    
        fetchData();
    
        return () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/PassOut/Emails/`);
          Test.off();
        };
    }, []);

    const widthArr = new Array(tableHead.length).fill(100);
    
    return(
      <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Hearing details</Text>
                </View>
                <View style={styles.container1}>                 
                    <Text style={{justifyContent: 'center', alignSelf:'center', fontSize:35, color:'#000000', fontWeight:'bold', marginTop:'2%',marginBottom:'5%'}}>
                        Second Year
                    </Text>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={styles.border}>
                            <Row
                                data={tableHead}
                                style={styles.head}
                                textStyle={styles.text}
                                widthArr={widthArr}
                            />
                            {tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    textStyle={styles.text}
                                    widthArr={widthArr}
                                />
                            ))}
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
                                <Row
                                data={tableHead}
                                style={styles.head}
                                textStyle={styles.text}
                                widthArr={widthArr}
                            />
                            {tableData1.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    textStyle={styles.text}
                                    widthArr={widthArr}
                                />
                            ))}
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
                            <Row
                                data={tableHead}
                                style={styles.head}
                                textStyle={styles.text}
                                widthArr={widthArr}
                            />
                            {tableData2.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    textStyle={styles.text}
                                    widthArr={widthArr}
                                />
                            ))}
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
                            <Row
                                data={tableHead}
                                style={styles.head}
                                textStyle={styles.text}
                                widthArr={widthArr}
                            />
                            {tableData3.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    textStyle={styles.text}
                                    widthArr={widthArr}
                                />
                            ))}
                            </Table>
                        </View>
                    </ScrollView>
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
    container2: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    head: { height: 40, backgroundColor: '#FFC600' },
        text: { margin: 6, textAlign: 'center' },
        border: { borderWidth: 1, borderColor: '#000000' },
        tableWrapper: { flexDirection: 'row' }, // Added wrapper for the table
        row: { flexDirection: 'row', width: '100%' }, // Adjusted row style
        cell: { flex: 1, borderWidth: 1, borderColor: '#000000', padding: 6 }, // Adjusted cell style
})

export default Hearing