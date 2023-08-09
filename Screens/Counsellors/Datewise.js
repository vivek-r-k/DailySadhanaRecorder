import React,{useState,useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, useColorScheme,FlatList, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Datewise = ({navigation}) => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";

    const currentUser = auth().currentUser;
    var modifiedEmail = currentUser.email.replace(/\./g, '_');
    // console.log("line 13:",modifiedEmail);
    const [secondYearData,setSecondYearData] = useState('')
    const [thirdYearData,setThirdYearData] = useState('')
    const [fourthYearData,setFourthYearData] = useState('')
    const [passOutData,setPassOutData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
        const Test = database().ref(`/Counsellor/${modifiedEmail}/Second_Year/Emails/`);
        Test.on('value', snapshot => {
            const data = snapshot.val();
            // console.log("line 20:",data);  
            setSecondYearData(data)
            // console.log("line 22:",secondYearData); 
        });
        };
        fetchData(); // Call the async function

        return () => {
        const Test = database().ref(`/Counsellor/${modifiedEmail}/Second_Year/Emails/`);
        Test.off();
        };
    }, []);

    const getLast30DaysDates = () => {
        const today = new Date();
        const last30DaysDates = [];
      
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const day = date.getDate();
          const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month number
          const year = date.getFullYear();
          const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
          last30DaysDates.push(formattedDate);
        }
      
        return last30DaysDates;
    };    

    const datesArray = getLast30DaysDates();

    const renderItem = ({ item }) => {
        // console.log("datewise: ",item);
        return (
          <TouchableOpacity style={styles.dateItem} onPress={() => navigation.navigate('SingleDateData',{date:item,secondYearData})}>
            <Text style={{
                justifyContent: 'center',
                alignSelf: 'flex-start',
                fontSize: 20,
                margin: 10,
                fontWeight: 'bold',
                color: 'black'
            }}>{item}
            {/* {console.log(item)} */}
                <View style={styles.separator} />
            </Text>
          </TouchableOpacity>
        );
      };

      return (
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
              <Text style={styles.UserName}>Datewise data</Text>
                <View style={{ flex: 1, margin: '3%' }}>
                    <FlatList
                        data={datesArray}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
          </SafeAreaView>
        </LinearGradient>
      );
      
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
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginVertical: 10,
      },
})

export default Datewise