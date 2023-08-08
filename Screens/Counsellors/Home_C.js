import React,{useState,useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, useColorScheme,Alert, TouchableOpacity } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Home_C = ({navigation}) => {
    // Below is for getting the name
    const currentUser = auth().currentUser;
    const [name,setName] = useState('')
    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref('/Admin/Counsellors/');
          Test.on('value', snapshot => {
            const data = snapshot.val();
            // console.log("line 19:",data);
            for (const key in data) {  
                if (data.hasOwnProperty(key)) {
                  const user = data[key];
                  if (user.Email === currentUser.email) {
                    setName(key);
                    // console.log("line25: ",key);
                    break; // Exit the loop once the matching user is found
                  }
                }
              }
            });
            // console.log("(line 28)name: ",name); 
        };
        fetchData(); // Call the async function
    }, []);

    // Below is for getting latest entered date
    const [when,setWhen] = useState('')
    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref(`/Counsellor/${name}/`);
          Test.on('value', snapshot => {
            const data = snapshot.val();
            // console.log("line 43:",data);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    setWhen(key)
                //   console.log("line 47: ",key); 
                } 
              }
            });
            // console.log("(line 51)when: ",when); 
        };
        fetchData(); // Call the async function
    }, []);

    const tableHead = ['Counselees', 'Date', 'Attendance', 'Chanting', 'Hearing', 'Reading'];
    // ----------------------------Get from database for table 1---------------------------- \\
    const [tableData1,setTableData1] = useState([])  
    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref(`/Counsellor/${name}/${when}/SecondYear/`);
      
          // Wrap the event listener in a Promise
          const snapshotPromise = new Promise((resolve) => {
            Test.on('value', (snapshot) => {
              resolve(snapshot);
            });
          });
      
          // Wait for the Promise to resolve
          const snapshot = await snapshotPromise;
      
          const data = snapshot.val();
      
          const tableData = Object.keys(data).map((name) => {
            const { Attendance, Chanting, Hearing, Reading } = data[name];
            return [name, when, Attendance, Chanting, Hearing.toString(), Reading.toString()];
          });
      
          setTableData1(tableData)
        //   console.log("line 88", tableData);  
        //   console.log("line 89", tableData3);  
        };
        
        fetchData(); // Call the async function
      }, []);
      
    // -------------------End of getting from database for table 1------------------------- \\

    // ----------------------------Get from database for table 2---------------------------- \\
    // const [tableData2,setTableData2] = useState([])  
    // useEffect(() => {
    //     const fetchData = async () => {
    //       const Test = database().ref(`/Counsellor/${name}/${when}/ThirdYear/`);
      
    //       // Wrap the event listener in a Promise
    //       const snapshotPromise = new Promise((resolve) => {
    //         Test.on('value', (snapshot) => {
    //           resolve(snapshot);
    //         });
    //       });
      
    //       // Wait for the Promise to resolve
    //       const snapshot = await snapshotPromise;
      
    //       const data = snapshot.val();
    //   console.log("line105:",data);
    //       const tableData = Object.keys(data).map((name) => {
    //         const { Attendance, Chanting, Hearing, Reading } = data[name];
    //         return [name, when, Attendance, Chanting, Hearing.toString(), Reading.toString()];
    //       });
      
    //       setTableData2(tableData)
    //     //   console.log("line 88", tableData);  
    //       console.log("line 113", tableData2);  
    //     };
        
    //     fetchData(); // Call the async function
    //   }, []);
      
    // -------------------End of getting from database for table ------------------------- \\

    const handleRowPress1 = (rowData) => {
        // Alert.alert('Row Pressed', `Counselees: ${rowData[0]}, Date: ${rowData[1]}`);
        navigation.navigate('Details_of_Counselee',{data: rowData})
    }    
    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Counsellor: {name}</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 25,
                        // marginTop: 20,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Counselees</Text>
                </View>   

                <View style={{flex: 1, padding: 16, paddingTop: 10}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 25,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Second Year</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                        {tableData1.map((rowData, index) => (
                            <Rows key={index} data={[rowData]} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]}
                                onPress={() => handleRowPress1(rowData)} />
                        ))}
                    </Table>
                </View>

                {/* <View style={{flex: 1, padding: 16, paddingTop: 10}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 25,
                        marginTop: 10,
                        fontWeight: 'bold',     
                        color: 'black'
                    }}>Third Year</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                        {tableData2.map((rowData, index) => (
                            <Rows key={index} data={[rowData]} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]}
                                onPress={() => handleRowPress1(rowData)} />
                        ))}
                    </Table>
                </View> */}  
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

export default Home_C