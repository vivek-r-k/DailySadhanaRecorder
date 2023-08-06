import React,{useState,useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, useColorScheme,Alert } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const Home_A = ({navigation}) => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";
    const { colors } = useTheme();

    const tableHead = ['Counsellors'];
    const tableData1 = [['John Doe'],['Jane Smith'],['Bob Johnson']];

    const [adminName, setAdminName] = useState('');
    useEffect(() => {
        const fetchAdminData = async () => {
          try {
            const snapshot = await database()
              .ref('/users/Admin/Name')
              .once('value');
    
            const name = snapshot.val();
            setAdminName(name);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchAdminData();
      }, []);

    // const userDocument = firestore().collection('Users').doc('ABC');
    // const handleRowPress1 = async (rowData) => {
    //     const adminRef = database().ref('/users/Admin'); // Get a reference to the 'Admin' path

    //     // Set the new data under the 'Admin' path
    //     adminRef
    //     .set({
    //         Name: 'Harsh',
    //         Email: 'harsh@gmail.com',
    //     })
    //     .then(() => {
    //         console.log('Data updated.');
    //         Alert.alert('Row Pressed', 'New data added successfully.');
    //     })
    //     .catch((error) => {
    //         console.error('Error updating data:', error);
    //         Alert.alert('Error', 'Failed to add new data.');
    //     });
    //   };
      

    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View style={[styles.container]}>
                        <Text style={styles.UserName}>Admin: {adminName}</Text>
                    </View>
                    <View style={styles.container1}>
                        <Table borderStyle={styles.border}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                            {tableData1.map((rowData, index) => (
                            <Rows key={index} data={[rowData]} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]}
                                onPress={() => handleRowPress1(rowData)} />
                        ))}
                        </Table>
                    </View>
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
    container1: { flex: 1, padding: 16, paddingTop: 30 },
    head: { height: 40, backgroundColor: '#FFC600',color:'#000000',fontSize: 30,fontWeight:'bold'},
    text: { margin: 6,color: '#000000',fontSize: 25},
    border: { borderWidth: 2, borderColor: '#000000' },
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

export default Home_A