import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, useColorScheme,Pressable } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const Home_A = () => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";

    const tableHead = ['Counsellors'];
    const tableData = [['John Doe'],['Jane Smith'],['Bob Johnson']];

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Admin</Text>
                </View>
                <View style={styles.container1}>
                    <Table borderStyle={styles.border}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>
                </View>
                <View style={{marginTop: "1%", marginLeft: '3%', marginRight:'3%'}}>
                    <Pressable style={styles.button} onPress={() => {}}>
                        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>Add Counsellors</Text>
                    </Pressable>
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
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    border: { borderWidth: 1, borderColor: '#c8e1ff' },
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