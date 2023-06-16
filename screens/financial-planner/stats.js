import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import { Text, Button,Modal } from 'react-native-paper';
import CalculatorPopup from './calculatorpopup';
import axios from 'axios';

const Stats = () => {
    const [inputValue,setInputValue] = useState('')
    const data = {
        id: 3,
        description: 'food',
        amount: 10.0,
        created_at: new Date(),
        created_by: 3,
    }
    return (
        <View style={styles.container}>
            <Button></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    }

})

export default Stats