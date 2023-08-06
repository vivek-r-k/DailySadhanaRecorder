import React,{useState} from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, useColorScheme,FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const Datewise = () => {
    const colorScheme = useColorScheme();
    const titleColor = colorScheme === "dark" ? "#ffffff" : "ffffff";

    const navigate = useNavigation();

    const goToSignleDateScreen = () => {
        navigation.navigate('SingleDateData');
    };

    const getLast30DaysDates = () => {
        const today = new Date();
        const last30DaysDates = [];
      
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const day = date.getDate();
          const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month number
          const year = date.getFullYear();
          const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
          last30DaysDates.push(formattedDate);
        }
      
        return last30DaysDates;
      };
        

    const datesArray = getLast30DaysDates();

    const renderItem = ({ item }) => {
        return (
          <TouchableOpacity style={styles.dateItem} onPress={() => console.log('Pressed:', item)}>
            <Text style={{
                justifyContent: 'center',
                alignSelf: 'flex-start',
                fontSize: 20,
                margin: 10,
                fontWeight: 'bold',
                color: 'black'
            }}>{item}
                <View style={styles.separator} />
            </Text>
          </TouchableOpacity>
        );
      };

    return(
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={{flex:1}}>
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.UserName}>Datewise data</Text>
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
                {/* <TouchableOpacity onPress={() => navigate(goToSignleDateScreen)}> */}
                    <FlatList
                            data={datesArray}
                            renderItem={renderItem}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            keyExtractor={(item, index) => index.toString()}
                    />
                {/* </TouchableOpacity> */}
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
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginVertical: 10,
      },
})

export default Datewise