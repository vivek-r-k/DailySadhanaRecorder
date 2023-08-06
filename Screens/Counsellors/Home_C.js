import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, useColorScheme,Alert, TouchableOpacity } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import LinearGradient from "react-native-linear-gradient";

const Home_C = ({navigation}) => {
    // onPress={() => navigation.navigate('Details_of_Counselee')}
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";

    const tableHead1 = ['Counselees', 'Date', 'Attendance', 'Chanting', 'Hearing', 'Reading'];
    const tableData1 = [
        ['Pankaj Meena', '30/07/23', 'Present', '130','130','130'],
        ['Suryapati achyuta das', '30/07/23', 'Absent','130','130','130'],
        ['Bob Johnson', '30/07/23', 'Late','130','130','130'],
    ];
    const handleRowPress1 = (rowData) => {
        Alert.alert('Row Pressed', `Counselees: ${rowData[0]}, Date: ${rowData[1]}`);
        // navigation.navigate('')
    }

    const tableHead2 = ['Counselees', 'Date', 'Attendance', 'Chanting', 'Hearing', 'Reading'];
    const tableData2 = [
        ['Pankaj Meena', '30/07/23', 'Present', '130','130','130'],
        ['Suryapati achyuta das', '30/07/23', 'Absent','130','130','130'],
        ['Bob Johnson', '30/07/23', 'Late','130','130','130'],
    ];

    const tableHead3 = ['Counselees', 'Date', 'Attendance', 'Chanting', 'Hearing', 'Reading'];
    const tableData3 = [
        ['Pankaj Meena', '30/07/23', 'Present', '130','130','130'],
        ['Suryapati achyuta das', '30/07/23', 'Absent','130','130','130'],
        ['Bob Johnson', '30/07/23', 'Late','130','130','130'],
    ];

    const tableHead4 = ['Counselees', 'Date', 'Attendance', 'Chanting', 'Hearing', 'Reading'];
    const tableData4 = [
        ['Pankaj Meena', '30/07/23', 'Present', '130','130','130'],
        ['Suryapati achyuta das', '30/07/23', 'Absent','130','130','130'],
        ['Bob Johnson', '30/07/23', 'Late','130','130','130'],
    ]; 

    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Counsellor</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 30,
                        // marginTop: 20,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Counselees</Text>
                </View>

                <View style={{flex: 1, padding: 16, paddingTop: 30}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 30,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Second Year</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead1} style={styles.head} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                        {/* TODO: Add ontouch */}
                        {tableData1.map((rowData, index) => (
                            <Rows key={index} data={[rowData]} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]}
                                onPress={() => handleRowPress1(rowData)} />
                        ))}
                    </Table>
                </View>


                <View style={{flex: 1, padding: 16, paddingTop: 30}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 30,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Third Year</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead2} style={styles.head} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                        {/* TODO: Add ontouch */}
                        <Rows data={tableData2} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                    </Table>
                </View>


                <View style={{flex: 1, padding: 16, paddingTop: 30}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 30,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Fourth Year</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead3} style={styles.head} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                        {/* TODO: Add ontouch */}
                        <Rows data={tableData3} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                    </Table>
                </View>

                <View style={{flex: 1, padding: 16, paddingTop: 30}}>
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        fontSize: 30,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Passout</Text>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead4} style={styles.head} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
                        {/* TODO: Add ontouch */}
                        <Rows data={tableData4} textStyle={styles.text} flexArr={[2, 2, 2, 1, 1, 1]} />
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