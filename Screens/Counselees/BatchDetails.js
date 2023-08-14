import React,{useState,useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, useColorScheme,Alert, TouchableOpacity } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const BatchDetails = ({navigation,route}) => {
    // console.log("9:",route.params.counEmail);
    // console.log("9:",route.params.whichBatch);
    // Below is for getting the name
    // const currentUser = auth().currentUser;
    // var modifiedEmail = currentUser.email.replace(/\./g, '_');
    // // console.log("line 12:",modifiedEmail);
    // const [name,setName] = useState('')

    // useEffect(() => {
    //     const fetchData = async () => {
    //     const Test = await database().ref(`/Counsellor/${route.params.counEmail}/${route.params.whichBatch}/Emails/`);
    //     Test.on('value', snapshot => {
    //         const data = snapshot.val();
    //         console.log("22:",data);
    //     });
    //     };
    //     fetchData(); // Call the async function

    //     return () => {
    //     const Test = database().ref(`/Counsellor/${route.params.counEmail}/${route.params.whichBatch}/Emails/`);
    //     Test.off();
    //     };
    // }, []);
    
    const tableHead = ['Counselees', 'Date', 'Attendance', 'Chanting', 'Hearing', 'Reading'];
    const [tableData1, setTableData1] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        try {
        const Test = database().ref(`/Counsellor/${route.params.counEmail}/${route.params.whichBatch}/Emails/`);

        // Wrap the event listener in a Promise
        const snapshotPromise = new Promise((resolve) => {
            Test.on('value', (snapshot) => {
            resolve(snapshot);
            });
        }); 

        // Wait for the Promise to resolve
        const snapshot = await snapshotPromise;

        const data = snapshot.val();
        // console.log("line 49:", data);

        if (data) {
            const resultArray = [];

            for (const key in data) {
            const userData = data[key];
            const datesArray = Object.keys(userData.Dates).sort();
            const lastDate = datesArray[datesArray.length - 1];
            const lastObject = userData.Dates[lastDate];
            
            const valuesArray = [
                userData.Name,
                lastDate,
                lastObject.Attendance,
                lastObject.Chanting,
                lastObject.Hearing.toString(),
                lastObject.Reading.toString()
            ];

            resultArray.push(valuesArray);
            }

            console.log("line 56:", resultArray);

            setTableData1(resultArray); // Update state with processed values
        } else {
            console.log("No data found.");
        }
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
    
    fetchData(); // Call the async function
    }, []);
      
    const handleRowPress1 = (rowData) => {
        // Alert.alert('Row Pressed', `Counselees: ${rowData[0]}, Date: ${rowData[1]}`);
        navigation.navigate('DetailsOfIndi',{data: rowData,counsellorEmail: route.params.counEmail,batch:route.params.whichBatch})
    }     
    
    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={{justifyContent:'center'}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 40,
                        // marginTop: 20,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Counselees</Text>
                </View>   

                <View style={{flex: 1, padding: 16, paddingTop: 10}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 30,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>{route.params.whichBatch}</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                        {tableData1.length === 0 ? (
                        <Text>No data to show</Text>
                        ) : (
                            tableData1.map((rowData, index) => (
                                <Rows key={index} data={[rowData]} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]}
                                    onPress={() => handleRowPress1(rowData)} 
                                    // onLongPress={() => handleRowPressForDelete(rowData)}    
                                />
                            ))
                        )}
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
        fontSize: 40,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    date: {
        margin: '5%',
        fontSize: 20,
        color: 'black'
    },
    container1: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 70, backgroundColor: '#FFC600' },
    text: { margin: 6, textAlign: 'center' },
    border: { borderWidth: 1, borderColor: '#000000' },
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

export default BatchDetails