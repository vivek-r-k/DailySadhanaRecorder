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
    // const tableData1 = [['John Doe'],['Jane Smith'],['Bob Johnson']];
    const [tableData2,setTableData2] = useState([])

    const [adminName, setAdminName] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
          const Test = database().ref('/Admin/Counsellors/');
          Test.on('value', snapshot => {
            const data = snapshot.val();
            // console.log(data);
      
            // Extract the names from the data object and filter out "Admin" names
            const names = Object.keys(data).filter(name => !data[name].Admin);
      
            // Convert names into the desired format [['Vivek'], ['Ani'], ['Harsh']]
            const formattedNames = names.map((name) => [name]);
      
            // Set the formatted names in the tableData1 state
            setTableData2(formattedNames);
          });
        };
        fetchData(); // Call the async function
      }, []);

    const handleRowPress = (row) => {
        // Show a confirm delete dialog using Alert
        Alert.alert(
          'Confirm Delete',
          `Are you sure you want to remove ${row[0]}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                // Perform delete operation here
                const counsellorsRef = database().ref('/Admin/Counsellors');
                counsellorsRef.child(row[0]).remove();
                console.log('Item deleted successfully.');
              },
            },
          ],
          { cancelable: false }
        );
      };

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
                            {tableData2.map((rowData, index) => (
                            <Rows key={index} data={[rowData]} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]}
                                onPress={() => handleRowPress(rowData)} 
                                // onPress={() => {console.log(rowData)}} 
                                />
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