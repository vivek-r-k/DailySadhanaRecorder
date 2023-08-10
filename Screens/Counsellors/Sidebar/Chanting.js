// https://chat.openai.com/share/0baf6877-44ce-4a6c-b6d4-3b0e9f402c87
// After last 30 day column, For chanting, only one column i. E. Average time of completion
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

const Chanting = () => {
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

    const [tableHead,setTableHead] = useState(['Counselee',...getLast30Days(),'Average time'])
    // Second Year
    const [tableData,setTableData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Second_Year/Emails/`);
          await Test.on('value', snapshot => {
            const data = snapshot.val();
            const dates = getLast30Days();
            console.log("line 51:",data);
            const chantingData = {};

            // Iterate through each user in the "data" object
            for (const userEmail in data) {
            if (data.hasOwnProperty(userEmail) && data[userEmail].Dates) {
                const chantingValues = [];
                
                // Iterate through each date in the "dates" array
                for (const date of dates) {
                const formattedDate = date.split('/').reverse().join('-'); // Convert to "yyyy-mm-dd" format
                
                // Check if the user's data contains the current date
                if (data[userEmail].Dates[formattedDate]) {
                    const chantingValue = data[userEmail].Dates[formattedDate].Chanting;
                    chantingValues.push(chantingValue);
                } else {
                    chantingValues.push(null); // If date is not present, push null
                }
                }
                
                chantingData[data[userEmail].Name] = chantingValues;
            }
            }

            // Convert the chantingData object into an array of arrays
            const tableData15 = Object.entries(chantingData).map(([name, values]) => [name, ...values]);

            console.log("line 79",tableData15);
            const timeToMinutes = (time) => {
                const [hours, minutes] = time.split('-').map(Number);
                return hours * 60 + minutes;
              };
              
              // Calculate the average time for each sub-array
              const averagedTableData = tableData15.map((row) => {
                const timeValues = row.slice(2).filter((value) => value !== null);
                if (timeValues.length === 0) {
                  return row;
                }
              
                const totalMinutes = timeValues.reduce((total, time) => total + timeToMinutes(time), 0);
                const averageMinutes = Math.round(totalMinutes / timeValues.length);
                
                const averageHours = Math.floor(averageMinutes / 60);
                const averageMinutesRemainder = averageMinutes % 60;
                const averageTime = `${String(averageHours).padStart(2, '0')}-${String(averageMinutesRemainder).padStart(2, '0')}`;
                
                return [...row, averageTime];
              });
              
              console.log("line 101",averagedTableData);
              setTableData(averagedTableData)
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
            const chantingData = {};

            // Iterate through each user in the "data" object
            for (const userEmail in data) {
            if (data.hasOwnProperty(userEmail) && data[userEmail].Dates) {
                const chantingValues = [];
                
                // Iterate through each date in the "dates" array
                for (const date of dates) {
                const formattedDate = date.split('/').reverse().join('-'); // Convert to "yyyy-mm-dd" format
                
                // Check if the user's data contains the current date
                if (data[userEmail].Dates[formattedDate]) {
                    const chantingValue = data[userEmail].Dates[formattedDate].Chanting;
                    chantingValues.push(chantingValue);
                } else {
                    chantingValues.push(null); // If date is not present, push null
                }
                }
                
                chantingData[data[userEmail].Name] = chantingValues;
            }
            }

            // Convert the chantingData object into an array of arrays
            const tableData15 = Object.entries(chantingData).map(([name, values]) => [name, ...values]);

            console.log("line 79",tableData15);
            const timeToMinutes = (time) => {
                const [hours, minutes] = time.split('-').map(Number);
                return hours * 60 + minutes;
              };
              
              // Calculate the average time for each sub-array
              const averagedTableData = tableData15.map((row) => {
                const timeValues = row.slice(2).filter((value) => value !== null);
                if (timeValues.length === 0) {
                  return row;
                }
              
                const totalMinutes = timeValues.reduce((total, time) => total + timeToMinutes(time), 0);
                const averageMinutes = Math.round(totalMinutes / timeValues.length);
                
                const averageHours = Math.floor(averageMinutes / 60);
                const averageMinutesRemainder = averageMinutes % 60;
                const averageTime = `${String(averageHours).padStart(2, '0')}-${String(averageMinutesRemainder).padStart(2, '0')}`;
                
                return [...row, averageTime];
              });
              
              console.log("line 101",averagedTableData);
              setTableData1(averagedTableData)
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
            const chantingData = {};

            // Iterate through each user in the "data" object
            for (const userEmail in data) {
            if (data.hasOwnProperty(userEmail) && data[userEmail].Dates) {
                const chantingValues = [];
                
                // Iterate through each date in the "dates" array
                for (const date of dates) {
                const formattedDate = date.split('/').reverse().join('-'); // Convert to "yyyy-mm-dd" format
                
                // Check if the user's data contains the current date
                if (data[userEmail].Dates[formattedDate]) {
                    const chantingValue = data[userEmail].Dates[formattedDate].Chanting;
                    chantingValues.push(chantingValue);
                } else {
                    chantingValues.push(null); // If date is not present, push null
                }
                }
                
                chantingData[data[userEmail].Name] = chantingValues;
            }
            }

            // Convert the chantingData object into an array of arrays
            const tableData15 = Object.entries(chantingData).map(([name, values]) => [name, ...values]);

            console.log("line 79",tableData15);
            const timeToMinutes = (time) => {
                const [hours, minutes] = time.split('-').map(Number);
                return hours * 60 + minutes;
              };
              
              // Calculate the average time for each sub-array
              const averagedTableData = tableData15.map((row) => {
                const timeValues = row.slice(2).filter((value) => value !== null);
                if (timeValues.length === 0) {
                  return row;
                }
              
                const totalMinutes = timeValues.reduce((total, time) => total + timeToMinutes(time), 0);
                const averageMinutes = Math.round(totalMinutes / timeValues.length);
                
                const averageHours = Math.floor(averageMinutes / 60);
                const averageMinutesRemainder = averageMinutes % 60;
                const averageTime = `${String(averageHours).padStart(2, '0')}-${String(averageMinutesRemainder).padStart(2, '0')}`;
                
                return [...row, averageTime];
              });
              
              console.log("line 248",averagedTableData);
              setTableData2(averagedTableData)
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
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Passout/Emails/`);
          await Test.on('value', snapshot => {
            const data = snapshot.val();
            const dates = getLast30Days();
            console.log("line 51:",data);
            const chantingData = {};

            // Iterate through each user in the "data" object
            for (const userEmail in data) {
            if (data.hasOwnProperty(userEmail) && data[userEmail].Dates) {
                const chantingValues = [];
                
                // Iterate through each date in the "dates" array
                for (const date of dates) {
                const formattedDate = date.split('/').reverse().join('-'); // Convert to "yyyy-mm-dd" format
                
                // Check if the user's data contains the current date
                if (data[userEmail].Dates[formattedDate]) {
                    const chantingValue = data[userEmail].Dates[formattedDate].Chanting;
                    chantingValues.push(chantingValue);
                } else {
                    chantingValues.push(null); // If date is not present, push null
                }
                }
                
                chantingData[data[userEmail].Name] = chantingValues;
            }
            }

            // Convert the chantingData object into an array of arrays
            const tableData15 = Object.entries(chantingData).map(([name, values]) => [name, ...values]);

            console.log("line 79",tableData15);
            const timeToMinutes = (time) => {
                const [hours, minutes] = time.split('-').map(Number);
                return hours * 60 + minutes;
              };
              
              // Calculate the average time for each sub-array
              const averagedTableData = tableData15.map((row) => {
                const timeValues = row.slice(2).filter((value) => value !== null);
                if (timeValues.length === 0) {
                  return row;
                }
              
                const totalMinutes = timeValues.reduce((total, time) => total + timeToMinutes(time), 0);
                const averageMinutes = Math.round(totalMinutes / timeValues.length);
                
                const averageHours = Math.floor(averageMinutes / 60);
                const averageMinutesRemainder = averageMinutes % 60;
                const averageTime = `${String(averageHours).padStart(2, '0')}-${String(averageMinutesRemainder).padStart(2, '0')}`;
                
                return [...row, averageTime];
              });
              
              console.log("line 248",averagedTableData);
              setTableData3(averagedTableData)
          });
        };
    
        fetchData();
    
        return () => {
          const Test = database().ref(`/Counsellor/${modifiedEmail}/Passout/Emails/`);
          Test.off();
        };
    }, []);

    const widthArr = new Array(tableHead.length).fill(100);
    
    return(
      <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Chanting details</Text>
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

export default Chanting