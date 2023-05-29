import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,SafeAreaView,Modal} from 'react-native';
import React, {useState} from 'react';
import { Text, Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalculatorPopup from './calculatorpopup';
import { TouchableOpacity } from 'react-native-web';

const Entry = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.date}>
                <Text>Date:</Text>
                <DateTimePicker style={styles.picker} value={new Date()} />
            </View>
            <View style={styles.category}>
                <Text>Category:</Text>
                    <TextInput></TextInput>
                {//insert category choice here
                }
            </View>
            <View style={styles.amount}>
                <Text>Amount:</Text>
                <TextInput></TextInput> 
            </View>
            <Button contentStyle={styles.buttonContent}>
            <Text style={styles.buttontext}>Submit</Text>
            </Button>
        </SafeAreaView>
    )
}

export default Entry;


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date:{
        
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    category:{
        
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'left'
    },
    amount:{
        
        flexDirection:'row'
    },
    button:{
        backgroundColor:'#add8e6',
        justifyContent:'center',
        alignItems:'center'
    },
    buttontext:{
        alignSelf:'center',
        fontSize:20
    }
