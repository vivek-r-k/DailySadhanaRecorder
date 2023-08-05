import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {PieChart, LineChart} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from "react-native";

const Details_of_Counselee = () => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";
    const [attendance, setAttendance] = useState("");

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
        backgroundGradientFrom: "#000000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    // Line graph data
    // Chanting
    const Chanting = {
        labels: ["31/06/23", "30/06/23", "29/06/23", "28/06/23", "27/06/23", "28/06/23"],
        datasets: [
          {
            data: [300, 250, 280, 130, 190, 260],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2, // optional
            legend: ["Chanting done at"] // optional
          }
        ],
      };
    // Reading
    const Reading = {
        labels: ["31/06/23", "30/06/23", "29/06/23", "28/06/23", "27/06/23", "28/06/23"],
        datasets: [
          {
            data: [300, 250, 280, 130, 190, 260],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
      };
    // Hearing
    const Hearing = {
        labels: ["31/06/23", "30/06/23", "29/06/23", "28/06/23", "27/06/23", "28/06/23"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            // TODO: string data is not able to add data array
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
      };

    const screenWidth = Dimensions.get("window").width;

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>ABC</Text>
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
                    <LineChart
                        data={Hearing}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        // xAxisLabel="Date"
                        // yAxisLabel="Time"
                    />
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
                    <LineChart
                        data={Reading}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        // xAxisLabel="Date"
                        // yAxisLabel="Time"
                    />
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
                    }}>Chanting done at</Text>
                    <LineChart
                        data={Chanting}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        // xAxisLabel="Date"
                        // yAxisLabel="Time"
                    />
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