import React,{useState,useContext,useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from "react-native";
import { AuthContext } from "../Authetication/Authprovider";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

const UserProfile = () => {
    // Below is for getting the name
    const currentUser = auth().currentUser;
    var modifiedEmail = currentUser.email.replace(/\./g, '_');
    // console.log("line 24:",modifiedEmail);

    const [name1,setName1] = useState('')

    const [counEmail,setCounEmail] = useState('')
    const [whichBatch,setWhichBatch] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const Test = database().ref('/Counsellor1/');
            await Test.on('value', async snapshot => {
                const data = snapshot.val();
                const nameObject = data["01fe20bei015@kletech_ac_in"]["Second_Year"]["Emails"][modifiedEmail];
    
                if (nameObject && nameObject.Name) {
                    setName1(nameObject.Name);
                }
    
                let emailId;
                let batch;
    
                for (const key in data) {
                    for (const batchKey in data[key]) {
                        if (batchKey !== "Emails" && data[key][batchKey]?.Emails[modifiedEmail]) {
                            emailId = key;
                            batch = batchKey;
                            break;
                        }
                    }
                    if (emailId && batch) {
                        break;
                    }
                }
                setCounEmail(emailId);
                setWhichBatch(batch);
            });
        };
        fetchData();
    }, []);    

    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";
    const { logout } = useContext(AuthContext)
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
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const [value, onChange] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onTimeChange = (event, selectedDate) => {
        setShowTimePicker(false);
        if (selectedDate !== undefined) {
            onChange(selectedDate);
        }
    };

    const showTimePickerHandler = () => {
        setShowTimePicker(true);
    };

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours < 10 ? '0' : ''}${hours}-${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const [date, setDate] = useState("");
    const [reading, setReading] = useState("");
    const [hearing, setHearing] = useState("");
    const [chanting, setChanting] = useState("");
    const [attendance, setAttendance] = useState("");
      
    const handleAdd = () => {
        const time = formatTime(value)
        setChanting(time)
        // console.log("line 111:",date);
        // console.log("line 112:",reading);
        // console.log("line 113:",hearing);
        // console.log("line 114:",chanting);
        // console.log("line 115:",attendance);
        if(date === "" || reading === "" || hearing === "" || chanting === "" || attendance === ""){
            Alert.alert("Please fill all the fields");
        }
        else{
        database()
          .ref(`/Counsellor/${counEmail}/${whichBatch}/Emails/${modifiedEmail}/Dates/`)
          .update({
            [date]: { "Attendance": attendance, "Chanting": chanting, "Hearing": hearing, "Reading": reading }
          })
          .then(() => 
          {
            Alert.alert(`Data for ${date} is submitted!`)
            setAttendance("");
            setChanting("")
            setDate("")
            setHearing("")
            setReading("")
          }
          );
        }     
    };

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const formattedToday = formatDate(today);
    const formattedYesterday = formatDate(yesterday);
    // console.log("Formatted Today", typeof(formattedToday) );

    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>{name1}</Text>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Date: </Text>
                    <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={date}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setDate(itemValue)}
                    >
                        <Picker.Item label="Choose" value="" enabled={false}/> 
                        <Picker.Item label="Today's" value={formattedToday}/> 
                        {/*TODO: Change the value */}
                        <Picker.Item label="Yesterday's" value={formattedYesterday} />
                    </Picker>
                    </View>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Reading (in min):</Text>
                    <TextInput style={styles.input} placeholder="eg: 180" keyboardType="numeric" onChangeText={(val) => setReading(val)}/>
                </View>
                <View style={styles.container1}>
                    <Text style={styles.data}>Hearing (in min): </Text>
                    <TextInput style={styles.input} placeholder="eg: 180" keyboardType="numeric" onChangeText={(val) => setHearing(val)}/>
                </View>

                <View style={styles.container1}>
                            <Text style={styles.data}>Chanting done at: </Text>
                            <TouchableOpacity style={styles.input} onPress={showTimePickerHandler}>
                                <Text style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
                                    {formatTime(value)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert("If chanting completed after 23:59 i.e on next day, please fill 23:59 only.")}>
                                <Text><Icon name="information-circle-outline" size={30} color="#900" /></Text>
                            </TouchableOpacity>
                            {showTimePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={value}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onTimeChange}
                                />
                            )}
                </View>

                <View style={styles.container1}>
                    <Text style={styles.data}>Attendance: </Text>
                    <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={attendance}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setAttendance(itemValue)}
                    >
                        <Picker.Item label="Choose" value="" enabled={false} />
                        <Picker.Item label="Present" value="Present" />
                        <Picker.Item label="Absent" value="Absent" />
                        <Picker.Item label="Late" value="Late" />
                    </Picker>
                    </View>
                    <TouchableOpacity onPress={() => alert("If present in all three (chanting, mangal aarti and class) at time then only select present. If absent in any one or two or all of three, select absent.")}>
                        <Text><Icon name="information-circle-outline" size={30} color="#900" /></Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: "3%"}}>
                    <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: "3%"}}>
                    <TouchableOpacity style={styles.button} onPress={() => logout()}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Log Out</Text>
                    </TouchableOpacity>
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
    container1: {
        flex: 1,
        // justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
        margin:'2%'
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
    data: {
        justifyContent: 'flex-start',
        fontSize: 30,
        marginLeft: '4%',
        color: 'black'
    },
    input: {
        width: "30%",
        height: 50,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      pickerContainer: {
        width: "50%",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        overflow: "hidden", // Ensure the border is visible by hiding any overflow
      },
      picker: {
        height: 20,
    },
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

export default UserProfile