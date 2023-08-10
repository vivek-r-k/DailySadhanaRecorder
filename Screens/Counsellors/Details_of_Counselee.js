import React,{useState,useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, ActivityIndicator, useColorScheme, TouchableOpacity } from "react-native";
import {PieChart, LineChart} from 'react-native-chart-kit'
import { Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';
import ChantingChart from "./ChantingChart";

const Details_of_Counselee = ({navigation,route}) => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate a loading delay of 10 seconds
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(loadingTimeout);
    }, []);

    // console.log("line 15",route.params.data[0]);
    // console.log("line 16",route.params.batch);

    var [dates,setDates] = useState()
    var [attendance,setAttendance] = useState()
    var [chanting,setChanting] = useState()
    var [hearing,setHearing] = useState()
    var [reading,setReading] = useState()

    var [presentCount,setPresentCount] = useState(null)
    var [absentCount,setAbsentCount] = useState(null)
    var [lateCount,setLateCount] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        const Test = database().ref(`/Counsellor/${route.params.counsellorEmail}/${route.params.batch}/Emails/`);
        Test.on('value', async snapshot => {
          const data = await snapshot.val();
          const counseleeDataKey = Object.keys(data).find(key => data[key].Name === route.params.data[0]);
          const counseleeData = data[counseleeDataKey].Dates;
          const datesArray = Object.keys(counseleeData);
          const attendanceArray = [];
          const chantingArray = [];
          const hearingArray = [];
          const readingArray = [];
          let presentCount1 = 0;
          let absentCount1 = 0;
          let lateCount1 = 0;
    
          for (const date in counseleeData) {
            attendanceArray.push(counseleeData[date]["Attendance"]);
            
            if (counseleeData[date]["Attendance"] === "Present") {
              presentCount1++;
            } else if (counseleeData[date]["Attendance"] === "Absent") {
              absentCount1++;
            } else if (counseleeData[date]["Attendance"] === "Late") {
              lateCount1++;
            }
            
            chantingArray.push(counseleeData[date]["Chanting"]);
            hearingArray.push(counseleeData[date]["Hearing"]);
            readingArray.push(counseleeData[date]["Reading"]);
          }
    
          setDates(datesArray);
          setAttendance(attendanceArray);
          setChanting(chantingArray);
          setHearing(hearingArray);
          setReading(readingArray);
          setPresentCount(presentCount1);
          setAbsentCount(absentCount1);
          setLateCount(lateCount1);
          // console.log("line 78:",dates);   
          // console.log("line 67:",presentCount); 
          // console.log("line 68:",absentCount); 
          // console.log("line 69:",lateCount); 
        });
        
        return () => {
          const Test = database().ref(`/Counsellor/${route.params.counsellorEmail}/${route.params.batch}/Emails/`);
          Test.off();
        };
      };
      
      const fetchDataAsync = async () => {
        await fetchData(); // Call the async function
      };
    
      fetchDataAsync();
    
    }, []);    

    // For attendance
    const data = [
        {
          name: "Present",
          total: presentCount,
          color: "green",
          legendFontColor: "#000000",
          legendFontSize: 15
        },
        {
          name: "Absent",
          total: absentCount,
          color: "red",
          legendFontColor: "#000000",
          legendFontSize: 15
        },
        {
          name: "Late",
          total: lateCount,
          color: "yellow",
          legendFontColor: "#000000",
          legendFontSize: 15
        }
    ]

    const chartConfig = {
        backgroundGradientFrom: "#000000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        xAxisLabelRotation: -25,
    };

    
    // Reading
    const Reading = {
        labels: dates,
        datasets: [
          {
            data: reading,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
      };
    // Hearing
    const Hearing = {
        labels: dates,
        datasets: [
          {
            data: hearing,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
      };

    const screenWidth = Dimensions.get("window").width;

    return(
      <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>{route.params.data[0]}</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('Attendance_Details',{name: route.params.data[0],attendance,dates,data})}>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={240}
                        chartConfig={chartConfig}
                        accessor={"total"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[30,5]}
                        absolute
                    />
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                  // Display the loader while isLoading is true
                  <ActivityIndicator size="large" color="blue" />
                ) : (
                  // Display your main content when isLoading becomes false
                  <>
                  <View>
                    <Text 
                    style={{
                        justifyContent:'center', 
                        flex:1,
                        fontSize:20,
                        alignSelf:'center',
                        fontWeight:"bold",
                        color:'#000000'
                    }}>Chanting done at</Text>
                    <ChantingChart xData={dates} yData={chanting} />
                  </View>

                  <View style={{marginTop: '3%'}}>
                    <Text 
                    style={{
                        justifyContent:'center', 
                        flex:1,
                        fontSize:20,
                        alignSelf:'center',
                        fontWeight:"bold",
                        color:'#000000'
                    }}>Hearing</Text>
                    <ScrollView horizontal>
                        <View style={{ width: Hearing.labels.length * 150 /* Adjust width based on data */ }}>
                        <LineChart
                            data={Hearing}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            fromZero={true}
                            verticalLabelRotation={-25}
                        />
                      </View>
                    </ScrollView>
                </View>

                <View style={{marginTop: '3%'}}>
                    <Text 
                    style={{
                        justifyContent:'center', 
                        flex:1,
                        fontSize:20,
                        alignSelf:'center',
                        fontWeight:"bold",
                        color:'#000000'
                    }}>Reading</Text>
                    <ScrollView horizontal>
                      <View style={{ width: Reading.labels.length * 150 /* Adjust width based on data */ }}>
                    <LineChart
                        data={Reading}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        fromZero={true}
                        verticalLabelRotation={-25}
                    />
                    </View>
                    </ScrollView>
                </View>
                </>
                )}
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
        alignItems: 'center'
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
        height: 50,
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

export default Details_of_Counselee